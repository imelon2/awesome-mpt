
// const { utf8ToBytes, bytesToUtf8 } = require('ethereum-cryptography/utils')
// const { MerklePatriciaTrie } = require('@ethereumjs/mpt')

// const { open } = require('lmdb')
// const path = require('path')

// class LMDB {
//   constructor(path) {
//     this.path = path
//     this.database = open({
//       compression: true,
//       name: '@ethereumjs/mpt',
//       path,
//     })
//   }

//   async get(key) {
//     return this.database.get(key)
//   }

//   async put(key, val) {
//     await this.database.put(key, val)
//   }

//   async del(key) {
//     await this.database.remove(key)
//   }

//   async batch(opStack) {
//     for (const op of opStack) {
//       if (op.type === 'put') {
//         await this.put(op.key, op.value)
//       }

//       if (op.type === 'del') {
//         await this.del(op.key)
//       }
//     }
//   }

//   shallowCopy() {
//     return new LMDB(this.path)
//   }
// }
// const CHAIN_DATA_PATH = path.join(__dirname, '../geth/');

// const trie = new MerklePatriciaTrie({ db: new LMDB(CHAIN_DATA_PATH) })

// async function test() {
//     try {
//         const db = trie.database().db
//         const stateRoot = Buffer.from('0xa5647f08b3204fd151d5eb6e14b90869eaed5b49e25633d202a1cd47d641199a', 'hex');
//         const s = await db.get("0x",    {
//             keyEncoding: "view",
//             valueEncoding: "view",
//           })
//         console.log(s);
        
//     } catch (error) {
//         console.log("error");
//         console.log(error);
        
//     }
// //   await trie.put(utf8ToBytes('test'), utf8ToBytes('one'))
// //   const value = await trie.get(utf8ToBytes('test'))
// //   console.log(bytesToUtf8(value)) // 'one'



// }

// void test()