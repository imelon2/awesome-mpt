Referece: https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/mpt/examples/merkle_patricia_trees

<div style="display: flex; gap: 20px; justify-content: center;">
<div>
    ```mermaid
    flowchart LR
        0[key] --> value
        1["testKey<br>(0x746573744b6579)"] --> 2["testValue<br>(0x7465737456616c7565)"]
        3["testKey0001<br>(0x746573744b657930303031)"] --> 4["testValue0<br>(0x7465737456616c756530)"]
        5["testKey000A<br>(0x746573744b657930303041)"] --> 6["testValueAAA<br>(0x7465737456616c7565414141)"]
    ```
</div>

<div>
    ```mermaid
    stateDiagram-v2
        RLP[0,0x746573744b6579,HASH] --> RLP[null,null,null,null,null,null,...,value]
        RLP[null,null,null,null,null,null,...,value] --> RLP[1,03030,Branch_node]
        RLP[1,03030,Branch_node] --> RLP[null,null,null,HASHa,HASHb,null,...,null]
        RLP[null,null,null,HASHa,HASHb,null,...,null] --> RLP[3,1,value1]
        RLP[null,null,null,HASHa,HASHb,null,...,null] --> RLP[3,1,value2]
    ```
</div>

</div>