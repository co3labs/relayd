
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManagerContract from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import Web3 from 'web3';
import dotenv from 'dotenv'

dotenv.config()

const { REACT_APP_RPC,
    REACT_APP_RELAYD_CONTROLLER,
    REACT_APP_CHAIN_ID,
    REACT_APP_RELAYD_PK,
    REACT_APP_RELAYD_CHANNEL,
    REACT_APP_TEMP_CONTROLLER,
    REACT_APP_TEMP_PK
} = process.env;

let web3 = new Web3(REACT_APP_RPC as string);

/**
 * generates needed artifacts to send relay transaction
 * @param account 
 * @param params 
 * @returns 
 */
async function generateRelayPayload(account: string, params: object) {

    const KeyManager = await getKeyManager(account);

    const controllerAccount =
        web3.eth.accounts.wallet.add(REACT_APP_TEMP_PK as string);

    const channelId = parseInt(REACT_APP_RELAYD_CHANNEL as string);

    const nonce = await KeyManager.methods
        .getNonce(controllerAccount.address, channelId)
        .call();

    let abiPayload = await encodePayload(account, params);
    const signature = await signPayload(controllerAccount, nonce, KeyManager.options.address, abiPayload);
    return { account, abiPayload, signature, nonce, controller: controllerAccount.address };
}

/**
 * signs the 'abiPayload' using 'controllerAccount' and returns signature
 * @param controllerAccount 
 * @param nonce 
 * @param keyManagerAddress 
 * @param abiPayload 
 * @returns 
 */
export async function signPayload(controllerAccount: any, nonce: number, keyManagerAddress: string, abiPayload: string) {
    const chainId = await web3.eth.getChainId(); // will be 2828 on L16

    const message = web3.utils.soliditySha3(chainId, keyManagerAddress, nonce, {
        t: 'bytes',
        v: abiPayload,
    });

    const signatureObject = controllerAccount.sign(message);
    return signatureObject.signature;
}

export async function execute(payload: string, from: string, account: string) {
    const keyManager = await getKeyManager(account);
    return await keyManager.methods.execute(payload).send({
        from,
        gasLimit: process.env.GAS_LIMIT,
    });
}

export async function encodePayload(account: string, params: any) {
    const up = await getAccount(account);
    let { operation, to, value, data } = params;
    return await up.methods.execute(operation, to, value, data).encodeABI();
}

export async function getKeyManager(account: string) {
    const myUniversalProfile = new web3.eth.Contract(UniversalProfileContract.abi as any, account);
    const keyManagerAddress = await myUniversalProfile.methods.owner().call();
    return new web3.eth.Contract(KeyManagerContract.abi as any, keyManagerAddress);
}

export async function getAccount(account: string) {
    return new web3.eth.Contract(UniversalProfileContract.abi as any, account);
}

export async function getPayload() {

    let abi = [{
        "inputs": [
            {
                "internalType": "address",
                "name": "newGuardian",
                "type": "address"
            }
        ],
        "name": "addGuardian",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }]
    let recoveryAddress = "0x7072f1a72a2FBd726b28EB6a4Ce3f762936F11CC";
    let newGuardian = "0x253c4d9e3260f8dd1Ed0f49Acc52f12D92B21123";
    let account = "0x1F21e1C5EE8d12651d3d72FF66D86C9262b070Be";

    const recoveryVault = new web3.eth.Contract(
        abi as any,
        recoveryAddress
    );
    const targetPayload = recoveryVault.methods
        .addGuardian(newGuardian)
        .encodeABI();

    let params = {
        operation: 0, //calls Recovery Vault
        to: recoveryAddress,
        value: 0,
        data: targetPayload, //call to addGuardian() func
    };

    const payload = await generateRelayPayload(account, params);
    console.log("PAYLOADDDDDD-----------------------")
    console.log("==============-----------------------")
    console.log(payload)
    console.log("==============-----------------------")
}