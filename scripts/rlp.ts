import { keccak256 } from "ethereum-cryptography/keccak"
import { bytesToHex, hexToBytes } from "ethereum-cryptography/utils"
import RLP from "rlp"

async function main() {
const hex = "0x90cf038b295be96e63af9f0e3dbd308080c0"

const a =RLP.decode(hex)
console.log(a);

// const b = a[1] as Uint8Array
// console.log(bytesToHex(b));

// console.log(RLP.decode(a));

// const a = keccak256(hexToBytes("0x1001150ae8ec8843bdca3c7de86a291b43a7f835"))
// console.log(bytesToHex(a));

}

void main()

// 0x295be96e64066972000000
// 0x295be96e64066972000000