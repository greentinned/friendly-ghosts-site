export const CHAIN_ID = 1
export const CHAIN_ID_HEX = '0x' + CHAIN_ID.toString(16)

export const TOKEN_ADDRESS = '0x78ccad4dA0a92A94f95405cF151F73E6A3C4c279'

export const TOKEN_ABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'Transfer',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'balanceOf',
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
        name: 'currentId',
        outputs: [
            {
                internalType: 'uint16',
                name: '',
                type: 'uint16',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'isMintActive',
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
        name: 'mint',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'reservers',
        outputs: [
            {
                internalType: 'uint16',
                name: '',
                type: 'uint16',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'index',
                type: 'uint256',
            },
        ],
        name: 'tokenOfOwnerByIndex',
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
        name: 'totalSupply',
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
        name: 'maxSupply',
        outputs: [
            {
                internalType: 'uint16',
                name: '',
                type: 'uint16',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
]