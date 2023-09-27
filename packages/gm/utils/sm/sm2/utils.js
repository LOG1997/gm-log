/* eslint-disable no-bitwise, no-mixed-operators, no-use-before-define, max-len */
const { BigInteger, SecureRandom } = require('jsbn');
const { ECCurveFp } = require('./ec');

const rng = new SecureRandom();
const { curve, G, n } = generateEcparam();

/**
 * 获取公共椭圆曲线
 */
function getGlobalCurve() {
  return curve;
}

/**
 * 生成ecparam
 */
function generateEcparam() {
  // 椭圆曲线
  const p = new BigInteger('8542D69E4C044F18E8B92435BF6FF7DE457283915C45517D722EDB8B08F1DFC3', 16);
  const a = new BigInteger('787968B4FA32C3FD2417842E73BBFEFF2F3C848B6831D7E0EC65228B3937E498', 16);
  const b = new BigInteger('63E4C6D3B23B0C849CF84241484BFE48F61D59A5B16BA06E6E12D1DA27C5249A', 16);
  const curve = new ECCurveFp(p, a, b);

  // 基点
  const gxHex = '421DEBD61B62EAB6746434EBC3CC315E32220B3BADD50BDC4C4E6C147FEDD43D';
  const gyHex = '0680512BCBB42C07D47349D2153B70C4E5D7FDFCBFA36EA1A85841B9E46E09A2';
  const G = curve.decodePointHex('04' + gxHex + gyHex);

  const n = new BigInteger('8542D69E4C044F18E8B92435BF6FF7DD297720630485628D5AE74EE7C32E79B7', 16);

  return { curve, G, n };
}

/**
 * 生成密钥对：publicKey = privateKey * G
 */
function generateKeyPairHex(a, b, c) {
  const random = a ? new BigInteger(a, b, c) : new BigInteger(n.bitLength(), rng);
  const d = random.mod(n.subtract(BigInteger.ONE)).add(BigInteger.ONE); // 随机数
  // console.log('😅d:', d);
  // const privateKey = leftPad(d.toString(16), 64);
  const privateKey = '6FCBA2EF9AE0AB902BC3BDE3FF915D44BA4CC78F88E2F8E7F8996D3B8CCEEDEE';

  const P = G.multiply(d); // P = dG，p 为公钥，d 为私钥
  // console.log('😕P:', P);
  // console.log('😆G:', G);
  const Px = leftPad(P.getX().toBigInteger().toString(16), 64);
  console.log('😆Px:', Px);
  const Py = leftPad(P.getY().toBigInteger().toString(16), 64);
  console.log('😑Py:', Py);
  const publicKey = '04' + Px + Py;

  return { privateKey, publicKey };
}

// 生成公钥私钥，以BigInt形式表示
function generateKeyPairBigInt(a, b, c) {
  const random = a ? new BigInteger(a, b, c) : new BigInteger(n.bitLength(), rng);
  let d = random.mod(n.subtract(BigInteger.ONE)).add(BigInteger.ONE); // 随机数

  const privateKey = d;

  const P = G.multiply(d); // P = dG，p 为公钥，d 为私钥
  const Px = P.getX().toBigInteger();
  const Py = P.getY().toBigInteger();
  console.log('PX,PX:', BigInt(Px), BigInt(Py));
  return {
    privateKey,
    publicKey: {
      x: Px,
      y: Py,
    },
  };
}

/**
 * 生成压缩公钥
 */
function compressPublicKeyHex(s) {
  if (s.length !== 130) throw new Error('Invalid public key to compress');

  const len = (s.length - 2) / 2;
  const xHex = s.substr(2, len);
  const y = new BigInteger(s.substr(len + 2, len), 16);

  let prefix = '03';
  if (y.mod(new BigInteger('2')).equals(BigInteger.ZERO)) prefix = '02';

  return prefix + xHex;
}

/**
 * utf8串转16进制串
 */
function utf8ToHex(input) {
  input = unescape(encodeURIComponent(input));

  const length = input.length;

  // 转换到字数组
  const words = [];
  for (let i = 0; i < length; i++) {
    words[i >>> 2] |= (input.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
  }

  // 转换到16进制
  const hexChars = [];
  for (let i = 0; i < length; i++) {
    const bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    hexChars.push((bite >>> 4).toString(16));
    hexChars.push((bite & 0x0f).toString(16));
  }

  return hexChars.join('');
}

/**
 * 补全16进制字符串
 */
function leftPad(input, num) {
  if (input.length >= num) return input;

  return new Array(num - input.length + 1).join('0') + input;
}

/**
 * 转成16进制串
 */
function arrayToHex(arr) {
  return arr
    .map((item) => {
      item = item.toString(16);
      return item.length === 1 ? '0' + item : item;
    })
    .join('');
}

/**
 * 转成utf8串
 */
function arrayToUtf8(arr) {
  const words = [];
  let j = 0;
  for (let i = 0; i < arr.length * 2; i += 2) {
    words[i >>> 3] |= parseInt(arr[j], 10) << (24 - (i % 8) * 4);
    j++;
  }

  try {
    const latin1Chars = [];

    for (let i = 0; i < arr.length; i++) {
      const bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      latin1Chars.push(String.fromCharCode(bite));
    }

    return decodeURIComponent(escape(latin1Chars.join('')));
  } catch (e) {
    throw new Error('Malformed UTF-8 data');
  }
}

/**
 * 转成字节数组
 */
function hexToArray(hexStr) {
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
 * 验证公钥是否为椭圆曲线上的点
 */
function verifyPublicKey(publicKey) {
  const point = curve.decodePointHex(publicKey);
  if (!point) return false;

  const x = point.getX();
  const y = point.getY();

  // 验证 y^2 是否等于 x^3 + ax + b
  return y.square().equals(x.multiply(x.square()).add(x.multiply(curve.a)).add(curve.b));
}

/**
 * 验证公钥是否等价，等价返回true
 */
function comparePublicKeyHex(publicKey1, publicKey2) {
  const point1 = curve.decodePointHex(publicKey1);
  if (!point1) return false;

  const point2 = curve.decodePointHex(publicKey2);
  if (!point2) return false;

  return point1.equals(point2);
}

module.exports = {
  getGlobalCurve,
  generateEcparam,
  generateKeyPairHex,
  generateKeyPairBigInt,
  compressPublicKeyHex,
  utf8ToHex,
  leftPad,
  arrayToHex,
  arrayToUtf8,
  hexToArray,
  verifyPublicKey,
  comparePublicKeyHex,
};
