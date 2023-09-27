import { SecureRandom, BigInteger } from 'jsbn';
import smCrypto from 'sm-crypto';
// eslint-disable-next-line no-unused-vars
import { toByte, joinUint8Array, ab2hex, hex2ab, pyMod } from './utils';
// const smallPrimes = new Array([
//   2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109,
//   113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239,
//   241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379,
//   383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521,
//   523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661,
//   673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827,
//   829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991,
//   997,
// ]);
// 是否素数
// const isPrimes = (num) => {
//   if (num < 2) return false;

//   for (let i = 0; i < smallPrimes.length; i++) {
//     if (num % smallPrimes[i] == 0) {
//       return false;
//     }
//   }
//   return rabinMiller(num);
// };
// function rabinMiller(num) {
//   let s = num - 1;
//   let t = 0;
//   while (s & (1 === 0)) {
//     s >>= 1;
//     t += 1;
//   }
//   for (let trials = 0; trials < 5; trials++) {
//     let a = Math.floor(Math.random() * (num - 2)) + 2;
//     let v = Math.pow(a, s, num);
//     if (v !== 1 && v !== num - 1) {
//       let i = 0;
//       while (v !== num - 1) {
//         if (i === t - 1) {
//           return false;
//         }
//         i++;
//         v = Math.pow(v, 2, num);
//       }
//     }
//   }
//   return true;
// }

// 最大公约数
function gcd(a: bigint, b: bigint): bigint {
    if (b == 0n) {
        return a;
    } else {
        return gcd(b, pyMod(a, b));
    }
}

function get_(a: bigint, b: bigint): [bigint, bigint] {
    if (b === 0n) {
        return [1n, 0n];
    } else {
        const [x1, y1] = get_(b, pyMod(a, b));
        return [y1, x1 - (a / b) * y1];
    }
}

function getInverse(a: bigint, p: bigint) {
    // This is a faster way to calculate the inverse of a modulo p, but it only works if a and p are relatively prime.
    // return Math.pow(a, p - 2, p);

    // This is the slower way, but it works for all values of a and p.
    if (gcd(a, p) === 1n) {
        // eslint-disable-next-line no-unused-vars
        const [x, y] = get_(a, p);
        return pyMod(x, p);
    } else {
        return 1n;
    }
}
// function getCpuTime() {
//   return performance.now();
// }

// 密钥派生函数（从一个共享的秘密比特串中派生出密钥数据）
// SM2第3部分 5.4.3
// Z为bytes类型
// klen表示要获得的密钥数据的比特长度（8的倍数），int类型
// 输出为bytes类型

const HASH_SIZE = 32;

function KDF(Z: Uint8Array | string, klen: number) {
    if (typeof Z != 'string') {
        Z = ab2hex(Z);
    }
    const ksize = klen >> 3;
    let K = '';
    for (let ct = 1; ct < Math.ceil(ksize / HASH_SIZE) + 1; ct++) {
        const zsdf = hex2ab(Z + ab2hex(toByte(BigInt(ct), 4n) as Uint8Array));
        const sm3zf = smCrypto.sm3(zsdf);
        K = K + sm3zf;
    }
    return K.slice(0, ksize * 2);
}

function getBitNum(x: number | string | Uint8Array | null | undefined) {
    if (typeof x === 'number') {
        let num = 0;
        let tmp = x >> 64;
        while (tmp !== 0) {
            num += 64;
            tmp >>= 64;
        }
        tmp = (x >> num) >>> 8;
        while (tmp !== 0) {
            num += 8;
            tmp >>= 8;
        }
        x >>= num;
        while (x !== 0) {
            num += 1;
            x >>= 1;
        }
        return num;
    } else if (typeof x === 'string') {
        return x.length * 8;
    } else if (Buffer.isBuffer(x)) {
        return x.length * 8;
    }
    return 0;
}

