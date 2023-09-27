// utils
import { toByte, pyMod, ab2hex, joinUint8Array } from '../packages/gm/utils'
import { describe, expect, test, it } from 'vitest'

describe('ab2hex', () => {
    it('验证ab2hex函数', () => {
        const resArr: any[][] = [
            [new Uint8Array([1, 2, 3]), '010203',],
            [new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]), '0102030405060708'],
            [new Uint8Array([234, 124, 19, 182, 176]), 'ea7c13b6b0',],
        ]
        resArr.forEach((item: any) => {
            expect(ab2hex(item[0])).toBe(item[1])
        })
    })
})

describe('joinUint8Array', () => {
    it('验证joinUint8Array函数', () => {
        const resArr: any[][] = [
            [[new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])], '0102030102030405060708',],
            [[new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]), new Uint8Array([234, 124, 19, 182, 176])], '0102030405060708ea7c13b6b0'],
        ]
        resArr.forEach((item) => {
            expect(ab2hex(joinUint8Array(item[0]))).toBe(item[1])
        })
    })
})
describe('toByte', () => {
    it('验证toByte函数', () => {
        const reqArr: any[][] = [
            [[128791221n], '07ad32b5'],
            [[8912312392913912n], '1fa9b36e4e93f8'],
            [[912939128301283102938012831231231n], '2d02e96b5f33b0b568900e5cacff'],
            [['ALICE123@YAHOO.COM'], '414c494345313233405941484f4f2e434f4d'],
            [[144n, 2n], '0090'],
            [[136n, 2n], '0088']
        ]
        reqArr.forEach((item) => {
            const itemHex = ab2hex(toByte(...item[0]))
            expect(itemHex).toBe(item[1])
        })
        expect(toByte(128791221n)).toStrictEqual(new Uint8Array([7, 173, 50, 181]))
    });
});
describe('pyMod', () => {
    it('验证取模函数', () => {
        const reqArr: any[][] = [
            [[876n, 76n], 40n],
            [[-876n, 76n], 36n],
            [[876n, -76n], -36n],
            [[-876n, -76n], -40n],
            [[76n, 876n], 76n],
            [[-76n, 876n], 800n],
            [[76n, -876n], -800n],
            [[-76n, -876n], -76n],
            [[0n, 76n], 0n],
            [[76n, 76n], 0n],
            [[-76n, 76n], 0n],
            [[-74n, 76n], 2n],
            [[-79n, 76n], 73n],
            [[76n, -76n], 0n],
            [[-76n, -76n], 0n],
        ]
        reqArr.forEach((item) => {
            const res = pyMod(item[0][0], item[0][1]);
            expect(res).toBe(item[1])
        })
    })
})

