declare class ECC {
    p: bigint;
    a: bigint;
    b: bigint;
    n: bigint;
    G: bigint[];
    O: [bigint, bigint];
    _2: bigint;
    a_3: bigint;
    h: bigint | undefined;
    constructor(p: bigint, a: bigint, b: bigint, n: bigint, G: bigint[], h: bigint | null);
    genKeyPaire(): {
        publicKey: {
            x: bigint;
            y: bigint;
        };
        privateKey: bigint;
    };
    Jacb_multiply(k: bigint, P: bigint[], conv?: boolean): bigint[];
    Jacb_add(P1: bigint[], P2?: bigint[] | null): bigint[];
    Jacb_to_affine(P: bigint[]): bigint[];
    minus(P: bigint[]): bigint[];
    isZero(P: bigint[]): boolean;
    onCurve(P: bigint[]): boolean;
}
declare class SM2 extends ECC {
    ID: string | undefined | null;
    pk: {
        x: bigint;
        y: bigint;
    } | undefined;
    sk: bigint | undefined;
    Z: Uint8Array | undefined;
    constructor(p?: bigint, a?: bigint, b?: bigint, n?: bigint, G?: bigint[], h?: bigint, ID?: string, sk?: bigint, pk?: {
        x: bigint;
        y: bigint;
    }, gen_keypair?: boolean);
    initKey(): void;
    /**
     *
     * @param {*} ID
     * @param {BigInt{x,y}} P 公钥
     */
    getZ(ID?: string | null, P?: {
        x: bigint;
        y: bigint;
    }): Uint8Array | undefined;
    agreement_initiate(): {
        publicKey: {
            x: bigint;
            y: bigint;
        };
        privateKey: bigint;
    };
    /**
     * @param {BigInt{x,y}} RA 临时公钥
     * @param {BigInt{x,y}} PA 公钥
     * @param {*} IDA ID
     * @param {BigInt{x,y}} [RB=null] 临时公钥
     * @param {BigInt} [rB=null] 临时私钥
     * @param {number} [kLen=null]
     */
    agreement_response(RA: {
        x: bigint;
        y: bigint;
    }, PA: {
        x: bigint;
        y: bigint;
    }, IDA?: string, option?: boolean, rB?: null | bigint, RB?: {
        x: bigint;
        y: bigint;
    } | null, kLen?: number | null): {
        res: boolean;
        content: (string | {
            x: bigint;
            y: bigint;
        })[];
    };
    agreement_confirm(rA: bigint, RA: {
        x: bigint;
        y: bigint;
    }, RB: {
        x: bigint;
        y: bigint;
    }, PB: {
        x: bigint;
        y: bigint;
    }, IDB?: string, SB?: bigint | null, option?: boolean, kLen?: number | null): {
        res: boolean;
        content: string[];
    };
}
export { SM2 };
