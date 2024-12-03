import { createMPT, MerklePatriciaTrie } from '@ethereumjs/mpt'
import { bytesToHex, bytesToUtf8, MapDB, utf8ToBytes } from '@ethereumjs/util'
import { keccak256 } from 'ethereum-cryptography/keccak'



async function test() {
    const trie = new MerklePatriciaTrie({ useKeyHashing: true }) // We create an empty Merkle Patricia Tree
    console.log('Empty trie root (Bytes): ', bytesToHex(trie.root())) // The trie root (32 bytes)
    console.log();
    // const key = keccak256(utf8ToBytes('testKey')) // useKeyHashing : true
    const key = utf8ToBytes('testKey')
    const valueV = utf8ToBytes('testValue')
    await trie.put(key, valueV) // We update (using "put") the trie with the key-value pair hash("testKey"): "testValue"
    const value = await trie.get(key) // We retrieve (using "get") the value at hash("testKey")
    console.log('Value (Bytes): ', bytesToHex(value!))
    console.log('Value (String): ', bytesToUtf8(value!))
    console.log('Updated trie root:', bytesToHex(trie.root())) // The new trie root (32 bytes)
    console.log();
    
    await trie.del(key)
    const valuePost = await trie.get(keccak256(key)) // We try to retrieve the value at (deleted) key "testKey"
    console.log('Value at key "testKey": ', valuePost) // Key not found. Value is therefore null.
    console.log('Trie root after deletion:', bytesToHex(trie.root())) 
  }


void test()