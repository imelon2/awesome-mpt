// import { RLP } from "@ethereumjs/rlp";
import { BytesLike, PrefixedHexString, toBytes } from '@ethereumjs/util';
import BN from 'bn.js';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { Level } from 'level';
import path from 'path';
import RLP from 'rlp';

const CHAIN_DATA_PATH = path.join(__dirname, '../geth/chaindata');

const bufBE8 = (n: BN) => n.toArrayLike(Buffer, 'be', 8);
const headerKey = (n: BN, hash: Uint8Array) => Buffer.concat([Buffer.from('h'), bufBE8(n), hash]);
const bodyKey = (n: BN, hash: Uint8Array) => Buffer.concat([Buffer.from('b'), bufBE8(n), hash]);
const recptKey = (n: BN, hash: Uint8Array) => Buffer.concat([Buffer.from('r'), bufBE8(n), hash]);

export class ReadLevelDB {
  db;

  constructor(path: string = CHAIN_DATA_PATH) {
    this.db = new Level(path);
  }

  getBody(blockNumber: number, blockHash: BytesLike) {
    return this.db.get(
      bodyKey(new BN(blockNumber), toBytes(blockHash)),
      {
        keyEncoding: 'binary',
        valueEncoding: 'binary',
      },
      (err, value) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log(RLP.decode(value));
        }
      }
    );
  }

  getHeader(blockNumber: number, blockHash: BytesLike) {
    const _headerKey = headerKey(new BN(blockNumber), toBytes(blockHash));
    console.log(`headerKey: ${_headerKey.toString('hex')}`);

    return this.db.get(
      _headerKey,
      {
        keyEncoding: 'binary',
        valueEncoding: 'binary',
      },
      (err, value) => {
        if (err) {
          console.log(err);
          return;
        } else {
          RLP.decode(value).forEach((v) => {
            const a = Buffer.from(v as any).toString('hex');
            console.log(a);
          });
        }
      }
    );
  }

  getReceiptTrie(blockNumber: number, blockHash: BytesLike) {
    return this.db.get(
      recptKey(new BN(blockNumber), toBytes(blockHash)),
      {
        keyEncoding: 'view',
        valueEncoding: 'view',
      },
      (err, value) => {
        if (err) {
          console.log('error');

          console.log(err);
          return;
        } else {
          console.log('run');

          RLP.decode(value).forEach((v) => {
            const a = Buffer.from(v as any).toString('hex');
            console.log(a);
          });
        }
      }
    );
  }

  getStateTrie(stateRoot: BytesLike) {
    return this.db.get(
      toBytes(stateRoot),
      {
        keyEncoding: 'binary',
        valueEncoding: 'binary',
      },
      (err, value) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log('RUN');
          console.log(value);

          // RLP.decode(value).forEach((v) => {
          //   const a = Buffer.from(v as any).toString('hex')
          //   console.log(a);

          // });
        }
      }
    );
  }
}

(async () => {
  const db = new ReadLevelDB();
  // db.getStateTrie("0x8715655a0e3b50d8a40b939a297995ab46d07de8254eed89e90f56846cb0ccb2")
  // db.getHeader(36,"0xa75abfc2d5512c5179392f9e45401f6cd4b607e38b887d5f326f0d991b549636")
  // for await (const key of db.db.values({ valueEncoding: 'hex' })) {
  //   console.log(key);
  // }
  // for await (const key of db.db.keys({ keyEncoding: 'hex' })) {
  //   console.log(key);
  // }

  // const a = await db.db.get(toBytes("0x41"),{
  //   keyEncoding: 'binary',
  //   valueEncoding: 'hex',
  // })
  // console.log(a);

  for await (const [key, value] of db.db.iterator({keyEncoding:"hex",valueEncoding:"hex" })) {
    console.log([key, value])
  }
})();
