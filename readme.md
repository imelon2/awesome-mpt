Referece: https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/mpt/examples/merkle_patricia_trees

```mermaid
stateDiagram-v2
    RLP[0,0x746573744b6579,HASH] --> RLP[null,null,null,null,null,null,...,value]
    RLP[null,null,null,null,null,null,...,value] --> RLP[1,03030,Branch_node]
    RLP[1,03030,Branch_node] --> RLP[null,null,null,HASHa,HASHb,null,...,null]
    RLP[null,null,null,HASHa,HASHb,null,...,null] --> RLP[3,1,value1]
    RLP[null,null,null,HASHa,HASHb,null,...,null] --> RLP[3,1,value2]
```