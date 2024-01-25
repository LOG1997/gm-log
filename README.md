# 国密密钥交换JavaScript实现

该方法是使用国密进行密钥交换算法的js版本实现。实现方法详见[示例项目](./examples/react-project/src/App.tsx)。

步骤：
1. 安装依赖包

```bash
npm i gmlog

or

pnpm i gmlog
```

2. 导入使用

```typescript
import { SM2 } from 'gmlog'
```

3. 初始化

设置初始点坐标

```typescript
p = 0x8542d69e4c044f18e8b92435bf6ff7de457283915c45517d722edb8b08f1dfc3n
a = 0x787968b4fa32c3fd2417842e73bbfeff2f3c848b6831d7e0ec65228b3937e498n
b = 0x63e4c6d3b23b0c849cf84241484bfe48f61d59a5b16ba06e6e12d1da27c5249an
n = 0x8542d69e4c044f18e8b92435bf6ff7dd297720630485628d5ae74ee7c32e79b7n
G = [0x421debd61b62eab6746434ebc3cc315e32220b3badd50bdc4c4e6c147fedd43dn,                0x0680512bcbb42c07d47349d2153b70c4e5d7fdfcbfa36ea1a85841b9e46e09a2n]
h = 1n
```

设置身份(也可以为空)

```typescipt
IDA='ALICE123@YAHOO.COM'
IDB='BOB123@YAHOO.COM'
```

将上面设置的椭圆曲线上的点赋值给导入的`SM2`对象。

```typescript
    const curveParam: any[] = [
        p,
        a,
        b,
        n,
        G,
        h,
    ];
    const sm = new SM2(...curveParam);

// 生成SMA
const smA = new SM2(...curveParam, IDA as any, privateKeyA, publicKeyA as any);
```

4. 生成密钥对

A要完成密钥协商需要A的密钥对和B的临时密钥对。同理，B要完成密钥协商也要A的临时密钥对和B的密钥对。以A为例，在A这侧需要生成两个密钥对。
生成方式使用`sm.genKeyPair()`方法。
生成临时密钥使用`sm.agreement_initiate()`方法。

在获得临时密钥后，将临时密钥的和正式密钥的公钥都发送给B，同理A收到B的临时密钥和正式密钥的公钥后即可以开始密钥协商。

```typescript
  const { res: res1, content: content1 } = smA.agreement_confirm(
            rKeyA.privateKey as bigint, //A的临时密钥私钥
            rKeyA.publicKey as { x: bigint, y: bigint }, // A的临时密钥公钥
            rKeyB.publicKey as { x: bigint, y: bigint }, // b的临时密钥公钥
            publicKeyB as { x: bigint, y: bigint }, //B的正式密钥公钥
            IDB, // B的ID 可为空
            null,
            option // 选项 可为空，取值为bool值
        );
```

5. 获取密钥协商后的密钥

```typescript
 let KA = null, // 密钥协商获取的密钥
            SA = null;
        if (option) {
            KA = content1[0];
            SA = content1[1];
        } else {
            KA = content1[0];
        }
```

> {x:bigint,y:bigint}类型的密钥类型转化为十六进制字符串使用toString(16)方法。
