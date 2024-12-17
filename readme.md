Referece: https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/mpt/examples/merkle_patricia_trees

Ref: https://github.com/bit-warrior/Read-LevelDB-Geth/blob/master/readLevelDB.js

RefL https://etherworld.co/2019/02/06/reading-ethereum-geth-database-leveldb/?utm_source=chatgpt.com


```mermaid
flowchart LR
    0[key] --> value
    1["testKey<br>(0x746573744b6579)"] --> 2["testValue<br>(0x7465737456616c7565)"]
    3["testKey0001<br>(0x746573744b657930303031)"] --> 4["testValue0<br>(0x7465737456616c756530)"]
    5["testKey000A<br>(0x746573744b657930303041)"] --> 6["testValueAAA<br>(0x7465737456616c7565414141)"]
```

```mermaid
graph BT
    A["<div style='width:410px; text-align:center;'> RLP[ 0, 0x746573744b6579, <span style='color:#FFFF00'>Hash5</span> ] </div>"] 
    B["<div style='width:410px; text-align:center;'>RLP [null, null, null, <span style='color:#990000'>Hash4</span>, null, null, ...,] [value] </div>"]
    C["RLP [ 1, 03030, <span style='color:#B266FF'>Hash3</span> ]"]
    D["<div style='width:410px; text-align:center;'> RLP[ [ null, null, null, <span style='color:#00FF00'>Hash1</span>, <span style='color:#FF8000'>Hash2</span>, null, ... ] [ null ] ]</div>"]
    E["RLP[3, 1, value1]"]
    F["RLP[3, 1, value2]"]

    B --> | <span style='color:#FFFF00;'> Hash5 </span><br/> Branch Node | A
    C --> | <span style='color:#990000;'> Hash4 </span><br/> Extention Node | B
    D --> | <span style='color:#B266FF;'> Hash3 </span><br/> Branch Node | C
    E --> | <span style='color:#00FF00;'> Hash1 </span><br/> Leaf Node | D
    F --> | <span style='color:#FF8000;'> Hash2 </span><br/> Leaf Node | D

    %% style B stroke:#FFFF00,stroke-width:2px;
    %% style C stroke:#990000,stroke-width:2px;
    %% style D stroke:#B266FF,stroke-width:2px;
    %% style E stroke:#00FF00,stroke-width:2px;
    %% style F stroke:#FF8000,stroke-width:2px;
```


schema.go https://github.com/ethereum/go-ethereum/blob/v1.14.12/core/rawdb/schema.go