class ECC {
    p: bigint;
    a: bigint;
    b: bigint;
    n: bigint;
    G: bigint[];
    O: [bigint, bigint];
    _2: bigint;
    a_3: bigint;
    h: bigint | undefined
    constructor(p: bigint, a: bigint, b: bigint, n: bigint, G: bigint[], h: bigint | null) {
        this.p = p;
        this.a = a;
        this.b = b;
        this.n = n;
        this.G = G;
        if (h) {
            this.h = h;
        }
        this.O = [-1n, -1n]; // Infinity point in affine coords

        // Precompute constants for Jacobian add
        this._2 = getInverse(2n, p);
        this.a_3 = pyMod(a + 3n, p);
    }
    genKeyPaire() {
        const rng = new SecureRandom();
        const nBig = new BigInteger(this.n.toString(16));
        const initLen = this.n.toString(16).length * 4;
        const randomNum = new BigInteger(initLen, rng);
        const randomBigNum = randomNum.mod(nBig.subtract(BigInteger.ONE)).add(BigInteger.ONE)
        const d = BigInt(randomBigNum.toString());
        // const d = 0x6fcba2ef9ae0ab902bc3bde3ff915d44ba4cc78f88e2f8e7f8996d3b8cceedeen;

        const P = this.Jacb_multiply(d, this.G);
        return {
            publicKey: { x: P[0], y: P[1] },
            privateKey: d,
        };
    }

    Jacb_multiply(k: bigint, P: bigint[], conv = true) {
        let Q;
        if (k === 0n || (P[0] == this.O[0] && P[1] == this.O[1])) return this.O;

        const h = (3n * k).toString(2);
        let kBin = k.toString(2);
        kBin = '0'.repeat(h.length - kBin.length) + kBin;
        // debugger;
        Q = Array.from(P);
        const minusP = this.minus(P);

        for (let i = 1; i < h.length - 1; i++) {
            Q = this.Jacb_add(Q);
            if (h[i] === '1' && kBin[i] === '0') {
                Q = this.Jacb_add(Q, P);
            } else if (h[i] === '0' && kBin[i] === '1') {
                Q = this.Jacb_add(Q, minusP);
            }
        }

        // Add and subtract algorithm
        if (conv) {
            return this.Jacb_to_affine(Q);
        } else {
            return Q;
        }
    }
    Jacb_add(P1: bigint[], P2: bigint[] | null = null) {
        let T2, T4, x3, y3, z3;
        if (!P2 || P1 === P2) {
            if (P1 === this.O) return this.O;

            const x1 = P1[0];
            const y1 = P1[1];
            const z1 = P1[2] || 1n;

            z3 = pyMod((y1 * z1) << 1n, this.p);
            if (z3 === 0n) return this.O;

            T2 = pyMod(y1 * y1, this.p);
            T4 = pyMod(T2 << 3n, this.p);
            const T5 = pyMod(x1 * T4, this.p);
            const T6 = pyMod(z1 * z1, this.p);
            let T1 = pyMod((x1 + T6) * (x1 - T6) * 3n, this.p);
            T1 = pyMod(T1 + this.a_3 * T6 * T6, this.p);
            const T3 = pyMod(T1 * T1, this.p);
            T2 = pyMod(T2 * T4, this.p);
            x3 = pyMod(T3 - T5, this.p);
            T4 = T5 & 1n ? T5 + ((T5 + this.p) >> 1n) - T3 : T5 + (T5 >> 1n) - T3;
            T1 = pyMod(T1 * T4, this.p);
            y3 = pyMod(T1 - T2, this.p);
        } else {
            if (P1 === this.O) return P2;
            if (P2 === this.O) return P1;

            let x1 = P1[0];
            let y1 = P1[1];
            let z1 = P1[2] || 1n;
            let x2 = P2[0];
            let y2 = P2[1];
            const z2 = P2[2] || 1n;

            if (z2 != 1n && z1 != 1n) {
                const z1_2 = pyMod(z1 * z1, this.p);
                const z2_2 = pyMod(z2 * z2, this.p);
                const T1 = pyMod(x1 * z2_2, this.p);
                T2 = pyMod(x2 * z1_2, this.p);
                const T3 = T1 - T2;
                z3 = pyMod(z1 * z2 * T3, this.p);
                if (z3 == 0n) {
                    return this.O;
                }
                T4 = pyMod(y1 * z2 * z2_2, this.p);
                const T5 = pyMod(y2 * z1 * z1_2, this.p);
                const T6 = T4 - T5;
                const T7 = T1 + T2;
                const T8 = T4 + T5;
                const T3_2 = pyMod(T3 * T3, this.p);
                x3 = pyMod(T6 * T6 - T7 * T3_2, this.p);
                const T9 = pyMod(T7 * T3_2 - (x3 << 1n), this.p);
                // y3 = ((T9 * T6 - T8 * T3 * T3_2) % this._2) % this.p;
                y3 = pyMod((T9 * T6 - T8 * T3 * T3_2) * this._2, this.p);
            } else {
                if (z1 === 1n) {
                    [x1, y1, z1, x2, y2] = [x2, y2, z2, x1, y1];
                }
                let T1 = pyMod(z1 * z1, this.p);
                T2 = pyMod(y2 * z1, this.p);
                let T3 = pyMod(x2 * T1, this.p);
                T1 = pyMod(T1 * T2, this.p);
                T2 = T3 - x1;
                z3 = pyMod(z1 * T2, this.p);
                if (z3 === 0n) return this.O;

                T3 += x1;
                T1 -= y1;
                T4 = pyMod(T2 * T2, this.p);
                const T5 = pyMod(T1 * T1, this.p);
                T2 = pyMod(T2 * T4, this.p);
                T3 = pyMod(T3 * T4, this.p);
                T4 = pyMod(x1 * T4, this.p);
                x3 = T5 - pyMod(T3, this.p);
                T2 = pyMod(y1 * T2, this.p);
                T3 = T4 - x3;
                T1 = pyMod(T1 * T3, this.p);
                y3 = T1 - pyMod(T2, this.p);
            }
        }

        return [x3, y3, z3];
    }
    Jacb_to_affine(P: bigint[]) {
        if (P.length == 2) {
            return P;
        }
        const [x, y, z] = P;
        if (z == 0n) {
            return this.O;
        }
        const z_ = getInverse(z, this.p);
        const x2 = pyMod(x * z_ * z_, this.p);
        const y2 = pyMod(y * z_ * z_ * z_, this.p);
        return [x2, y2];
    }
    // Negation of a point
    minus(P: bigint[]) {
        const Q_tmp = Array.from(P);
        Q_tmp[1] = -Q_tmp[1];
        return Q_tmp;
    }
    isZero(P: bigint[]) {
        if (P.length == 2) {
            return P == this.O;
        } else {
            return P[2] == 0n;
        }
    }
    // 判断是否在椭圆曲线上
    onCurve(P: bigint[]) {
        if (this.isZero(P)) {
            return false;
        }
        if (P.length == 2) {
            const [x, y] = P;
            return (y * y) % this.p == (x * x * x + this.a * x + this.b) % this.p;
        } else {
            const [x, y, z] = P;
            return (
                (y * y) % this.p == (x * x * x + this.a * x * pyMod(z ** 4n, this.p) + this.b * pyMod(z ** 6n, this.p)) % this.p
            );
        }
    }
}

