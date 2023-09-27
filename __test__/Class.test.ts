// utils
import { SM2 } from '../packages/gm/sm'
import { describe, expect, test, it } from 'vitest'

describe('SM2', () => {
    it('验证SM2密钥协商', () => {
        const p = 0x8542d69e4c044f18e8b92435bf6ff7de457283915c45517d722edb8b08f1dfc3n
        const a = 0x787968b4fa32c3fd2417842e73bbfeff2f3c848b6831d7e0ec65228b3937e498n
        const b = 0x63e4c6d3b23b0c849cf84241484bfe48f61d59a5b16ba06e6e12d1da27c5249an
        const n = 0x8542d69e4c044f18e8b92435bf6ff7dd297720630485628d5ae74ee7c32e79b7n
        const G = [0x421debd61b62eab6746434ebc3cc315e32220b3badd50bdc4c4e6c147fedd43dn, 0x0680512bcbb42c07d47349d2153b70c4e5d7fdfcbfa36ea1a85841b9e46e09a2n]
        const h = 1n

        const IDA = 'ALICE123@YAHOO.COM'
        const IDB = 'BILL456@YAHOO.COM'
        const option = false
        const curveParam: any[] = [p, a, b, n, G, h];

        const sm = new SM2(...curveParam)
        function generateSM2() {
            // 正式密钥
            console.time('agreement')
            const smAKey = sm.genKeyPaire()
            const smBKey = sm.genKeyPaire()
            // 临时密钥
            const rKeyA = sm.agreement_initiate()
            const rKeyB = sm.agreement_initiate()

            // 开始协商
            const { publicKey: publicKeyA, privateKey: privateKeyA } = smAKey;
            const { publicKey: publicKeyB, privateKey: privateKeyB } = smBKey;
            const smA = new SM2(...curveParam, IDA as any, privateKeyA, publicKeyA as any);
            const smB = new SM2(...curveParam, IDB as any, privateKeyB, publicKeyB as any);

            const { res: resB, content: contentB } = smB.agreement_response(
                rKeyA.publicKey as { x: bigint, y: bigint },
                publicKeyA as { x: bigint, y: bigint },
                IDA,
                option,
                rKeyB.privateKey,
                rKeyB.publicKey as { x: bigint, y: bigint }
            );
            const KB = contentB[1]

            const { res: resA, content: contentA } = smA.agreement_confirm(
                rKeyA.privateKey as bigint,
                rKeyA.publicKey as { x: bigint, y: bigint },
                rKeyB.publicKey as { x: bigint, y: bigint },
                publicKeyB as { x: bigint, y: bigint },
                IDB,
                null,
                option
            );

            const KA = contentA[0]

            console.timeEnd('agreement')
            return {
                KB, KA
            }
        }
        for (let i = 0; i < 100; i++) {
            const { KB, KA } = generateSM2()
            expect(KB).toBe(KA)
        }
    })
})



