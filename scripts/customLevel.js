const { MerklePatriciaTrie } = require('@ethereumjs/mpt')
const {Level} = require("level")

const ENCODING_OPTS = { keyEncoding: 'view', valueEncoding: 'view' }

class LevelDB {
    _leveldb
  
    constructor(leveldb) {
      this._leveldb = leveldb
    //   this._leveldb = leveldb ?? new MemoryLevel(ENCODING_OPTS)
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

async function main() {
    // const trie = new MerklePatriciaTrie({ db: new LevelDB(new Level('../chaindata')) })
    // console.log(trie.root());
    
    // console.log(trie.database().db);

    const db = new Level('../chaindata')
    await db.open()
    db.
    
    
}

void main()