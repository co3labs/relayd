import dotenv from 'dotenv';
import { LSPFactory } from '@lukso/lsp-factory.js';

dotenv.config();

const { REACT_APP_RPC,
    REACT_APP_RELAYD_CONTROLLER,
    REACT_APP_CHAIN_ID,
    REACT_APP_RELAYD_PK
} = process.env;

const provider = REACT_APP_RPC;




export async function createUP(controller: string) {

    const lspFactory = new LSPFactory(provider as string,
        {
            deployKey: REACT_APP_RELAYD_PK,
            chainId: Number(REACT_APP_CHAIN_ID),
        });

    const contracts = await lspFactory.UniversalProfile.deploy(
        {
            controllerAddresses: [controller, REACT_APP_RELAYD_CONTROLLER as string],

        },
        {
            LSP0ERC725Account: {
                deployProxy: false
            },
            LSP6Keymanager: {
                deployProxy: false
            },
            LSP1UniversalReceiverDelegate: {
                deployProxy: false
            },
            onDeployEvents: {
                next: (deploymentEvent: any) => {
                    console.log(deploymentEvent);
                },
                error: (error: any) => {
                    console.error(error);
                },
                complete: (contracts: any) => {
                    console.log('Universal Profile deployment completed');
                    console.log(contracts);
                    return contracts;
                },
            }
        } as any);

    console.log("::::::::: CONTRACTS ::::::::")
    console.log(contracts)
    return contracts

}

