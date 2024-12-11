import { MerklePatriciaTrie } from '@ethereumjs/mpt';
import { bytesToHex, utf8ToBytes } from 'ethereum-cryptography/utils';

async function test() {
  const trie = new MerklePatriciaTrie(); // We create an empty Merkle Patricia Tree
  console.log('Empty trie root (Bytes): ', bytesToHex(trie.root())); // The trie root (32 bytes)
  console.log();
  const key = 'testKey';
  const value = 'testValue';
  const key1 = 'testKey0001';
  const value1 = 'testValue0';
  const key2 = 'testKey000A';
  const value2 = 'testValueAAA';

  console.log(`${bytesToHex(utf8ToBytes(key))}   | ${utf8ToBytes(key).toString()}`);
  console.log(`${bytesToHex(utf8ToBytes(key1))} | ${utf8ToBytes(key1).toString()}`);
  console.log(`${bytesToHex(utf8ToBytes(key2))} | ${utf8ToBytes(key2).toString()}`);
  await trie.put(utf8ToBytes(key), utf8ToBytes('testValue'));
  await trie.put(utf8ToBytes(key1), utf8ToBytes('testValue0'));
  await trie.put(utf8ToBytes(key2), utf8ToBytes('testValueA'));

  const node1 = await trie.findPath(utf8ToBytes(key)); // Looking up our branch node
  console.log(node1.node); // The branch node

  const node2 = await trie.lookupNode((node1.node as any)._branches[3]); // Looking up the child node from its hash (using lookupNode)
  console.log(node2);
  // console.log(bytesToHex(node2._value!));
  console.log();

  const node3 = (await trie.lookupNode(node2._value!)) as any;
  console.log(node3._branches[3]);
  console.log(node3._branches[4]);
}

void test();
