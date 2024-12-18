// import {} from '@ethereumjs/util'
import { Buffer } from 'buffer';
import BN from 'bn.js';

// Function to convert BN to an 8-byte big-endian Buffer
const bufBE8 = (n: BN): Buffer => n.toArrayLike(Buffer, 'be', 8);
// const bufBE8 = (n: BigIntLike): Buffer => n.toArrayLike(Buffer, 'be', 8);
