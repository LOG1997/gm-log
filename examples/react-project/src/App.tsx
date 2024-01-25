import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import "./App.css";
import { SM2 } from 'gmlog'

interface KeyPair {
    privateKey: bigint | undefined
    publicKey: { x: undefined | bigint, y: undefined | bigint }
}
function App() {
    // 初始化
    const [isShowAlert, setIsShowAlert] = useState(false)
    const [isShowSuccess, setIsShowSuccess] = useState(false)
    const [isShowError, setIsShowError] = useState(false)

    const [p, setP] = useState(0x8542d69e4c044f18e8b92435bf6ff7de457283915c45517d722edb8b08f1dfc3n)
    const [a, setA] = useState(0x787968b4fa32c3fd2417842e73bbfeff2f3c848b6831d7e0ec65228b3937e498n)
    const [b, setB] = useState(0x63e4c6d3b23b0c849cf84241484bfe48f61d59a5b16ba06e6e12d1da27c5249an)
    const [n, setN] = useState(0x8542d69e4c044f18e8b92435bf6ff7dd297720630485628d5ae74ee7c32e79b7n)
    const [G, setG] = useState([0x421debd61b62eab6746434ebc3cc315e32220b3badd50bdc4c4e6c147fedd43dn, 0x0680512bcbb42c07d47349d2153b70c4e5d7fdfcbfa36ea1a85841b9e46e09a2n])
    const [h, setH] = useState(1n)

    const [IDA, setIDA] = useState('ALICE123@YAHOO.COM')
    const [IDB, setIDB] = useState('BILL456@YAHOO.COM')
    const option = false;
    const curveParam: any[] = [
        p,
        a,
        b,
        n,
        G,
        h,
    ];
    const sm = new SM2(...curveParam);
    // a的正式密钥
    const [smAKey, setSmAKey] = useState<KeyPair>({
        publicKey: { x: undefined, y: undefined },
        privateKey: undefined,
    });
    // b的正式密钥

    const [smBKey, setSmBKey] = useState<KeyPair>({
        publicKey: { x: 0n, y: 0n },
        privateKey: 0n,
    });

    // a的临时密钥
    const [rKeyA, setRKeyA] = useState<KeyPair>({
        publicKey: { x: undefined, y: undefined },
        privateKey: undefined,
    });

    // const rKeyA = sm.agreement_initiate();
    // console.log('😀rKeyA:', rKeyA);
    // b的临时密钥

    const [rKeyB, setRKeyB] = useState<KeyPair>({
        publicKey: { x: undefined, y: undefined },
        privateKey: undefined,
    });
    const generateKeyTmpB = () => {
        setIsShowSuccess(false)
        setIsShowError(false)
        setRKeyB(sm.agreement_initiate())
    }

    // const [RB, setRB] = useState<any[]>([undefined])
    const [KB, setKB] = useState<string>('')
    const [KA, setKA] = useState<string>('')
    const keyAgreement = () => {

        setIsShowError(false)
        setIsShowSuccess(false)
        const { publicKey: publicKeyA, privateKey: privateKeyA } = smAKey;
        const { publicKey: publicKeyB, privateKey: privateKeyB } = smBKey;
        const smA = new SM2(...curveParam, IDA as any, privateKeyA, publicKeyA as any);
        const smB = new SM2(...curveParam, IDB as any, privateKeyB, publicKeyB as any);
        if (rKeyA.privateKey === undefined || rKeyB.privateKey === undefined || smAKey.privateKey === undefined || smBKey.privateKey === undefined) {
            console.log('fail')
            setIsShowAlert(true)
            return
            // generateKeyA();
            // generateKeyB();
            // generateKeyTmpA();
            // generateKeyTmpB();
        }

        setIsShowAlert(false)
        const { res, content } = smB.agreement_response(
            rKeyA.publicKey as { x: bigint, y: bigint },
            publicKeyA as { x: bigint, y: bigint },
            IDA,
            option,
            rKeyB.privateKey,
            rKeyB.publicKey as { x: bigint, y: bigint }
        );
        console.log('😉res, content:', res, content);
        let RB = null,
            KB = null,
            SB = null,
            S2 = null;
        if (option) {
            RB = content[0];
            KB = content[1];
            SB = content[2];
            S2 = content[3];
        } else {
            RB = content[0];
            KB = content[1];
            SB = null;
        }
        setKB(KB as string)
        const { res: res1, content: content1 } = smA.agreement_confirm(
            rKeyA.privateKey as bigint,
            rKeyA.publicKey as { x: bigint, y: bigint },
            rKeyB.publicKey as { x: bigint, y: bigint },
            publicKeyB as { x: bigint, y: bigint },
            IDB,
            null,
            option
        );
        let KA = null,
            SA = null;
        if (option) {
            KA = content1[0];
            SA = content1[1];
        } else {
            KA = content1[0];
        }
        setKA(KA)
        if (KB == KA) {
            console.log('😎agreement success');
            setIsShowSuccess(true)
        } else {
            setIsShowError(true)
            console.log('😎agreement fail');
        }
    }

    // console.log('😎...curveParam:', ...curveParam)
    const generateKeyA = () => {
        setIsShowError(false)
        setIsShowSuccess(false)
        setSmAKey(sm.genKeyPaire())
    }
    const generateKeyB = () => {

        setIsShowError(false)
        setIsShowSuccess(false)
        setSmBKey(sm.genKeyPaire())
    }
    const generateKeyTmpA = () => {
        setIsShowSuccess(false)
        setIsShowError(false)
        setRKeyA(sm.agreement_initiate())
    }
    const generateAllkey = () => {
        generateKeyA();
        generateKeyB();
        generateKeyTmpA();
        generateKeyTmpB()
    }



    return (
        <div className="App w-full">
            {isShowAlert ?
                <div className="absolute w-full -mt-10">
                    <Alert severity="error" >不存在密钥参数，请检查</Alert>
                </div> : null}
            {isShowSuccess ?
                <div className="absolute w-full -mt-10">
                    <Alert severity="success">密钥协商成功</Alert>
                </div> : null}
            {isShowError ?
                <div className="absolute w-full -mt-10">
                    <Alert severity="error">密钥协商失败</Alert>
                </div> : null}

            <div className="w-full flex gap-3">
                <div className="flex flex-col gap-2 w-99 border-1 border-solid p-3 border-blue-300">
                    <h4 className="p-0 m-0">曲线参数</h4>
                    <TextField id="outlined-basic" label="p" variant="outlined" size="small" multiline
                        rows={2} value={p.toString(16)} />
                    <TextField id="outlined-basic" label="a" variant="outlined" size="small" multiline
                        rows={2} value={a.toString(16)} />
                    <TextField id="outlined-basic" label="b" variant="outlined" size="small" multiline
                        rows={2} value={b.toString(16)} />
                    <TextField id="outlined-basic" label="n" variant="outlined" size="small" multiline
                        rows={2} value={n.toString(16)} />
                    <TextField id="outlined-basic" label="Gx" variant="outlined" size="small" multiline
                        rows={2} value={G[0].toString(16)} />
                    <TextField id="outlined-basic" label="Gy" variant="outlined" size="small" multiline
                        rows={2} value={G[1].toString(16)} />
                    <TextField id="outlined-basic" label="IDA" variant="outlined" size="small" defaultValue={IDA} onChange={(event) => setIDA(event.target.value)} />
                    <TextField id="outlined-basic" label="IDB" variant="outlined" size="small" defaultValue={IDB} onChange={(event) => setIDB(event.target.value)} />
                </div>
                <div className="flex flex-col items-center gap-2 w-99 border-1 border-solid p-3 border-blue-300">
                    <h4 className="p-0 m-0">密钥</h4>
                    <div className="flex flex-col gap-2 w-88 border-1 border-solid p-3 border-green-300">
                        <h5 className="p-0 m-0">密钥A</h5>
                        <TextField id="outlined-basic" label="A's private key" variant="outlined" size="small" multiline
                            rows={2} value={smAKey.privateKey ? smAKey.privateKey.toString(16) : ''} />
                        <TextField id="outlined-basic" label="A's publick key-x" variant="outlined" size="small" multiline
                            rows={2} value={smAKey.publicKey.x ? smAKey.publicKey.x.toString(16) : ''} />
                        <TextField id="outlined-basic" label="A's publick key-y" variant="outlined" size="small" multiline
                            rows={2} value={smAKey.publicKey.y ? smAKey.publicKey.y.toString(16) : ''} />
                        <Button onClick={generateKeyA} variant="contained">A密钥生成</Button>
                    </div>
                    <div className="flex flex-col gap-2 w-88 border-1 border-solid p-3 border-green-300">
                        <h5 className="p-0 m-0">密钥B</h5>
                        <TextField id="outlined-basic" label="B's private key" variant="outlined" size="small" multiline
                            rows={2} value={smBKey.privateKey ? smBKey.privateKey.toString(16) : ''} />
                        <TextField id="outlined-basic" label="B's publick key-x" variant="outlined" size="small" multiline
                            rows={2} value={smBKey.publicKey.x ? smBKey.publicKey.x.toString(16) : ''} />
                        <TextField id="outlined-basic" label="B's publick key-y" variant="outlined" size="small" multiline
                            rows={2} value={smBKey.publicKey.y ? smBKey.publicKey.y.toString(16) : ''} />
                        <Button onClick={generateKeyB} variant="contained">B密钥生成</Button>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 w-99 border-1 border-solid p-3 border-blue-300">
                    <h4 className="p-0 m-0">临时密钥</h4>
                    <div className="flex flex-col gap-2 w-88 border-1 border-solid p-3 border-green-300">
                        <h5 className="p-0 m-0">临时密钥A</h5>
                        <TextField id="outlined-basic" label="A's private key" variant="outlined" size="small" multiline
                            rows={2} value={rKeyA.privateKey ? rKeyA.privateKey.toString(16) : ''} />
                        <TextField id="outlined-basic" label="A's publick key-x" variant="outlined" size="small" multiline
                            rows={2} value={rKeyA.publicKey.x ? rKeyA.publicKey.x.toString(16) : ''} />
                        <TextField id="outlined-basic" label="A's publick key-y" variant="outlined" size="small" multiline
                            rows={2} value={rKeyA.publicKey.y ? rKeyA.publicKey.y.toString(16) : ''} />
                        <Button onClick={generateKeyTmpA} variant="contained">A临时密钥生成</Button>
                    </div>
                    <div className="flex flex-col gap-2 w-88 border-1 border-solid p-3 border-green-300">
                        <h5 className="p-0 m-0">临时密钥B</h5>
                        <TextField id="outlined-basic" label="B's private key" variant="outlined" size="small" multiline
                            rows={2} value={rKeyB.privateKey ? rKeyB.privateKey.toString(16) : ''} />
                        <TextField id="outlined-basic" label="B's publick key-x" variant="outlined" size="small" multiline
                            rows={2} value={rKeyB.publicKey.x ? rKeyB.publicKey.x.toString(16) : ''} />
                        <TextField id="outlined-basic" label="B's publick key-y" variant="outlined" size="small" multiline
                            rows={2} value={rKeyB.publicKey.y ? rKeyB.publicKey.y.toString(16) : ''} />
                        <Button onClick={generateKeyTmpB} variant="contained">B临时密钥生成</Button>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-3 justify-center mt-10">
                <Button onClick={generateAllkey} variant="contained">生成所有密钥</Button>
                <Button onClick={keyAgreement} variant="contained">密钥协商</Button>
                <TextField className="w-89" id="outlined-basic" label="KA" variant="outlined" size="small" value={KA} />
                <TextField className="w-89" id="outlined-basic" label="KB" variant="outlined" size="small" value={KB} />
            </div>
        </div>
    );
}

export default App;
