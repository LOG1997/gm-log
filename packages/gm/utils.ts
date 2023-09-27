export function toByte(x: bigint | string | null | undefined, size?: bigint): Uint8Array {
    if (typeof x === 'bigint') {
        if (size === undefined) {
            size = 0n;
            let tmp = x >> 64n;
            while (tmp != 0n) {
                size += 8n;
                tmp >>= 64n;
            }
            tmp = x >> (size << 3n);
            while (tmp != 0n) {
                size += 1n;
                tmp >>= 8n;
            }
        } else if (x >> (size << 3n)) {
            x &= (1n << (size << 3n)) - 1n;
        }
        const hexStr = hex2Arr(x.toString(16).padStart(Number(size * 2n), '0'));

        const buffer = new Uint8Array(hexStr);
        return buffer;
    } else if (typeof x == 'string') {
        // x = encodeURIComponent(x);
        if (size && x.length > size) {
            x = x.slice(0, Number(size));
        }
        return str2ab(x);
    }
    return new Uint8Array();
}
/**
 *
 * @param {string} hexStr
 */
function hex2Arr(hexStr: string) {
    const words = [];
    let hexStrLength = hexStr.length;

    if (hexStrLength % 2 !== 0) {
        hexStr = leftPad(hexStr, hexStrLength + 1);
    }

    hexStrLength = hexStr.length;

    for (let i = 0; i < hexStrLength; i += 2) {
        words.push(parseInt(hexStr.substr(i, 2), 16));
    }
    return words;
}
/**
 * 补全16进制字符串
 */
function leftPad(input: string, num: number) {
    if (input.length >= num) return input;

    return new Array(num - input.length + 1).join('0') + input;
}
/**
 *
 * @param {Array[Uint8array]} dataList
 */
export function joinUint8Array(dataList: any[]) {
    const len = dataList.length;
    const uint8ArrLen = getDataListLen(dataList);
    const buffer = new Uint8Array(uint8ArrLen);
    buffer.set(dataList[0]);
    for (let i = 1; i < len; i++) {
        if (!dataList[i]) {
            continue;
        }
        buffer.set(dataList[i], getDataListLen(dataList.slice(0, i)));
    }
    return buffer;
}
// 获取datalist的长度
function getDataListLen(dataList: any[]) {
    const len = dataList.length;
    let uint8ArrLen = 0;
    for (let i = 0; i < len; i++) {
        if (!dataList[i]) {
            continue;
        }
        uint8ArrLen += dataList[i].length;
    }
    return uint8ArrLen;
}
export function ab2hex(buffer: Uint8Array) {
    const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
        return ('00' + bit.toString(16)).slice(-2);
    });
    return hexArr.join('');
}
export function hex2ab(hex: string) {
    const buffer = new ArrayBuffer(hex.length / 2);
    const arr: any[] = Array.prototype.map.call(new Uint8Array(buffer), function (bit, i) {
        return parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    });

    return new Uint8Array(arr);
}
/**
 *
 * @param {BigInt} n1
 * @param {BigInt} n2
 */
export function pyMod(n1: bigint, n2: bigint) {
    let division = n1 / n2;
    if ((n1 < 0n || n2 < 0n) && division <= 0n && n1 + n2 != 0n) {
        division -= 1n;
    }
    if (n1 < 0n && n2 < 0n && n1 > n2) {
        division += 1n;
    }

    const mod = n1 - division * n2;
    return mod;
}
export function str2ab(str: string) {
    // 将字符串转换为字节数组
    const bytes = str.split('').map((c) => c.charCodeAt(0));

    return new Uint8Array(bytes);
}
