export declare function toByte(x: bigint | string | null | undefined, size?: bigint): Uint8Array;
/**
 *
 * @param {Array[Uint8array]} dataList
 */
export declare function joinUint8Array(dataList: any[]): Uint8Array;
export declare function ab2hex(buffer: Uint8Array): string;
export declare function hex2ab(hex: string): Uint8Array;
/**
 *
 * @param {BigInt} n1
 * @param {BigInt} n2
 */
export declare function pyMod(n1: bigint, n2: bigint): bigint;
export declare function str2ab(str: string): Uint8Array;
