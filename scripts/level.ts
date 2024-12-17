import { MerklePatriciaTrie } from '@ethereumjs/mpt';
import { KeyEncoding, toBytes, ValueEncoding } from '@ethereumjs/util';
import { Level } from 'level';
import { MemoryLevel } from 'memory-level';
import path from 'path';

import type { BatchDBOp, DB, DBObject, EncodingOpts } from '@ethereumjs/util';
import type { AbstractLevel } from 'abstract-level';
import { bytesToHex, bytesToUtf8, hexToBytes } from 'ethereum-cryptography/utils';
import { keccak256 } from 'ethereum-cryptography/keccak';
import BN from 'bn.js';

// Helper to infer the `valueEncoding` option for `putting` a value in a levelDB
const ENCODING_OPTS = { keyEncoding: 'view', valueEncoding: 'view' }

/**
 * LevelDB is a thin wrapper around the underlying levelup db,
 * corresponding to the {@link DB}
 */
class LevelDB {
  _leveldb

  constructor(leveldb:Level<string, string>) {
    this._leveldb = leveldb
  }

  async get(key:Uint8Array) {
    let value = null
    try {
      value = await this._leveldb.get(key, ENCODING_OPTS)
    } catch (error) {
      // This should be `true` if the error came from LevelDB
      // so we can check for `NOT true` to identify any non-404 errors
      if ((error as any).notFound !== true) {
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

  open() {
    return this._leveldb.open() 
  }
}


const bufBE8 = (n: BN) => n.toArrayLike(Buffer, 'be', 8);
const headerKey = (n: BN, hash: Uint8Array) => Buffer.concat([Buffer.from('h'), bufBE8(n), hash]);

async function main() {
  try {
    const stateRoot = '0xa75abfc2d5512c5179392f9e45401f6cd4b607e38b887d5f326f0d991b549636'; // 블록 헤더에서 추출한 stateRoot
    const accountAddress = '0x1001150aE8Ec8843BDcA3c7dE86A291B43a7F835';
    
    const CHAIN_DATA_PATH = path.join(__dirname, '../geth/chaindata');
    const trie = new MerklePatriciaTrie({ 
      db: new LevelDB(new Level(CHAIN_DATA_PATH)),
      useRootPersistence: true,
      // root:toBytes(stateRoot)
    });
  
  // console.log(bytesToHex(trie.root()));
  
    // const trie = new MerklePatriciaTrie({ db: new LevelDB(new Level(CHAIN_DATA_PATH)),root:hexToBytes("0x8715655a0e3b50d8a40b939a297995ab46d07de8254eed89e90f56846cb0ccb2") })
    // console.log(trie.database().db) // LevelDB { ...
    // const db = trie.database().db
  
  const db = trie.database().db  
  const a = await db.get(("620000000000000015d377c1f945d2f101cefe8b22cc8cdc172b3aed23047a58112e8d13648a1fe96f"),
{
  keyEncoding:KeyEncoding.Bytes,
  valueEncoding: ValueEncoding.Bytes,
})
    // const a = await trie.get(hexToBytes("680000000000000024a75abfc2d5512c5179392f9e45401f6cd4b607e38b887d5f326f0d991b549636"))
  console.log(a);
  
    // const accountKey = keccak256(hexToBytes(accountAddress));
    
  } catch (error) {
  console.log(error);
      
  }

}
void main();
