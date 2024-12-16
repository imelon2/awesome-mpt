import {
  BranchMPTNode,
  LeafMPTNode,
  MerklePatriciaTrie,
  MPTNode,
} from "@ethereumjs/mpt";
import {
  bytesToHex,
  bytesToUtf8,
  toBytes,
  utf8ToBytes,
} from "@ethereumjs/util";
import { keccak256 } from "ethereum-cryptography/keccak";

async function test() {
  const trie = new MerklePatriciaTrie(); // We create an empty Merkle Patricia Tree
  //   const trie = new MerklePatriciaTrie({ useKeyHashing: true }); // We create an empty Merkle Patricia Tree
  console.log("Empty trie root (Bytes): ", bytesToHex(trie.root())); // The trie root (32 bytes)
  console.log(trie.root());
  console.log();
  
  const key = "testKey";
  const value = "testValue";
  const key1 = "testKey0";
  const value1 = "testValue0";
  const key2 = "testKeyA";
  const value2 = "testValueAAA";
  const key3 = "tt";
  const value3 = "ttb";

  console.log(
    `${bytesToHex(utf8ToBytes(key))}   | ${utf8ToBytes(key).toString()}`
  );
  console.log(
    `${bytesToHex(utf8ToBytes(key1))} | ${utf8ToBytes(key1).toString()}`
  );
  console.log(
    `${bytesToHex(utf8ToBytes(key2))} | ${utf8ToBytes(key2).toString()}`
  );
  //   console.log(`${bytesToHex(utf8ToBytes(key3))} | ${utf8ToBytes(key3).toString()}`);
  console.log();
  console.log(
    `${bytesToHex(utf8ToBytes(value))}   | ${utf8ToBytes(value).toString()}`
  );
  console.log(
    `${bytesToHex(utf8ToBytes(value1))} | ${utf8ToBytes(value1).toString()}`
  );
  console.log(
    `${bytesToHex(utf8ToBytes(value2))} | ${utf8ToBytes(value2).toString()}`
  );
  //   console.log(`${bytesToHex(utf8ToBytes(value3))} | ${utf8ToBytes(value3).toString()}`);
  //   console.log();
  //   console.log();
  await trie.put(utf8ToBytes(key), utf8ToBytes(value));
  await trie.put(utf8ToBytes(key1), utf8ToBytes(value1));
  await trie.put(utf8ToBytes(key2), utf8ToBytes(value2));
    // await trie.put(utf8ToBytes(key3), utf8ToBytes(value3));

  console.log("Trie root (Bytes): ", bytesToHex(trie.root())); // The trie root (32 bytes)
  console.log();
  const _node1 = await trie.findPath(utf8ToBytes(key)); // We attempt to retrieve the node using our key "testKey"
  console.log("Node value: ", bytesToUtf8((_node1.node as any)._value)); // The branch node's value

  console.log("Node 1 branches: ", (_node1.node as any));
  //   (_node1.stack[0] as BranchMPTNode)._branches.map((b,i) => console.log(`${i}: ${b}`));
  console.log();
  //   (_node1.stack[0] as BranchMPTNode)._branches.map((b,i) => console.log(`${i}: ${Buffer.from(b as Uint8Array).toString("hex")}`))

  //   const node = _node1.node;
  //   console.log("Is Leaf: ", (node as LeafMPTNode));
  //   if (!node) {
  //     return;
  //   }

  //   const raw = node.raw();
  // //   console.log("Node value: ", bytesToHex(node._value!)); // The branch node's value
  //   console.log(
  //     "Node branches: ",
  //     Buffer.from(raw[0] as Uint8Array).toString("hex")
  //   );
  //   console.log(
  //     "Node value: ",
  //     Buffer.from(raw[1] as Uint8Array).toString("hex")
  //   );
  //   console.log();
}


void test();
