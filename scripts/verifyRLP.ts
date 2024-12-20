import { BranchMPTNode, ExtensionMPTNode, MerklePatriciaTrie } from '@ethereumjs/mpt';
import { bytesToHex, utf8ToBytes } from 'ethereum-cryptography/utils';

async function main() {
  const trie = new MerklePatriciaTrie({
    useKeyHashing:false
  }); // We create an empty Merkle Patricia Tree
  console.log('Empty trie root (Bytes): ', bytesToHex(trie.root())); // The trie root (32 bytes)
  console.log();
  const key = 'testKey';
  const value = 'testValue';
  const key1 = 'testKey0001';
  const value1 = 'testValue0';
  const key2 = 'testKey000A';
  const value2 = 'testValueAAA';
  console.log('### KEY ###');
  console.log(`${key}     | 0x${bytesToHex(utf8ToBytes(key))}         | ${utf8ToBytes(key).toString()}`);
  console.log(`${key1} | 0x${bytesToHex(utf8ToBytes(key1))} | ${utf8ToBytes(key1).toString()}`);
  console.log(`${key2} | 0x${bytesToHex(utf8ToBytes(key2))} | ${utf8ToBytes(key2).toString()}`);
  console.log();

  console.log('### VALUE ###');
  console.log(`${value}    | 0x${bytesToHex(utf8ToBytes(value))}       | ${utf8ToBytes(value).toString()}`);
  console.log(`${value1}   | 0x${bytesToHex(utf8ToBytes(value1))}     | ${utf8ToBytes(value1).toString()}`);
  console.log(`${value2} | 0x${bytesToHex(utf8ToBytes(value2))} | ${utf8ToBytes(value2).toString()}`);
  console.log();

  await trie.put(utf8ToBytes(key), utf8ToBytes(value));
  await trie.put(utf8ToBytes(key1), utf8ToBytes(value1));
  await trie.put(utf8ToBytes(key2), utf8ToBytes(value2));

  const node1 = await trie.findPath(utf8ToBytes(key)); // Looking up our branch node
  console.log(node1);
  console.log();

  const node2 = await trie.lookupNode((node1.node as BranchMPTNode)._branches[3]!)
  console.log(node2);
  console.log();
  
  const node3 = await trie.lookupNode(node2._value!)
  console.log(node3);
  console.log();


  const leadf1 = await trie.lookupNode((node3 as BranchMPTNode)._branches[3]!)
  const leadf2 = await trie.lookupNode((node3 as BranchMPTNode)._branches[4]!)

  console.log(leadf1);
  console.log(leadf2);
  
  // console.log((node1.node as BranchMPTNode)._branches[3]); // The branch node
}

void main();