// const SM2_p = 0xfffffffeffffffffffffffffffffffffffffffff00000000ffffffffffffffffn;
// const SM2_a = 0xfffffffeffffffffffffffffffffffffffffffff00000000fffffffffffffffcn;
// const SM2_b = 0x28e9fa9e9d9f5e344d5a9e4bcf6509a7f39789f515ab8f92ddbcbd414d940e93n;
// const SM2_n = 0xfffffffeffffffffffffffffffffffff7203df6b21c6052b53bbf40939d54123n;
// const SM2_Gx = 0x32c4ae2c1f1981195f9904466a39c9948fe30bbff2660be1715a4589334c74c7n;
// const SM2_Gy = 0xbc3736a2f4f6779c59bdcee36b692153d0a9877cc62a474002df32e52139f0a0n;

const SM2_p = 0x8542d69e4c044f18e8b92435bf6ff7de457283915c45517d722edb8b08f1dfc3n;
const SM2_a = 0x787968b4fa32c3fd2417842e73bbfeff2f3c848b6831d7e0ec65228b3937e498n;
const SM2_b = 0x63e4c6d3b23b0c849cf84241484bfe48f61d59a5b16ba06e6e12d1da27c5249an;
const SM2_n = 0x8542d69e4c044f18e8b92435bf6ff7dd297720630485628d5ae74ee7c32e79b7n;
const SM2_Gx = 0x421debd61b62eab6746434ebc3cc315e32220b3badd50bdc4c4e6c147fedd43dn;
const SM2_Gy = 0x0680512bcbb42c07d47349d2153b70c4e5d7fdfcbfa36ea1a85841b9e46e09a2n;
// const SM2_w_l_1 = 127n; // w * 2
// const PARA_SIZE = 32;
// eslint-disable-next-line no-unused-vars
const KEY_LEN = 128;
class SM2 extends ECC {
    ID: string | undefined | null;
    pk: { x: bigint; y: bigint; } | undefined;
    sk: bigint | undefined;
    Z: Uint8Array | undefined
    constructor(
        p: bigint = SM2_p,
        a: bigint = SM2_a,
        b: bigint = SM2_b,
        n: bigint = SM2_n,
        G: bigint[] = [SM2_Gx, SM2_Gy],
        h = 1n,
        ID = '',
        sk?: bigint,
        pk?: { x: bigint; y: bigint; },
        gen_keypair = true
    ) {
        super(p, a, b, n, G, h);
        this.h = h;
        if (typeof ID === 'string' || typeof ID === 'number') {
            this.ID = ID;
        } else {
            this.ID = null;
        }
        if (!sk || !pk) {
            this.initKey();
        } else {
            this.pk = pk;
            this.sk = sk;
        }
    }
    initKey() {
        const keyPair = this.genKeyPaire();
        this.pk = keyPair.publicKey;
        this.sk = keyPair.privateKey;
    }
    /**
     *
     * @param {*} ID
     * @param {BigInt{x,y}} P 公钥
     */
    getZ(ID?: string | null, P?: { x: bigint, y: bigint }) {
        // TODO:如果未传入P
        let save = false;
        if (!P) {
            if (Object.hasOwnProperty.call(this, 'Z')) {
                return this.Z;
            } else {
                ID = this.ID;
                P = this.pk;
                save = true;
            }
        }
        if (!P) {
            return
        }
        const entlen = getBitNum(ID);
        const ENTL = toByte(BigInt(entlen), 2n);
        const arr = [
            ENTL,
            toByte(ID),
            toByte(this.a),
            toByte(this.b),
            toByte(this.G[0]),
            toByte(this.G[1]),
            toByte(BigInt(P.x)),
            toByte(BigInt(P.y)),
        ];
        const joinArr = joinUint8Array(arr);
        const Z = hex2ab(smCrypto.sm3(joinArr));
        if (save) {
            this.Z = Z;
        }
        return Z;
    }
    // 生成临时公钥私钥
    agreement_initiate() {
        return this.genKeyPaire();
        // const rKey = smCrypto.sm2.generateKeyPairBigInt();
        // return rKey;
    }
    /**
     * @param {BigInt{x,y}} RA 临时公钥
     * @param {BigInt{x,y}} PA 公钥
     * @param {*} IDA ID
     * @param {BigInt{x,y}} [RB=null] 临时公钥
     * @param {BigInt} [rB=null] 临时私钥
     * @param {number} [kLen=null]
     */
    agreement_response(RA: { x: bigint, y: bigint }, PA: { x: bigint, y: bigint }, IDA = '', option = false, rB: null | bigint = null, RB: { x: bigint, y: bigint } | null = null, kLen: number | null = null) {
        //TODO： type RA PA rB RB。为字符串将其转化为BigInt
        // TODO:判断点是否在椭圆曲线上

        // eslint-disable-next-line no-unused-vars
        const x1 = BigInt(RA.x);
        const y1 = BigInt(RA.y);
        if (!this.onCurve([x1, y1])) {
            throw new Error('不在曲线上');
        }
        const w = 127n;
        // TODO:验证sk

        const h = 1n;

        const ZA = this.getZ(IDA, PA);

        /**************true */
        const ZB = this.getZ();
        if (!rB || !RB) {
            const rbkey = this.genKeyPaire();
            RB = rbkey.publicKey;
            rB = rbkey.privateKey;
        }

        const x2 = BigInt(RB.x);
        const y2 = BigInt(RB.y);
        // TODO:如果没有rB和RB，生成一对

        // const RBy = BigInt(RB.y);

        const x_2 = (1n << w) + (x2 & ((1n << w) - 1n));

        const tB = (BigInt(this.sk as bigint) + x_2 * BigInt(rB)) % this.n;

        const hTB = h * tB;

        const x_1 = (1n << w) + (x1 & ((1n << w) - 1n));
        const jacb_add_res = this.Jacb_add(this.Jacb_multiply(x_1, [BigInt(RA.x), BigInt(RA.y)], false), [
            BigInt(PA.x),
            BigInt(PA.y),
        ]);
        const V = this.Jacb_multiply(hTB, jacb_add_res);
        if (this.isZero(V)) {
            throw new Error('无穷远点');
        }
        const [xV, yV] = V;
        if (!kLen) {
            kLen = KEY_LEN;
        }

        const KBArray = joinUint8Array([toByte(xV), toByte(yV), ZA, ZB]);
        const KB = KDF(KBArray, kLen);

        if (!option) {
            return {
                res: true,
                content: [RB, KB],
            };
        }
        const tmpArr = joinUint8Array([toByte(xV), ZA, ZB, toByte(x1), toByte(y1), toByte(x2), toByte(y2)]);

        const tmpSM3 = joinUint8Array([toByte(yV), toByte(smCrypto.sm3(tmpArr))]);
        const SB = smCrypto.sm3(joinUint8Array([toByte(2n), tmpSM3]));
        const S2 = smCrypto.sm3(joinUint8Array([toByte(3n), tmpSM3]));
        return {
            res: true,
            content: [RB, KB, SB, S2],
        };
    }

