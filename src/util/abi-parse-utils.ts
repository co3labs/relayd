export const sampleAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'account',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newGuardian',
        type: 'address',
      },
    ],
    name: 'addGuardian',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'recoverProcessId',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'guardian',
        type: 'address',
      },
    ],
    name: 'getGuardianVote',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getGuardians',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getGuardiansThreshold',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRecoverProcessesIds',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: '',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'isGuardian',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'recoverProcessId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'plainSecret',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: 'newHash',
        type: 'bytes32',
      },
    ],
    name: 'recoverOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'currentGuardian',
        type: 'address',
      },
    ],
    name: 'removeGuardian',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'newHash',
        type: 'bytes32',
      },
    ],
    name: 'setSecret',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newThreshold',
        type: 'uint256',
      },
    ],
    name: 'setThreshold',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '_interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'recoverProcessId',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'voteToRecover',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

interface FuncInput {
  internalType: string;
  name: string;
  type: string;
}

interface ABIFunc {
  inputs: FuncInput[];
  name: string;
  outputs: [];
  stateMutability: 'payable' | 'nonpayable' | 'view' | 'pure';
  type: string;
}

export const getUsableFunctions = (abi: ABIFunc[]) =>
  abi.filter(({ stateMutability }) => stateMutability === 'payable' || stateMutability === 'nonpayable');

export function getParameters(abi: ABIFunc[], name: string) {
  const func = abi.find(({ name }) => name === name);
  return func?.inputs;
}

export function getFunctionNames(abi: ABIFunc[]) {
  const functions = getUsableFunctions(abi);
  return functions.map(({ name }) => name);
}
