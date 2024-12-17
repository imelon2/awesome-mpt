const { utf8ToBytes, bytesToUtf8, hexToBytes, bytesToHex } = require('ethereum-cryptography/utils')
const { Level } = require('level')
const { MemoryLevel } = require('memory-level')
const { MerklePatriciaTrie } = require('@ethereumjs/mpt')
const path = require('path')
const { toBytes } = require('@ethereumjs/util')

const ENCODING_OPTS = { keyEncoding: 'view', valueEncoding: 'view' }

class LevelDB {
  _leveldb

  constructor(leveldb) {
    this._leveldb = leveldb ?? new MemoryLevel(ENCODING_OPTS)
  }

  async get(key) {
    let value = null
    try {
      value = await this._leveldb.get(key, ENCODING_OPTS)
    } catch (error) {
      // This should be `true` if the error came from LevelDB
      // so we can check for `NOT true` to identify any non-404 errors
      if (error.notFound !== true) {
        throw error
      }
    }
    return value
  }

  async put(key, val) {
    await this._leveldb.put(key, val, ENCODING_OPTS)
  }

  async del(key) {
    await this._leveldb.del(key, ENCODING_OPTS)
  }

  async batch(opStack) {
    await this._leveldb.batch(opStack, ENCODING_OPTS)
  }

  shallowCopy() {
    return new LevelDB(this._leveldb)
  }
}
const CHAIN_DATA_PATH = path.join(__dirname, '../geth/chaindata');

const trie = new MerklePatriciaTrie({ 
  db: new LevelDB(new Level(CHAIN_DATA_PATH)),
  useKeyHashing: true,
  useRootPersistence: true,
})
async function test() {
  const key = toBytes("0x620000000000000015d377c1f945d2f101cefe8b22cc8cdc172b3aed23047a58112e8d13648a1fe96f")
  await trie.()
  console.log(bytesToHex(trie.root())) // 0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421
  
  // const db = trie.database().db
  // const a = await db.get(key,{
  //   keyEncoding: 'binary',
  //   valueEncoding: 'hex',
  // })
  // console.log(a);
  
}

void test()