    agreement_confirm(rA: bigint, RA: { x: bigint, y: bigint }, RB: { x: bigint, y: bigint }, PB: { x: bigint, y: bigint }, IDB = '', SB: bigint | null = null, option = false, kLen: number | null = null) {
        // TODO:验证是否在曲线上

        let { x: x1, y: y1 } = RA;
        let { x: x2, y: y2 } = RB;
        x1 = BigInt(x1);
        y1 = BigInt(y1);
        x2 = BigInt(x2);
        y2 = BigInt(y2);
        if (!this.onCurve([x2, y2])) {
            throw new Error('不在曲线上');
        }
        const w = 127n;
        // TODO:验证sk
        const h = 1n;
        const ZA = this.getZ();
        const ZB = this.getZ(IDB, PB);
        const x_1 = (1n << w) + (x1 & ((1n << w) - 1n));
        const tA = (BigInt(this.sk as bigint) + x_1 * BigInt(rA)) % this.n;
        const x_2 = (1n << w) + (x2 & ((1n << w) - 1n));
        const hTA = h * tA;
        const jacb_test = this.Jacb_add(this.Jacb_multiply(x_2, [BigInt(RB.x), BigInt(RB.y)], false), [
            BigInt(PB.x),
            BigInt(PB.y),
        ]);
        const U = this.Jacb_multiply(hTA, jacb_test);

        const [xU, yU] = U;

        if (!kLen) {
            kLen = KEY_LEN;
        }
        const KAArray = joinUint8Array([toByte(xU), toByte(yU), ZA, ZB]);
        const KA = KDF(KAArray, kLen);
        if (!option && !SB) {
            return {
                res: true,
                content: [KA],
            };
        }

        const tmpArr = [toByte(xU), ZA, ZB, toByte(x1), toByte(y1), toByte(x2), toByte(y2)];
        const tmpSM3 = joinUint8Array([toByte(yU), toByte(smCrypto.sm3(joinUint8Array(tmpArr)))]);

        const S1 = smCrypto.sm3(joinUint8Array([toByte(2n), tmpSM3]));
        const SA = smCrypto.sm3(joinUint8Array([toByte(3n), tmpSM3]));
        return {
            res: true,
            content: [KA, SA],
        };
    }

    // agreement_confirm2() { }
}

export { SM2 };
