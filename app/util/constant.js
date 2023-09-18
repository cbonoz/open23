export const APP_NAME = 'DataX'

export const ACTIVE_CHAIN = {
    id: 314159,
    name: 'Filecoin Calibration',
    symbol: 'tFIL',
    rpc: 'https://calibration.node.glif.io/',
    explorerUrl: 'https://calibration.filscan.io/',
}

export const STAT_KEYS = [
    'purchases',
    'price',
    'size',
    'tags',
    'createdAt'
]

export const EXAMPLE_ITEM = {
    "id": 1,
    "address": "0x1234",
    "name": "Oil price data set",
    "image": "https://ucf22d9ff17162a511cc6f67db28.previews.dropboxusercontent.com/p/thumb/ACApKg5UZ-luovjuPTrsU1d05o_BzW_ORaUmbVRe-czPECbMyTgJrz6fqdjQgCe11wNoOtWXxrE9yGY2B6kFfSSvNJbYBC_colmbPOXs8qQ8OfZIIIdH4l5_j8QcCSZxIuPmKX84XiVRSQufldee9Oc3AoNOaXLL99VE1lEChnS35M7BjHMNpdYinTDgG5CQfdI_FKku6xhl6OK26UQeKxDCagZX0FRrpd3_so0112g_1OuX6w-oT90vOe6ij5D4e5tfbTY4y4xgfGvRJpDqjUtcvjH7mjcP7IXBQFYaULEp2hmRv9Ixy--dgJYWqCGwJ0DguvaSAEBMO9t0SZxamUXGF15REjF-JPntuKBx5NSRPQ/p.png",
    "description": "The data contains Weekly crude oil prices from 1987 to 9/2023",
    "tags": ["oil", "price", "energy"],
    "purchases": 0,
    "createdBy": "0xf4982D4aC99d25d89Cc8993a88Dc643832B1515b",
    "createdAt": "2023-09-18T00:00:00.000Z",
    "currency": ACTIVE_CHAIN.symbol,
    "size": "10mb",
  }

export const EXAMPLE_OFFERS = [
    {"2023-05-13": 2, "2023-05-14": 5}
]

export const generateItem = (id) => {
    return {
        ...EXAMPLE_ITEM,
        id,
        price: Math.round(Math.random() * 10) / 10
    }
}


// export const IPFS_BASE_URL = 'https://ipfs.filebase.io/ipfs'
export const IPFS_BASE_URL = 'https://gateway.pinata.cloud/ipfs'

