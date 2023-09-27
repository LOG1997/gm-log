var jt = function(r, i) {
  return jt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(s, f) {
    s.__proto__ = f;
  } || function(s, f) {
    for (var h in f)
      Object.prototype.hasOwnProperty.call(f, h) && (s[h] = f[h]);
  }, jt(r, i);
};
function Xi(r, i) {
  if (typeof i != "function" && i !== null)
    throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
  jt(r, i);
  function s() {
    this.constructor = r;
  }
  r.prototype = i === null ? Object.create(i) : (s.prototype = i.prototype, new s());
}
var Qi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Q = {}, Wi = {
  get exports() {
    return Q;
  },
  set exports(r) {
    Q = r;
  }
};
(function(r, i) {
  (function() {
    var s, f = 244837814094590, h = (f & 16777215) == 15715070;
    function o(t, e, n) {
      t != null && (typeof t == "number" ? this.fromNumber(t, e, n) : e == null && typeof t != "string" ? this.fromString(t, 256) : this.fromString(t, e));
    }
    function a() {
      return new o(null);
    }
    function y(t, e, n, u, c, p) {
      for (; --p >= 0; ) {
        var v = e * this[t++] + n[u] + c;
        c = Math.floor(v / 67108864), n[u++] = v & 67108863;
      }
      return c;
    }
    function l(t, e, n, u, c, p) {
      for (var v = e & 32767, b = e >> 15; --p >= 0; ) {
        var M = this[t] & 32767, R = this[t++] >> 15, k = b * M + R * v;
        M = v * M + ((k & 32767) << 15) + n[u] + (c & 1073741823), c = (M >>> 30) + (k >>> 15) + b * R + (c >>> 30), n[u++] = M & 1073741823;
      }
      return c;
    }
    function w(t, e, n, u, c, p) {
      for (var v = e & 16383, b = e >> 14; --p >= 0; ) {
        var M = this[t] & 16383, R = this[t++] >> 14, k = b * M + R * v;
        M = v * M + ((k & 16383) << 14) + n[u] + c, c = (M >> 28) + (k >> 14) + b * R, n[u++] = M & 268435455;
      }
      return c;
    }
    var g = typeof navigator < "u";
    g && h && navigator.appName == "Microsoft Internet Explorer" ? (o.prototype.am = l, s = 30) : g && h && navigator.appName != "Netscape" ? (o.prototype.am = y, s = 26) : (o.prototype.am = w, s = 28), o.prototype.DB = s, o.prototype.DM = (1 << s) - 1, o.prototype.DV = 1 << s;
    var x = 52;
    o.prototype.FV = Math.pow(2, x), o.prototype.F1 = x - s, o.prototype.F2 = 2 * s - x;
    var m = "0123456789abcdefghijklmnopqrstuvwxyz", T = new Array(), d, F;
    for (d = "0".charCodeAt(0), F = 0; F <= 9; ++F)
      T[d++] = F;
    for (d = "a".charCodeAt(0), F = 10; F < 36; ++F)
      T[d++] = F;
    for (d = "A".charCodeAt(0), F = 10; F < 36; ++F)
      T[d++] = F;
    function D(t) {
      return m.charAt(t);
    }
    function E(t, e) {
      var n = T[t.charCodeAt(e)];
      return n ?? -1;
    }
    function q(t) {
      for (var e = this.t - 1; e >= 0; --e)
        t[e] = this[e];
      t.t = this.t, t.s = this.s;
    }
    function _(t) {
      this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0;
    }
    function O(t) {
      var e = a();
      return e.fromInt(t), e;
    }
    function V(t, e) {
      var n;
      if (e == 16)
        n = 4;
      else if (e == 8)
        n = 3;
      else if (e == 256)
        n = 8;
      else if (e == 2)
        n = 1;
      else if (e == 32)
        n = 5;
      else if (e == 4)
        n = 2;
      else {
        this.fromRadix(t, e);
        return;
      }
      this.t = 0, this.s = 0;
      for (var u = t.length, c = !1, p = 0; --u >= 0; ) {
        var v = n == 8 ? t[u] & 255 : E(t, u);
        if (v < 0) {
          t.charAt(u) == "-" && (c = !0);
          continue;
        }
        c = !1, p == 0 ? this[this.t++] = v : p + n > this.DB ? (this[this.t - 1] |= (v & (1 << this.DB - p) - 1) << p, this[this.t++] = v >> this.DB - p) : this[this.t - 1] |= v << p, p += n, p >= this.DB && (p -= this.DB);
      }
      n == 8 && t[0] & 128 && (this.s = -1, p > 0 && (this[this.t - 1] |= (1 << this.DB - p) - 1 << p)), this.clamp(), c && o.ZERO.subTo(this, this);
    }
    function Z() {
      for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; )
        --this.t;
    }
    function H(t) {
      if (this.s < 0)
        return "-" + this.negate().toString(t);
      var e;
      if (t == 16)
        e = 4;
      else if (t == 8)
        e = 3;
      else if (t == 2)
        e = 1;
      else if (t == 32)
        e = 5;
      else if (t == 4)
        e = 2;
      else
        return this.toRadix(t);
      var n = (1 << e) - 1, u, c = !1, p = "", v = this.t, b = this.DB - v * this.DB % e;
      if (v-- > 0)
        for (b < this.DB && (u = this[v] >> b) > 0 && (c = !0, p = D(u)); v >= 0; )
          b < e ? (u = (this[v] & (1 << b) - 1) << e - b, u |= this[--v] >> (b += this.DB - e)) : (u = this[v] >> (b -= e) & n, b <= 0 && (b += this.DB, --v)), u > 0 && (c = !0), c && (p += D(u));
      return c ? p : "0";
    }
    function K() {
      var t = a();
      return o.ZERO.subTo(this, t), t;
    }
    function tt() {
      return this.s < 0 ? this.negate() : this;
    }
    function it(t) {
      var e = this.s - t.s;
      if (e != 0)
        return e;
      var n = this.t;
      if (e = n - t.t, e != 0)
        return this.s < 0 ? -e : e;
      for (; --n >= 0; )
        if ((e = this[n] - t[n]) != 0)
          return e;
      return 0;
    }
    function S(t) {
      var e = 1, n;
      return (n = t >>> 16) != 0 && (t = n, e += 16), (n = t >> 8) != 0 && (t = n, e += 8), (n = t >> 4) != 0 && (t = n, e += 4), (n = t >> 2) != 0 && (t = n, e += 2), (n = t >> 1) != 0 && (t = n, e += 1), e;
    }
    function bt() {
      return this.t <= 0 ? 0 : this.DB * (this.t - 1) + S(this[this.t - 1] ^ this.s & this.DM);
    }
    function ut(t, e) {
      var n;
      for (n = this.t - 1; n >= 0; --n)
        e[n + t] = this[n];
      for (n = t - 1; n >= 0; --n)
        e[n] = 0;
      e.t = this.t + t, e.s = this.s;
    }
    function wt(t, e) {
      for (var n = t; n < this.t; ++n)
        e[n - t] = this[n];
      e.t = Math.max(this.t - t, 0), e.s = this.s;
    }
    function Ct(t, e) {
      var n = t % this.DB, u = this.DB - n, c = (1 << u) - 1, p = Math.floor(t / this.DB), v = this.s << n & this.DM, b;
      for (b = this.t - 1; b >= 0; --b)
        e[b + p + 1] = this[b] >> u | v, v = (this[b] & c) << n;
      for (b = p - 1; b >= 0; --b)
        e[b] = 0;
      e[p] = v, e.t = this.t + p + 1, e.s = this.s, e.clamp();
    }
    function we(t, e) {
      e.s = this.s;
      var n = Math.floor(t / this.DB);
      if (n >= this.t) {
        e.t = 0;
        return;
      }
      var u = t % this.DB, c = this.DB - u, p = (1 << u) - 1;
      e[0] = this[n] >> u;
      for (var v = n + 1; v < this.t; ++v)
        e[v - n - 1] |= (this[v] & p) << c, e[v - n] = this[v] >> u;
      u > 0 && (e[this.t - n - 1] |= (this.s & p) << c), e.t = this.t - n, e.clamp();
    }
    function Te(t, e) {
      for (var n = 0, u = 0, c = Math.min(t.t, this.t); n < c; )
        u += this[n] - t[n], e[n++] = u & this.DM, u >>= this.DB;
      if (t.t < this.t) {
        for (u -= t.s; n < this.t; )
          u += this[n], e[n++] = u & this.DM, u >>= this.DB;
        u += this.s;
      } else {
        for (u += this.s; n < t.t; )
          u -= t[n], e[n++] = u & this.DM, u >>= this.DB;
        u -= t.s;
      }
      e.s = u < 0 ? -1 : 0, u < -1 ? e[n++] = this.DV + u : u > 0 && (e[n++] = u), e.t = n, e.clamp();
    }
    function Fe(t, e) {
      var n = this.abs(), u = t.abs(), c = n.t;
      for (e.t = c + u.t; --c >= 0; )
        e[c] = 0;
      for (c = 0; c < u.t; ++c)
        e[c + n.t] = n.am(0, u[c], e, c, 0, n.t);
      e.s = 0, e.clamp(), this.s != t.s && o.ZERO.subTo(e, e);
    }
    function Be(t) {
      for (var e = this.abs(), n = t.t = 2 * e.t; --n >= 0; )
        t[n] = 0;
      for (n = 0; n < e.t - 1; ++n) {
        var u = e.am(n, e[n], t, 2 * n, 0, 1);
        (t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, u, e.t - n - 1)) >= e.DV && (t[n + e.t] -= e.DV, t[n + e.t + 1] = 1);
      }
      t.t > 0 && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)), t.s = 0, t.clamp();
    }
    function Se(t, e, n) {
      var u = t.abs();
      if (!(u.t <= 0)) {
        var c = this.abs();
        if (c.t < u.t) {
          e != null && e.fromInt(0), n != null && this.copyTo(n);
          return;
        }
        n == null && (n = a());
        var p = a(), v = this.s, b = t.s, M = this.DB - S(u[u.t - 1]);
        M > 0 ? (u.lShiftTo(M, p), c.lShiftTo(M, n)) : (u.copyTo(p), c.copyTo(n));
        var R = p.t, k = p[R - 1];
        if (k != 0) {
          var L = k * (1 << this.F1) + (R > 1 ? p[R - 2] >> this.F2 : 0), et = this.FV / L, It = (1 << this.F1) / L, G = 1 << this.F2, J = n.t, At = J - R, rt = e ?? a();
          for (p.dlShiftTo(At, rt), n.compareTo(rt) >= 0 && (n[n.t++] = 1, n.subTo(rt, n)), o.ONE.dlShiftTo(R, rt), rt.subTo(p, p); p.t < R; )
            p[p.t++] = 0;
          for (; --At >= 0; ) {
            var Nt = n[--J] == k ? this.DM : Math.floor(n[J] * et + (n[J - 1] + G) * It);
            if ((n[J] += p.am(0, Nt, n, At, 0, R)) < Nt)
              for (p.dlShiftTo(At, rt), n.subTo(rt, n); n[J] < --Nt; )
                n.subTo(rt, n);
          }
          e != null && (n.drShiftTo(R, e), v != b && o.ZERO.subTo(e, e)), n.t = R, n.clamp(), M > 0 && n.rShiftTo(M, n), v < 0 && o.ZERO.subTo(n, n);
        }
      }
    }
    function Ie(t) {
      var e = a();
      return this.abs().divRemTo(t, null, e), this.s < 0 && e.compareTo(o.ZERO) > 0 && t.subTo(e, e), e;
    }
    function at(t) {
      this.m = t;
    }
    function Ae(t) {
      return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
    }
    function De(t) {
      return t;
    }
    function Ee(t) {
      t.divRemTo(this.m, null, t);
    }
    function qe(t, e, n) {
      t.multiplyTo(e, n), this.reduce(n);
    }
    function Me(t, e) {
      t.squareTo(e), this.reduce(e);
    }
    at.prototype.convert = Ae, at.prototype.revert = De, at.prototype.reduce = Ee, at.prototype.mulTo = qe, at.prototype.sqrTo = Me;
    function Oe() {
      if (this.t < 1)
        return 0;
      var t = this[0];
      if (!(t & 1))
        return 0;
      var e = t & 3;
      return e = e * (2 - (t & 15) * e) & 15, e = e * (2 - (t & 255) * e) & 255, e = e * (2 - ((t & 65535) * e & 65535)) & 65535, e = e * (2 - t * e % this.DV) % this.DV, e > 0 ? this.DV - e : -e;
    }
    function ct(t) {
      this.m = t, this.mp = t.invDigit(), this.mpl = this.mp & 32767, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t;
    }
    function Ce(t) {
      var e = a();
      return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(o.ZERO) > 0 && this.m.subTo(e, e), e;
    }
    function Re(t) {
      var e = a();
      return t.copyTo(e), this.reduce(e), e;
    }
    function _e(t) {
      for (; t.t <= this.mt2; )
        t[t.t++] = 0;
      for (var e = 0; e < this.m.t; ++e) {
        var n = t[e] & 32767, u = n * this.mpl + ((n * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
        for (n = e + this.m.t, t[n] += this.m.am(0, u, t, e, 0, this.m.t); t[n] >= t.DV; )
          t[n] -= t.DV, t[++n]++;
      }
      t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
    }
    function He(t, e) {
      t.squareTo(e), this.reduce(e);
    }
    function Ne(t, e, n) {
      t.multiplyTo(e, n), this.reduce(n);
    }
    ct.prototype.convert = Ce, ct.prototype.revert = Re, ct.prototype.reduce = _e, ct.prototype.mulTo = Ne, ct.prototype.sqrTo = He;
    function Pe() {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    }
    function Ve(t, e) {
      if (t > 4294967295 || t < 1)
        return o.ONE;
      var n = a(), u = a(), c = e.convert(this), p = S(t) - 1;
      for (c.copyTo(n); --p >= 0; )
        if (e.sqrTo(n, u), (t & 1 << p) > 0)
          e.mulTo(u, c, n);
        else {
          var v = n;
          n = u, u = v;
        }
      return e.revert(n);
    }
    function Ze(t, e) {
      var n;
      return t < 256 || e.isEven() ? n = new at(e) : n = new ct(e), this.exp(t, n);
    }
    o.prototype.copyTo = q, o.prototype.fromInt = _, o.prototype.fromString = V, o.prototype.clamp = Z, o.prototype.dlShiftTo = ut, o.prototype.drShiftTo = wt, o.prototype.lShiftTo = Ct, o.prototype.rShiftTo = we, o.prototype.subTo = Te, o.prototype.multiplyTo = Fe, o.prototype.squareTo = Be, o.prototype.divRemTo = Se, o.prototype.invDigit = Oe, o.prototype.isEven = Pe, o.prototype.exp = Ve, o.prototype.toString = H, o.prototype.negate = K, o.prototype.abs = tt, o.prototype.compareTo = it, o.prototype.bitLength = bt, o.prototype.mod = Ie, o.prototype.modPowInt = Ze, o.ZERO = O(0), o.ONE = O(1);
    function je() {
      var t = a();
      return this.copyTo(t), t;
    }
    function Le() {
      if (this.s < 0) {
        if (this.t == 1)
          return this[0] - this.DV;
        if (this.t == 0)
          return -1;
      } else {
        if (this.t == 1)
          return this[0];
        if (this.t == 0)
          return 0;
      }
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    }
    function Ue() {
      return this.t == 0 ? this.s : this[0] << 24 >> 24;
    }
    function Ke() {
      return this.t == 0 ? this.s : this[0] << 16 >> 16;
    }
    function ke(t) {
      return Math.floor(Math.LN2 * this.DB / Math.log(t));
    }
    function $e() {
      return this.s < 0 ? -1 : this.t <= 0 || this.t == 1 && this[0] <= 0 ? 0 : 1;
    }
    function ze(t) {
      if (t == null && (t = 10), this.signum() == 0 || t < 2 || t > 36)
        return "0";
      var e = this.chunkSize(t), n = Math.pow(t, e), u = O(n), c = a(), p = a(), v = "";
      for (this.divRemTo(u, c, p); c.signum() > 0; )
        v = (n + p.intValue()).toString(t).substr(1) + v, c.divRemTo(u, c, p);
      return p.intValue().toString(t) + v;
    }
    function Ge(t, e) {
      this.fromInt(0), e == null && (e = 10);
      for (var n = this.chunkSize(e), u = Math.pow(e, n), c = !1, p = 0, v = 0, b = 0; b < t.length; ++b) {
        var M = E(t, b);
        if (M < 0) {
          t.charAt(b) == "-" && this.signum() == 0 && (c = !0);
          continue;
        }
        v = e * v + M, ++p >= n && (this.dMultiply(u), this.dAddOffset(v, 0), p = 0, v = 0);
      }
      p > 0 && (this.dMultiply(Math.pow(e, p)), this.dAddOffset(v, 0)), c && o.ZERO.subTo(this, this);
    }
    function Je(t, e, n) {
      if (typeof e == "number")
        if (t < 2)
          this.fromInt(1);
        else
          for (this.fromNumber(t, n), this.testBit(t - 1) || this.bitwiseTo(o.ONE.shiftLeft(t - 1), Rt, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e); )
            this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(o.ONE.shiftLeft(t - 1), this);
      else {
        var u = new Array(), c = t & 7;
        u.length = (t >> 3) + 1, e.nextBytes(u), c > 0 ? u[0] &= (1 << c) - 1 : u[0] = 0, this.fromString(u, 256);
      }
    }
    function Ye() {
      var t = this.t, e = new Array();
      e[0] = this.s;
      var n = this.DB - t * this.DB % 8, u, c = 0;
      if (t-- > 0)
        for (n < this.DB && (u = this[t] >> n) != (this.s & this.DM) >> n && (e[c++] = u | this.s << this.DB - n); t >= 0; )
          n < 8 ? (u = (this[t] & (1 << n) - 1) << 8 - n, u |= this[--t] >> (n += this.DB - 8)) : (u = this[t] >> (n -= 8) & 255, n <= 0 && (n += this.DB, --t)), u & 128 && (u |= -256), c == 0 && (this.s & 128) != (u & 128) && ++c, (c > 0 || u != this.s) && (e[c++] = u);
      return e;
    }
    function Xe(t) {
      return this.compareTo(t) == 0;
    }
    function Qe(t) {
      return this.compareTo(t) < 0 ? this : t;
    }
    function We(t) {
      return this.compareTo(t) > 0 ? this : t;
    }
    function ti(t, e, n) {
      var u, c, p = Math.min(t.t, this.t);
      for (u = 0; u < p; ++u)
        n[u] = e(this[u], t[u]);
      if (t.t < this.t) {
        for (c = t.s & this.DM, u = p; u < this.t; ++u)
          n[u] = e(this[u], c);
        n.t = this.t;
      } else {
        for (c = this.s & this.DM, u = p; u < t.t; ++u)
          n[u] = e(c, t[u]);
        n.t = t.t;
      }
      n.s = e(this.s, t.s), n.clamp();
    }
    function ei(t, e) {
      return t & e;
    }
    function ii(t) {
      var e = a();
      return this.bitwiseTo(t, ei, e), e;
    }
    function Rt(t, e) {
      return t | e;
    }
    function ri(t) {
      var e = a();
      return this.bitwiseTo(t, Rt, e), e;
    }
    function Lt(t, e) {
      return t ^ e;
    }
    function ni(t) {
      var e = a();
      return this.bitwiseTo(t, Lt, e), e;
    }
    function Ut(t, e) {
      return t & ~e;
    }
    function si(t) {
      var e = a();
      return this.bitwiseTo(t, Ut, e), e;
    }
    function oi() {
      for (var t = a(), e = 0; e < this.t; ++e)
        t[e] = this.DM & ~this[e];
      return t.t = this.t, t.s = ~this.s, t;
    }
    function fi(t) {
      var e = a();
      return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e;
    }
    function hi(t) {
      var e = a();
      return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e;
    }
    function ui(t) {
      if (t == 0)
        return -1;
      var e = 0;
      return t & 65535 || (t >>= 16, e += 16), t & 255 || (t >>= 8, e += 8), t & 15 || (t >>= 4, e += 4), t & 3 || (t >>= 2, e += 2), t & 1 || ++e, e;
    }
    function ai() {
      for (var t = 0; t < this.t; ++t)
        if (this[t] != 0)
          return t * this.DB + ui(this[t]);
      return this.s < 0 ? this.t * this.DB : -1;
    }
    function ci(t) {
      for (var e = 0; t != 0; )
        t &= t - 1, ++e;
      return e;
    }
    function li() {
      for (var t = 0, e = this.s & this.DM, n = 0; n < this.t; ++n)
        t += ci(this[n] ^ e);
      return t;
    }
    function pi(t) {
      var e = Math.floor(t / this.DB);
      return e >= this.t ? this.s != 0 : (this[e] & 1 << t % this.DB) != 0;
    }
    function xi(t, e) {
      var n = o.ONE.shiftLeft(t);
      return this.bitwiseTo(n, e, n), n;
    }
    function di(t) {
      return this.changeBit(t, Rt);
    }
    function vi(t) {
      return this.changeBit(t, Ut);
    }
    function gi(t) {
      return this.changeBit(t, Lt);
    }
    function yi(t, e) {
      for (var n = 0, u = 0, c = Math.min(t.t, this.t); n < c; )
        u += this[n] + t[n], e[n++] = u & this.DM, u >>= this.DB;
      if (t.t < this.t) {
        for (u += t.s; n < this.t; )
          u += this[n], e[n++] = u & this.DM, u >>= this.DB;
        u += this.s;
      } else {
        for (u += this.s; n < t.t; )
          u += t[n], e[n++] = u & this.DM, u >>= this.DB;
        u += t.s;
      }
      e.s = u < 0 ? -1 : 0, u > 0 ? e[n++] = u : u < -1 && (e[n++] = this.DV + u), e.t = n, e.clamp();
    }
    function mi(t) {
      var e = a();
      return this.addTo(t, e), e;
    }
    function bi(t) {
      var e = a();
      return this.subTo(t, e), e;
    }
    function wi(t) {
      var e = a();
      return this.multiplyTo(t, e), e;
    }
    function Ti() {
      var t = a();
      return this.squareTo(t), t;
    }
    function Fi(t) {
      var e = a();
      return this.divRemTo(t, e, null), e;
    }
    function Bi(t) {
      var e = a();
      return this.divRemTo(t, null, e), e;
    }
    function Si(t) {
      var e = a(), n = a();
      return this.divRemTo(t, e, n), new Array(e, n);
    }
    function Ii(t) {
      this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp();
    }
    function Ai(t, e) {
      if (t != 0) {
        for (; this.t <= e; )
          this[this.t++] = 0;
        for (this[e] += t; this[e] >= this.DV; )
          this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e];
      }
    }
    function Tt() {
    }
    function Kt(t) {
      return t;
    }
    function Di(t, e, n) {
      t.multiplyTo(e, n);
    }
    function Ei(t, e) {
      t.squareTo(e);
    }
    Tt.prototype.convert = Kt, Tt.prototype.revert = Kt, Tt.prototype.mulTo = Di, Tt.prototype.sqrTo = Ei;
    function qi(t) {
      return this.exp(t, new Tt());
    }
    function Mi(t, e, n) {
      var u = Math.min(this.t + t.t, e);
      for (n.s = 0, n.t = u; u > 0; )
        n[--u] = 0;
      var c;
      for (c = n.t - this.t; u < c; ++u)
        n[u + this.t] = this.am(0, t[u], n, u, 0, this.t);
      for (c = Math.min(t.t, e); u < c; ++u)
        this.am(0, t[u], n, u, 0, e - u);
      n.clamp();
    }
    function Oi(t, e, n) {
      --e;
      var u = n.t = this.t + t.t - e;
      for (n.s = 0; --u >= 0; )
        n[u] = 0;
      for (u = Math.max(e - this.t, 0); u < t.t; ++u)
        n[this.t + u - e] = this.am(e - u, t[u], n, 0, 0, this.t + u - e);
      n.clamp(), n.drShiftTo(1, n);
    }
    function lt(t) {
      this.r2 = a(), this.q3 = a(), o.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t), this.m = t;
    }
    function Ci(t) {
      if (t.s < 0 || t.t > 2 * this.m.t)
        return t.mod(this.m);
      if (t.compareTo(this.m) < 0)
        return t;
      var e = a();
      return t.copyTo(e), this.reduce(e), e;
    }
    function Ri(t) {
      return t;
    }
    function _i(t) {
      for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; )
        t.dAddOffset(1, this.m.t + 1);
      for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; )
        t.subTo(this.m, t);
    }
    function Hi(t, e) {
      t.squareTo(e), this.reduce(e);
    }
    function Ni(t, e, n) {
      t.multiplyTo(e, n), this.reduce(n);
    }
    lt.prototype.convert = Ci, lt.prototype.revert = Ri, lt.prototype.reduce = _i, lt.prototype.mulTo = Ni, lt.prototype.sqrTo = Hi;
    function Pi(t, e) {
      var n = t.bitLength(), u, c = O(1), p;
      if (n <= 0)
        return c;
      n < 18 ? u = 1 : n < 48 ? u = 3 : n < 144 ? u = 4 : n < 768 ? u = 5 : u = 6, n < 8 ? p = new at(e) : e.isEven() ? p = new lt(e) : p = new ct(e);
      var v = new Array(), b = 3, M = u - 1, R = (1 << u) - 1;
      if (v[1] = p.convert(this), u > 1) {
        var k = a();
        for (p.sqrTo(v[1], k); b <= R; )
          v[b] = a(), p.mulTo(k, v[b - 2], v[b]), b += 2;
      }
      var L = t.t - 1, et, It = !0, G = a(), J;
      for (n = S(t[L]) - 1; L >= 0; ) {
        for (n >= M ? et = t[L] >> n - M & R : (et = (t[L] & (1 << n + 1) - 1) << M - n, L > 0 && (et |= t[L - 1] >> this.DB + n - M)), b = u; !(et & 1); )
          et >>= 1, --b;
        if ((n -= b) < 0 && (n += this.DB, --L), It)
          v[et].copyTo(c), It = !1;
        else {
          for (; b > 1; )
            p.sqrTo(c, G), p.sqrTo(G, c), b -= 2;
          b > 0 ? p.sqrTo(c, G) : (J = c, c = G, G = J), p.mulTo(G, v[et], c);
        }
        for (; L >= 0 && !(t[L] & 1 << n); )
          p.sqrTo(c, G), J = c, c = G, G = J, --n < 0 && (n = this.DB - 1, --L);
      }
      return p.revert(c);
    }
    function Vi(t) {
      var e = this.s < 0 ? this.negate() : this.clone(), n = t.s < 0 ? t.negate() : t.clone();
      if (e.compareTo(n) < 0) {
        var u = e;
        e = n, n = u;
      }
      var c = e.getLowestSetBit(), p = n.getLowestSetBit();
      if (p < 0)
        return e;
      for (c < p && (p = c), p > 0 && (e.rShiftTo(p, e), n.rShiftTo(p, n)); e.signum() > 0; )
        (c = e.getLowestSetBit()) > 0 && e.rShiftTo(c, e), (c = n.getLowestSetBit()) > 0 && n.rShiftTo(c, n), e.compareTo(n) >= 0 ? (e.subTo(n, e), e.rShiftTo(1, e)) : (n.subTo(e, n), n.rShiftTo(1, n));
      return p > 0 && n.lShiftTo(p, n), n;
    }
    function Zi(t) {
      if (t <= 0)
        return 0;
      var e = this.DV % t, n = this.s < 0 ? t - 1 : 0;
      if (this.t > 0)
        if (e == 0)
          n = this[0] % t;
        else
          for (var u = this.t - 1; u >= 0; --u)
            n = (e * n + this[u]) % t;
      return n;
    }
    function ji(t) {
      var e = t.isEven();
      if (this.isEven() && e || t.signum() == 0)
        return o.ZERO;
      for (var n = t.clone(), u = this.clone(), c = O(1), p = O(0), v = O(0), b = O(1); n.signum() != 0; ) {
        for (; n.isEven(); )
          n.rShiftTo(1, n), e ? ((!c.isEven() || !p.isEven()) && (c.addTo(this, c), p.subTo(t, p)), c.rShiftTo(1, c)) : p.isEven() || p.subTo(t, p), p.rShiftTo(1, p);
        for (; u.isEven(); )
          u.rShiftTo(1, u), e ? ((!v.isEven() || !b.isEven()) && (v.addTo(this, v), b.subTo(t, b)), v.rShiftTo(1, v)) : b.isEven() || b.subTo(t, b), b.rShiftTo(1, b);
        n.compareTo(u) >= 0 ? (n.subTo(u, n), e && c.subTo(v, c), p.subTo(b, p)) : (u.subTo(n, u), e && v.subTo(c, v), b.subTo(p, b));
      }
      if (u.compareTo(o.ONE) != 0)
        return o.ZERO;
      if (b.compareTo(t) >= 0)
        return b.subtract(t);
      if (b.signum() < 0)
        b.addTo(t, b);
      else
        return b;
      return b.signum() < 0 ? b.add(t) : b;
    }
    var N = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], Li = (1 << 26) / N[N.length - 1];
    function Ui(t) {
      var e, n = this.abs();
      if (n.t == 1 && n[0] <= N[N.length - 1]) {
        for (e = 0; e < N.length; ++e)
          if (n[0] == N[e])
            return !0;
        return !1;
      }
      if (n.isEven())
        return !1;
      for (e = 1; e < N.length; ) {
        for (var u = N[e], c = e + 1; c < N.length && u < Li; )
          u *= N[c++];
        for (u = n.modInt(u); e < c; )
          if (u % N[e++] == 0)
            return !1;
      }
      return n.millerRabin(t);
    }
    function Ki(t) {
      var e = this.subtract(o.ONE), n = e.getLowestSetBit();
      if (n <= 0)
        return !1;
      var u = e.shiftRight(n);
      t = t + 1 >> 1, t > N.length && (t = N.length);
      for (var c = a(), p = 0; p < t; ++p) {
        c.fromInt(N[Math.floor(Math.random() * N.length)]);
        var v = c.modPow(u, this);
        if (v.compareTo(o.ONE) != 0 && v.compareTo(e) != 0) {
          for (var b = 1; b++ < n && v.compareTo(e) != 0; )
            if (v = v.modPowInt(2, this), v.compareTo(o.ONE) == 0)
              return !1;
          if (v.compareTo(e) != 0)
            return !1;
        }
      }
      return !0;
    }
    o.prototype.chunkSize = ke, o.prototype.toRadix = ze, o.prototype.fromRadix = Ge, o.prototype.fromNumber = Je, o.prototype.bitwiseTo = ti, o.prototype.changeBit = xi, o.prototype.addTo = yi, o.prototype.dMultiply = Ii, o.prototype.dAddOffset = Ai, o.prototype.multiplyLowerTo = Mi, o.prototype.multiplyUpperTo = Oi, o.prototype.modInt = Zi, o.prototype.millerRabin = Ki, o.prototype.clone = je, o.prototype.intValue = Le, o.prototype.byteValue = Ue, o.prototype.shortValue = Ke, o.prototype.signum = $e, o.prototype.toByteArray = Ye, o.prototype.equals = Xe, o.prototype.min = Qe, o.prototype.max = We, o.prototype.and = ii, o.prototype.or = ri, o.prototype.xor = ni, o.prototype.andNot = si, o.prototype.not = oi, o.prototype.shiftLeft = fi, o.prototype.shiftRight = hi, o.prototype.getLowestSetBit = ai, o.prototype.bitCount = li, o.prototype.testBit = pi, o.prototype.setBit = di, o.prototype.clearBit = vi, o.prototype.flipBit = gi, o.prototype.add = mi, o.prototype.subtract = bi, o.prototype.multiply = wi, o.prototype.divide = Fi, o.prototype.remainder = Bi, o.prototype.divideAndRemainder = Si, o.prototype.modPow = Pi, o.prototype.modInverse = ji, o.prototype.pow = qi, o.prototype.gcd = Vi, o.prototype.isProbablePrime = Ui, o.prototype.square = Ti, o.prototype.Barrett = lt;
    var St, j, C;
    function ki(t) {
      j[C++] ^= t & 255, j[C++] ^= t >> 8 & 255, j[C++] ^= t >> 16 & 255, j[C++] ^= t >> 24 & 255, C >= Ht && (C -= Ht);
    }
    function kt() {
      ki(new Date().getTime());
    }
    if (j == null) {
      j = new Array(), C = 0;
      var z;
      if (typeof window < "u" && window.crypto) {
        if (window.crypto.getRandomValues) {
          var $t = new Uint8Array(32);
          for (window.crypto.getRandomValues($t), z = 0; z < 32; ++z)
            j[C++] = $t[z];
        } else if (navigator.appName == "Netscape" && navigator.appVersion < "5") {
          var zt = window.crypto.random(32);
          for (z = 0; z < zt.length; ++z)
            j[C++] = zt.charCodeAt(z) & 255;
        }
      }
      for (; C < Ht; )
        z = Math.floor(65536 * Math.random()), j[C++] = z >>> 8, j[C++] = z & 255;
      C = 0, kt();
    }
    function $i() {
      if (St == null) {
        for (kt(), St = Yi(), St.init(j), C = 0; C < j.length; ++C)
          j[C] = 0;
        C = 0;
      }
      return St.next();
    }
    function zi(t) {
      var e;
      for (e = 0; e < t.length; ++e)
        t[e] = $i();
    }
    function Gt() {
    }
    Gt.prototype.nextBytes = zi;
    function _t() {
      this.i = 0, this.j = 0, this.S = new Array();
    }
    function Gi(t) {
      var e, n, u;
      for (e = 0; e < 256; ++e)
        this.S[e] = e;
      for (n = 0, e = 0; e < 256; ++e)
        n = n + this.S[e] + t[e % t.length] & 255, u = this.S[e], this.S[e] = this.S[n], this.S[n] = u;
      this.i = 0, this.j = 0;
    }
    function Ji() {
      var t;
      return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255];
    }
    _t.prototype.init = Gi, _t.prototype.next = Ji;
    function Yi() {
      return new _t();
    }
    var Ht = 256;
    r.exports = {
      default: o,
      BigInteger: o,
      SecureRandom: Gt
    };
  }).call(Qi);
})(Wi);
const { BigInteger: yt } = Q;
function tr(r) {
  let i = r.toString(16);
  if (i[0] !== "-")
    i.length % 2 === 1 ? i = "0" + i : i.match(/^[0-7]/) || (i = "00" + i);
  else {
    i = i.substr(1);
    let s = i.length;
    s % 2 === 1 ? s += 1 : i.match(/^[0-7]/) || (s += 2);
    let f = "";
    for (let h = 0; h < s; h++)
      f += "f";
    f = new yt(f, 16), i = f.xor(r).add(yt.ONE), i = i.toString(16).replace(/^-/, "");
  }
  return i;
}
class he {
  constructor() {
    this.tlv = null, this.t = "00", this.l = "00", this.v = "";
  }
  /**
   * 获取 der 编码比特流16进制串
   */
  getEncodedHex() {
    return this.tlv || (this.v = this.getValue(), this.l = this.getLength(), this.tlv = this.t + this.l + this.v), this.tlv;
  }
  getLength() {
    const i = this.v.length / 2;
    let s = i.toString(16);
    return s.length % 2 === 1 && (s = "0" + s), i < 128 ? s : (128 + s.length / 2).toString(16) + s;
  }
  getValue() {
    return "";
  }
}
class Jt extends he {
  constructor(i) {
    super(), this.t = "02", i && (this.v = tr(i));
  }
  getValue() {
    return this.v;
  }
}
class er extends he {
  constructor(i) {
    super(), this.t = "30", this.asn1Array = i;
  }
  getValue() {
    return this.v = this.asn1Array.map((i) => i.getEncodedHex()).join(""), this.v;
  }
}
function ue(r, i) {
  return +r[i + 2] < 8 ? 1 : +r.substr(i + 2, 2) & 127 + 1;
}
function Yt(r, i) {
  const s = ue(r, i), f = r.substr(i + 2, s * 2);
  return f ? (+f[0] < 8 ? new yt(f, 16) : new yt(f.substr(2), 16)).intValue() : -1;
}
function Pt(r, i) {
  const s = ue(r, i);
  return i + (s + 1) * 2;
}
var ir = {
  /**
   * ASN.1 der 编码，针对 sm2 签名
   */
  encodeDer(r, i) {
    const s = new Jt(r), f = new Jt(i);
    return new er([s, f]).getEncodedHex();
  },
  /**
   * 解析 ASN.1 der，针对 sm2 验签
   */
  decodeDer(r) {
    const i = Pt(r, 0), s = Pt(r, i), f = Yt(r, i), h = r.substr(s, f * 2), o = s + h.length, a = Pt(r, o), y = Yt(r, o), l = r.substr(a, y * 2), w = new yt(h, 16), g = new yt(l, 16);
    return { r: w, s: g };
  }
};
const { BigInteger: P } = Q, Xt = new P("2"), Qt = new P("3");
class ot {
  constructor(i, s) {
    this.x = s, this.q = i;
  }
  /**
   * 判断相等
   */
  equals(i) {
    return i === this ? !0 : this.q.equals(i.q) && this.x.equals(i.x);
  }
  /**
   * 返回具体数值
   */
  toBigInteger() {
    return this.x;
  }
  /**
   * 取反
   */
  negate() {
    return new ot(this.q, this.x.negate().mod(this.q));
  }
  /**
   * 相加
   */
  add(i) {
    return new ot(this.q, this.x.add(i.toBigInteger()).mod(this.q));
  }
  /**
   * 相减
   */
  subtract(i) {
    return new ot(this.q, this.x.subtract(i.toBigInteger()).mod(this.q));
  }
  /**
   * 相乘
   */
  multiply(i) {
    return new ot(this.q, this.x.multiply(i.toBigInteger()).mod(this.q));
  }
  /**
   * 相除
   */
  divide(i) {
    return new ot(this.q, this.x.multiply(i.toBigInteger().modInverse(this.q)).mod(this.q));
  }
  /**
   * 平方
   */
  square() {
    return new ot(this.q, this.x.square().mod(this.q));
  }
}
class ht {
  constructor(i, s, f, h) {
    this.curve = i, this.x = s, this.y = f, this.z = h ?? P.ONE, this.zinv = null;
  }
  getX() {
    return this.zinv === null && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q));
  }
  getY() {
    return this.zinv === null && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q));
  }
  /**
   * 判断相等
   */
  equals(i) {
    return i === this ? !0 : this.isInfinity() ? i.isInfinity() : i.isInfinity() ? this.isInfinity() : i.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(i.z)).mod(this.curve.q).equals(P.ZERO) ? i.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(i.z)).mod(this.curve.q).equals(P.ZERO) : !1;
  }
  /**
   * 是否是无穷远点
   */
  isInfinity() {
    return this.x === null && this.y === null ? !0 : this.z.equals(P.ZERO) && !this.y.toBigInteger().equals(P.ZERO);
  }
  /**
   * 取反，x 轴对称点
   */
  negate() {
    return new ht(this.curve, this.x, this.y.negate(), this.z);
  }
  /**
   * 相加
   *
   * 标准射影坐标系：
   *
   * λ1 = x1 * z2
   * λ2 = x2 * z1
   * λ3 = λ1 − λ2
   * λ4 = y1 * z2
   * λ5 = y2 * z1
   * λ6 = λ4 − λ5
   * λ7 = λ1 + λ2
   * λ8 = z1 * z2
   * λ9 = λ3^2
   * λ10 = λ3 * λ9
   * λ11 = λ8 * λ6^2 − λ7 * λ9
   * x3 = λ3 * λ11
   * y3 = λ6 * (λ9 * λ1 − λ11) − λ4 * λ10
   * z3 = λ10 * λ8
   */
  add(i) {
    if (this.isInfinity())
      return i;
    if (i.isInfinity())
      return this;
    const s = this.x.toBigInteger(), f = this.y.toBigInteger(), h = this.z, o = i.x.toBigInteger(), a = i.y.toBigInteger(), y = i.z, l = this.curve.q, w = s.multiply(y).mod(l), g = o.multiply(h).mod(l), x = w.subtract(g), m = f.multiply(y).mod(l), T = a.multiply(h).mod(l), d = m.subtract(T);
    if (P.ZERO.equals(x))
      return P.ZERO.equals(d) ? this.twice() : this.curve.infinity;
    const F = w.add(g), D = h.multiply(y).mod(l), E = x.square().mod(l), q = x.multiply(E).mod(l), _ = D.multiply(d.square()).subtract(F.multiply(E)).mod(l), O = x.multiply(_).mod(l), V = d.multiply(E.multiply(w).subtract(_)).subtract(m.multiply(q)).mod(l), Z = q.multiply(D).mod(l);
    return new ht(this.curve, this.curve.fromBigInteger(O), this.curve.fromBigInteger(V), Z);
  }
  /**
   * 自加
   *
   * 标准射影坐标系：
   *
   * λ1 = 3 * x1^2 + a * z1^2
   * λ2 = 2 * y1 * z1
   * λ3 = y1^2
   * λ4 = λ3 * x1 * z1
   * λ5 = λ2^2
   * λ6 = λ1^2 − 8 * λ4
   * x3 = λ2 * λ6
   * y3 = λ1 * (4 * λ4 − λ6) − 2 * λ5 * λ3
   * z3 = λ2 * λ5
   */
  twice() {
    if (this.isInfinity())
      return this;
    if (!this.y.toBigInteger().signum())
      return this.curve.infinity;
    const i = this.x.toBigInteger(), s = this.y.toBigInteger(), f = this.z, h = this.curve.q, o = this.curve.a.toBigInteger(), a = i.square().multiply(Qt).add(o.multiply(f.square())).mod(h), y = s.shiftLeft(1).multiply(f).mod(h), l = s.square().mod(h), w = l.multiply(i).multiply(f).mod(h), g = y.square().mod(h), x = a.square().subtract(w.shiftLeft(3)).mod(h), m = y.multiply(x).mod(h), T = a.multiply(w.shiftLeft(2).subtract(x)).subtract(g.shiftLeft(1).multiply(l)).mod(h), d = y.multiply(g).mod(h);
    return new ht(this.curve, this.curve.fromBigInteger(m), this.curve.fromBigInteger(T), d);
  }
  /**
   * 倍点计算
   */
  multiply(i) {
    if (this.isInfinity())
      return this;
    if (!i.signum())
      return this.curve.infinity;
    const s = i.multiply(Qt), f = this.negate();
    let h = this;
    for (let o = s.bitLength() - 2; o > 0; o--) {
      h = h.twice();
      const a = s.testBit(o), y = i.testBit(o);
      a !== y && (h = h.add(a ? this : f));
    }
    return h;
  }
}
let rr = class {
  constructor(i, s, f) {
    this.q = i, this.a = this.fromBigInteger(s), this.b = this.fromBigInteger(f), this.infinity = new ht(this, null, null);
  }
  /**
   * 判断两个椭圆曲线是否相等
   */
  equals(i) {
    return i === this ? !0 : this.q.equals(i.q) && this.a.equals(i.a) && this.b.equals(i.b);
  }
  /**
   * 生成椭圆曲线域元素
   */
  fromBigInteger(i) {
    return new ot(this.q, i);
  }
  /**
   * 解析 16 进制串为椭圆曲线点
   */
  decodePointHex(i) {
    switch (parseInt(i.substr(0, 2), 16)) {
      case 0:
        return this.infinity;
      case 2:
      case 3:
        const s = this.fromBigInteger(new P(i.substr(2), 16));
        let f = this.fromBigInteger(s.multiply(s.square()).add(
          s.multiply(this.a)
        ).add(this.b).toBigInteger().modPow(
          this.q.divide(new P("4")).add(P.ONE),
          this.q
        ));
        return f.toBigInteger().mod(Xt).equals(new P(i.substr(0, 2), 16).subtract(Xt)) || (f = f.negate()), new ht(this, s, f);
      case 4:
      case 6:
      case 7:
        const h = (i.length - 2) / 2, o = i.substr(2, h), a = i.substr(h + 2, h);
        return new ht(this, this.fromBigInteger(new P(o, 16)), this.fromBigInteger(new P(a, 16)));
      default:
        return null;
    }
  }
};
var nr = {
  ECPointFp: ht,
  ECCurveFp: rr
};
const { BigInteger: W, SecureRandom: sr } = Q, { ECCurveFp: or } = nr, fr = new sr(), { curve: gt, G: hr, n: Wt } = ae();
function ur() {
  return gt;
}
function ae() {
  const r = new W("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF", 16), i = new W("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC", 16), s = new W("28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93", 16), f = new or(r, i, s), h = "32C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7", o = "BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0", a = f.decodePointHex("04" + h + o), y = new W("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123", 16);
  return { curve: f, G: a, n: y };
}
function ar(r, i, s) {
  const h = (r ? new W(r, i, s) : new W(Wt.bitLength(), fr)).mod(Wt.subtract(W.ONE)).add(W.ONE), o = Ft(h.toString(16), 64), a = hr.multiply(h), y = Ft(a.getX().toBigInteger().toString(16), 64), l = Ft(a.getY().toBigInteger().toString(16), 64), w = "04" + y + l;
  return { privateKey: o, publicKey: w };
}
function cr(r) {
  if (r.length !== 130)
    throw new Error("Invalid public key to compress");
  const i = (r.length - 2) / 2, s = r.substr(2, i), f = new W(r.substr(i + 2, i), 16);
  let h = "03";
  return f.mod(new W("2")).equals(W.ZERO) && (h = "02"), h + s;
}
function lr(r) {
  r = unescape(encodeURIComponent(r));
  const i = r.length, s = [];
  for (let h = 0; h < i; h++)
    s[h >>> 2] |= (r.charCodeAt(h) & 255) << 24 - h % 4 * 8;
  const f = [];
  for (let h = 0; h < i; h++) {
    const o = s[h >>> 2] >>> 24 - h % 4 * 8 & 255;
    f.push((o >>> 4).toString(16)), f.push((o & 15).toString(16));
  }
  return f.join("");
}
function Ft(r, i) {
  return r.length >= i ? r : new Array(i - r.length + 1).join("0") + r;
}
function pr(r) {
  return r.map((i) => (i = i.toString(16), i.length === 1 ? "0" + i : i)).join("");
}
function xr(r) {
  const i = [];
  let s = 0;
  for (let f = 0; f < r.length * 2; f += 2)
    i[f >>> 3] |= parseInt(r[s], 10) << 24 - f % 8 * 4, s++;
  try {
    const f = [];
    for (let h = 0; h < r.length; h++) {
      const o = i[h >>> 2] >>> 24 - h % 4 * 8 & 255;
      f.push(String.fromCharCode(o));
    }
    return decodeURIComponent(escape(f.join("")));
  } catch {
    throw new Error("Malformed UTF-8 data");
  }
}
function dr(r) {
  const i = [];
  let s = r.length;
  s % 2 !== 0 && (r = Ft(r, s + 1)), s = r.length;
  for (let f = 0; f < s; f += 2)
    i.push(parseInt(r.substr(f, 2), 16));
  return i;
}
function vr(r) {
  const i = gt.decodePointHex(r);
  if (!i)
    return !1;
  const s = i.getX();
  return i.getY().square().equals(s.multiply(s.square()).add(s.multiply(gt.a)).add(gt.b));
}
function gr(r, i) {
  const s = gt.decodePointHex(r);
  if (!s)
    return !1;
  const f = gt.decodePointHex(i);
  return f ? s.equals(f) : !1;
}
var yr = {
  getGlobalCurve: ur,
  generateEcparam: ae,
  generateKeyPairHex: ar,
  compressPublicKeyHex: cr,
  utf8ToHex: lr,
  leftPad: Ft,
  arrayToHex: pr,
  arrayToUtf8: xr,
  hexToArray: dr,
  verifyPublicKey: vr,
  comparePublicKeyHex: gr
};
const Y = new Uint32Array(68), Vt = new Uint32Array(64);
function $(r, i) {
  const s = i & 31;
  return r << s | r >>> 32 - s;
}
function te(r, i) {
  const s = [];
  for (let f = r.length - 1; f >= 0; f--)
    s[f] = (r[f] ^ i[f]) & 255;
  return s;
}
function mr(r) {
  return r ^ $(r, 9) ^ $(r, 17);
}
function br(r) {
  return r ^ $(r, 15) ^ $(r, 23);
}
function Ot(r) {
  let i = r.length * 8, s = i % 512;
  s = s >= 448 ? 512 - s % 448 - 1 : 448 - s - 1;
  const f = new Array((s - 7) / 8), h = new Array(8);
  for (let g = 0, x = f.length; g < x; g++)
    f[g] = 0;
  for (let g = 0, x = h.length; g < x; g++)
    h[g] = 0;
  i = i.toString(2);
  for (let g = 7; g >= 0; g--)
    if (i.length > 8) {
      const x = i.length - 8;
      h[g] = parseInt(i.substr(x), 2), i = i.substr(0, x);
    } else
      i.length > 0 && (h[g] = parseInt(i, 2), i = "");
  const o = new Uint8Array([...r, 128, ...f, ...h]), a = new DataView(o.buffer, 0), y = o.length / 64, l = new Uint32Array([1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214]);
  for (let g = 0; g < y; g++) {
    Y.fill(0), Vt.fill(0);
    const x = 16 * g;
    for (let S = 0; S < 16; S++)
      Y[S] = a.getUint32((x + S) * 4, !1);
    for (let S = 16; S < 68; S++)
      Y[S] = br(Y[S - 16] ^ Y[S - 9] ^ $(Y[S - 3], 15)) ^ $(Y[S - 13], 7) ^ Y[S - 6];
    for (let S = 0; S < 64; S++)
      Vt[S] = Y[S] ^ Y[S + 4];
    const m = 2043430169, T = 2055708042;
    let d = l[0], F = l[1], D = l[2], E = l[3], q = l[4], _ = l[5], O = l[6], V = l[7], Z, H, K, tt, it;
    for (let S = 0; S < 64; S++)
      it = S >= 0 && S <= 15 ? m : T, Z = $($(d, 12) + q + $(it, S), 7), H = Z ^ $(d, 12), K = (S >= 0 && S <= 15 ? d ^ F ^ D : d & F | d & D | F & D) + E + H + Vt[S], tt = (S >= 0 && S <= 15 ? q ^ _ ^ O : q & _ | ~q & O) + V + Z + Y[S], E = D, D = $(F, 9), F = d, d = K, V = O, O = $(_, 19), _ = q, q = mr(tt);
    l[0] ^= d, l[1] ^= F, l[2] ^= D, l[3] ^= E, l[4] ^= q, l[5] ^= _, l[6] ^= O, l[7] ^= V;
  }
  const w = [];
  for (let g = 0, x = l.length; g < x; g++) {
    const m = l[g];
    w.push((m & 4278190080) >>> 24, (m & 16711680) >>> 16, (m & 65280) >>> 8, m & 255);
  }
  return w;
}
const Bt = 64, ce = new Uint8Array(Bt), le = new Uint8Array(Bt);
for (let r = 0; r < Bt; r++)
  ce[r] = 54, le[r] = 92;
function wr(r, i) {
  for (i.length > Bt && (i = Ot(i)); i.length < Bt; )
    i.push(0);
  const s = te(i, ce), f = te(i, le), h = Ot([...s, ...r]);
  return Ot([...f, ...h]);
}
var pe = {
  sm3: Ot,
  hmac: wr
};
const { BigInteger: U } = Q, { encodeDer: Tr, decodeDer: Fr } = ir, I = yr, mt = pe.sm3, { G: xt, curve: xe, n: dt } = I.generateEcparam(), de = 0;
function Br(r, i, s = 1) {
  r = typeof r == "string" ? I.hexToArray(I.utf8ToHex(r)) : Array.prototype.slice.call(r), i = I.getGlobalCurve().decodePointHex(i);
  const f = I.generateKeyPairHex(), h = new U(f.privateKey, 16);
  let o = f.publicKey;
  o.length > 128 && (o = o.substr(o.length - 128));
  const a = i.multiply(h), y = I.hexToArray(I.leftPad(a.getX().toBigInteger().toRadix(16), 64)), l = I.hexToArray(I.leftPad(a.getY().toBigInteger().toRadix(16), 64)), w = I.arrayToHex(mt([].concat(y, r, l)));
  let g = 1, x = 0, m = [];
  const T = [].concat(y, l), d = () => {
    m = mt([...T, g >> 24 & 255, g >> 16 & 255, g >> 8 & 255, g & 255]), g++, x = 0;
  };
  d();
  for (let D = 0, E = r.length; D < E; D++)
    x === m.length && d(), r[D] ^= m[x++] & 255;
  const F = I.arrayToHex(r);
  return s === de ? o + F + w : o + w + F;
}
function Sr(r, i, s = 1, {
  output: f = "string"
} = {}) {
  i = new U(i, 16);
  let h = r.substr(128, 64), o = r.substr(128 + 64);
  s === de && (h = r.substr(r.length - 64), o = r.substr(128, r.length - 128 - 64));
  const a = I.hexToArray(o), l = I.getGlobalCurve().decodePointHex("04" + r.substr(0, 128)).multiply(i), w = I.hexToArray(I.leftPad(l.getX().toBigInteger().toRadix(16), 64)), g = I.hexToArray(I.leftPad(l.getY().toBigInteger().toRadix(16), 64));
  let x = 1, m = 0, T = [];
  const d = [].concat(w, g), F = () => {
    T = mt([...d, x >> 24 & 255, x >> 16 & 255, x >> 8 & 255, x & 255]), x++, m = 0;
  };
  F();
  for (let E = 0, q = a.length; E < q; E++)
    m === T.length && F(), a[E] ^= T[m++] & 255;
  return I.arrayToHex(mt([].concat(w, a, g))) === h.toLowerCase() ? f === "array" ? a : I.arrayToUtf8(a) : f === "array" ? [] : "";
}
function Ir(r, i, {
  pointPool: s,
  der: f,
  hash: h,
  publicKey: o,
  userId: a
} = {}) {
  let y = typeof r == "string" ? I.utf8ToHex(r) : I.arrayToHex(r);
  h && (o = o || Dr(i), y = ve(y, o, a));
  const l = new U(i, 16), w = new U(y, 16);
  let g = null, x = null, m = null;
  do {
    do {
      let T;
      s && s.length ? T = s.pop() : T = ge(), g = T.k, x = w.add(T.x1).mod(dt);
    } while (x.equals(U.ZERO) || x.add(g).equals(dt));
    m = l.add(U.ONE).modInverse(dt).multiply(g.subtract(x.multiply(l))).mod(dt);
  } while (m.equals(U.ZERO));
  return f ? Tr(x, m) : I.leftPad(x.toString(16), 64) + I.leftPad(m.toString(16), 64);
}
function Ar(r, i, s, { der: f, hash: h, userId: o } = {}) {
  let a = typeof r == "string" ? I.utf8ToHex(r) : I.arrayToHex(r);
  h && (a = ve(a, s, o));
  let y, l;
  if (f) {
    const d = Fr(i);
    y = d.r, l = d.s;
  } else
    y = new U(i.substring(0, 64), 16), l = new U(i.substring(64), 16);
  const w = xe.decodePointHex(s), g = new U(a, 16), x = y.add(l).mod(dt);
  if (x.equals(U.ZERO))
    return !1;
  const m = xt.multiply(l).add(w.multiply(x)), T = g.add(m.getX().toBigInteger()).mod(dt);
  return y.equals(T);
}
function ve(r, i, s = "1234567812345678") {
  s = I.utf8ToHex(s);
  const f = I.leftPad(xt.curve.a.toBigInteger().toRadix(16), 64), h = I.leftPad(xt.curve.b.toBigInteger().toRadix(16), 64), o = I.leftPad(xt.getX().toBigInteger().toRadix(16), 64), a = I.leftPad(xt.getY().toBigInteger().toRadix(16), 64);
  let y, l;
  if (i.length === 128)
    y = i.substr(0, 64), l = i.substr(64, 64);
  else {
    const m = xt.curve.decodePointHex(i);
    y = I.leftPad(m.getX().toBigInteger().toRadix(16), 64), l = I.leftPad(m.getY().toBigInteger().toRadix(16), 64);
  }
  const w = I.hexToArray(s + f + h + o + a + y + l), g = s.length * 4;
  w.unshift(g & 255), w.unshift(g >> 8 & 255);
  const x = mt(w);
  return I.arrayToHex(mt(x.concat(I.hexToArray(r))));
}
function Dr(r) {
  const i = xt.multiply(new U(r, 16)), s = I.leftPad(i.getX().toBigInteger().toString(16), 64), f = I.leftPad(i.getY().toBigInteger().toString(16), 64);
  return "04" + s + f;
}
function ge() {
  const r = I.generateKeyPairHex(), i = xe.decodePointHex(r.publicKey);
  return r.k = new U(r.privateKey, 16), r.x1 = i.getX().toBigInteger(), r;
}
var Er = {
  generateKeyPairHex: I.generateKeyPairHex,
  compressPublicKeyHex: I.compressPublicKeyHex,
  comparePublicKeyHex: I.comparePublicKeyHex,
  doEncrypt: Br,
  doDecrypt: Sr,
  doSignature: Ir,
  doVerifySignature: Ar,
  getPoint: ge,
  verifyPublicKey: I.verifyPublicKey
};
const { sm3: qr, hmac: Mr } = pe;
function Or(r, i) {
  return r.length >= i ? r : new Array(i - r.length + 1).join("0") + r;
}
function ee(r) {
  return r.map((i) => (i = i.toString(16), i.length === 1 ? "0" + i : i)).join("");
}
function Cr(r) {
  const i = [];
  let s = r.length;
  s % 2 !== 0 && (r = Or(r, s + 1)), s = r.length;
  for (let f = 0; f < s; f += 2)
    i.push(parseInt(r.substr(f, 2), 16));
  return i;
}
function Rr(r) {
  const i = [];
  for (let s = 0, f = r.length; s < f; s++) {
    const h = r.codePointAt(s);
    if (h <= 127)
      i.push(h);
    else if (h <= 2047)
      i.push(192 | h >>> 6), i.push(128 | h & 63);
    else if (h <= 55295 || h >= 57344 && h <= 65535)
      i.push(224 | h >>> 12), i.push(128 | h >>> 6 & 63), i.push(128 | h & 63);
    else if (h >= 65536 && h <= 1114111)
      s++, i.push(240 | h >>> 18 & 28), i.push(128 | h >>> 12 & 63), i.push(128 | h >>> 6 & 63), i.push(128 | h & 63);
    else
      throw i.push(h), new Error("input is not supported");
  }
  return i;
}
var _r = function(r, i) {
  if (r = typeof r == "string" ? Rr(r) : Array.prototype.slice.call(r), i) {
    if ((i.mode || "hmac") !== "hmac")
      throw new Error("invalid mode");
    let f = i.key;
    if (!f)
      throw new Error("invalid key");
    return f = typeof f == "string" ? Cr(f) : Array.prototype.slice.call(f), ee(Mr(r, f));
  }
  return ee(qr(r));
};
const nt = 0, Hr = 32, pt = 16, Dt = [
  214,
  144,
  233,
  254,
  204,
  225,
  61,
  183,
  22,
  182,
  20,
  194,
  40,
  251,
  44,
  5,
  43,
  103,
  154,
  118,
  42,
  190,
  4,
  195,
  170,
  68,
  19,
  38,
  73,
  134,
  6,
  153,
  156,
  66,
  80,
  244,
  145,
  239,
  152,
  122,
  51,
  84,
  11,
  67,
  237,
  207,
  172,
  98,
  228,
  179,
  28,
  169,
  201,
  8,
  232,
  149,
  128,
  223,
  148,
  250,
  117,
  143,
  63,
  166,
  71,
  7,
  167,
  252,
  243,
  115,
  23,
  186,
  131,
  89,
  60,
  25,
  230,
  133,
  79,
  168,
  104,
  107,
  129,
  178,
  113,
  100,
  218,
  139,
  248,
  235,
  15,
  75,
  112,
  86,
  157,
  53,
  30,
  36,
  14,
  94,
  99,
  88,
  209,
  162,
  37,
  34,
  124,
  59,
  1,
  33,
  120,
  135,
  212,
  0,
  70,
  87,
  159,
  211,
  39,
  82,
  76,
  54,
  2,
  231,
  160,
  196,
  200,
  158,
  234,
  191,
  138,
  210,
  64,
  199,
  56,
  181,
  163,
  247,
  242,
  206,
  249,
  97,
  21,
  161,
  224,
  174,
  93,
  164,
  155,
  52,
  26,
  85,
  173,
  147,
  50,
  48,
  245,
  140,
  177,
  227,
  29,
  246,
  226,
  46,
  130,
  102,
  202,
  96,
  192,
  41,
  35,
  171,
  13,
  83,
  78,
  111,
  213,
  219,
  55,
  69,
  222,
  253,
  142,
  47,
  3,
  255,
  106,
  114,
  109,
  108,
  91,
  81,
  141,
  27,
  175,
  146,
  187,
  221,
  188,
  127,
  17,
  217,
  92,
  65,
  31,
  16,
  90,
  216,
  10,
  193,
  49,
  136,
  165,
  205,
  123,
  189,
  45,
  116,
  208,
  18,
  184,
  229,
  180,
  176,
  137,
  105,
  151,
  74,
  12,
  150,
  119,
  126,
  101,
  185,
  241,
  9,
  197,
  110,
  198,
  132,
  24,
  240,
  125,
  236,
  58,
  220,
  77,
  32,
  121,
  238,
  95,
  62,
  215,
  203,
  57,
  72
], Et = [
  462357,
  472066609,
  943670861,
  1415275113,
  1886879365,
  2358483617,
  2830087869,
  3301692121,
  3773296373,
  4228057617,
  404694573,
  876298825,
  1347903077,
  1819507329,
  2291111581,
  2762715833,
  3234320085,
  3705924337,
  4177462797,
  337322537,
  808926789,
  1280531041,
  1752135293,
  2223739545,
  2695343797,
  3166948049,
  3638552301,
  4110090761,
  269950501,
  741554753,
  1213159005,
  1684763257
];
function Zt(r) {
  const i = [];
  for (let s = 0, f = r.length; s < f; s += 2)
    i.push(parseInt(r.substr(s, 2), 16));
  return i;
}
function Nr(r) {
  return r.map((i) => (i = i.toString(16), i.length === 1 ? "0" + i : i)).join("");
}
function Pr(r) {
  const i = [];
  for (let s = 0, f = r.length; s < f; s++) {
    const h = r.codePointAt(s);
    if (h <= 127)
      i.push(h);
    else if (h <= 2047)
      i.push(192 | h >>> 6), i.push(128 | h & 63);
    else if (h <= 55295 || h >= 57344 && h <= 65535)
      i.push(224 | h >>> 12), i.push(128 | h >>> 6 & 63), i.push(128 | h & 63);
    else if (h >= 65536 && h <= 1114111)
      s++, i.push(240 | h >>> 18 & 28), i.push(128 | h >>> 12 & 63), i.push(128 | h >>> 6 & 63), i.push(128 | h & 63);
    else
      throw i.push(h), new Error("input is not supported");
  }
  return i;
}
function Vr(r) {
  const i = [];
  for (let s = 0, f = r.length; s < f; s++)
    r[s] >= 240 && r[s] <= 247 ? (i.push(String.fromCodePoint(((r[s] & 7) << 18) + ((r[s + 1] & 63) << 12) + ((r[s + 2] & 63) << 6) + (r[s + 3] & 63))), s += 3) : r[s] >= 224 && r[s] <= 239 ? (i.push(String.fromCodePoint(((r[s] & 15) << 12) + ((r[s + 1] & 63) << 6) + (r[s + 2] & 63))), s += 2) : r[s] >= 192 && r[s] <= 223 ? (i.push(String.fromCodePoint(((r[s] & 31) << 6) + (r[s + 1] & 63))), s++) : i.push(String.fromCodePoint(r[s]));
  return i.join("");
}
function vt(r, i) {
  return r << i | r >>> 32 - i;
}
function ft(r) {
  return (Dt[r >>> 24 & 255] & 255) << 24 | (Dt[r >>> 16 & 255] & 255) << 16 | (Dt[r >>> 8 & 255] & 255) << 8 | Dt[r & 255] & 255;
}
function qt(r) {
  return r ^ vt(r, 2) ^ vt(r, 10) ^ vt(r, 18) ^ vt(r, 24);
}
function Mt(r) {
  return r ^ vt(r, 13) ^ vt(r, 23);
}
function Zr(r, i, s) {
  const f = new Array(4), h = new Array(4);
  for (let o = 0; o < 4; o++)
    h[0] = r[4 * o] & 255, h[1] = r[4 * o + 1] & 255, h[2] = r[4 * o + 2] & 255, h[3] = r[4 * o + 3] & 255, f[o] = h[0] << 24 | h[1] << 16 | h[2] << 8 | h[3];
  for (let o = 0, a; o < 32; o += 4)
    a = f[1] ^ f[2] ^ f[3] ^ s[o + 0], f[0] ^= qt(ft(a)), a = f[2] ^ f[3] ^ f[0] ^ s[o + 1], f[1] ^= qt(ft(a)), a = f[3] ^ f[0] ^ f[1] ^ s[o + 2], f[2] ^= qt(ft(a)), a = f[0] ^ f[1] ^ f[2] ^ s[o + 3], f[3] ^= qt(ft(a));
  for (let o = 0; o < 16; o += 4)
    i[o] = f[3 - o / 4] >>> 24 & 255, i[o + 1] = f[3 - o / 4] >>> 16 & 255, i[o + 2] = f[3 - o / 4] >>> 8 & 255, i[o + 3] = f[3 - o / 4] & 255;
}
function jr(r, i, s) {
  const f = new Array(4), h = new Array(4);
  for (let o = 0; o < 4; o++)
    h[0] = r[0 + 4 * o] & 255, h[1] = r[1 + 4 * o] & 255, h[2] = r[2 + 4 * o] & 255, h[3] = r[3 + 4 * o] & 255, f[o] = h[0] << 24 | h[1] << 16 | h[2] << 8 | h[3];
  f[0] ^= 2746333894, f[1] ^= 1453994832, f[2] ^= 1736282519, f[3] ^= 2993693404;
  for (let o = 0, a; o < 32; o += 4)
    a = f[1] ^ f[2] ^ f[3] ^ Et[o + 0], i[o + 0] = f[0] ^= Mt(ft(a)), a = f[2] ^ f[3] ^ f[0] ^ Et[o + 1], i[o + 1] = f[1] ^= Mt(ft(a)), a = f[3] ^ f[0] ^ f[1] ^ Et[o + 2], i[o + 2] = f[2] ^= Mt(ft(a)), a = f[0] ^ f[1] ^ f[2] ^ Et[o + 3], i[o + 3] = f[3] ^= Mt(ft(a));
  if (s === nt)
    for (let o = 0, a; o < 16; o++)
      a = i[o], i[o] = i[31 - o], i[31 - o] = a;
}
function ie(r, i, s, {
  padding: f = "pkcs#7",
  mode: h,
  iv: o = [],
  output: a = "string"
} = {}) {
  if (h === "cbc" && (typeof o == "string" && (o = Zt(o)), o.length !== 128 / 8))
    throw new Error("iv is invalid");
  if (typeof i == "string" && (i = Zt(i)), i.length !== 128 / 8)
    throw new Error("key is invalid");
  if (typeof r == "string" ? s !== nt ? r = Pr(r) : r = Zt(r) : r = [...r], (f === "pkcs#5" || f === "pkcs#7") && s !== nt) {
    const m = pt - r.length % pt;
    for (let T = 0; T < m; T++)
      r.push(m);
  }
  const y = new Array(Hr);
  jr(i, y, s);
  const l = [];
  let w = o, g = r.length, x = 0;
  for (; g >= pt; ) {
    const m = r.slice(x, x + 16), T = new Array(16);
    if (h === "cbc")
      for (let d = 0; d < pt; d++)
        s !== nt && (m[d] ^= w[d]);
    Zr(m, T, y);
    for (let d = 0; d < pt; d++)
      h === "cbc" && s === nt && (T[d] ^= w[d]), l[x + d] = T[d];
    h === "cbc" && (s !== nt ? w = T : w = m), g -= pt, x += pt;
  }
  if ((f === "pkcs#5" || f === "pkcs#7") && s === nt) {
    const m = l.length, T = l[m - 1];
    for (let d = 1; d <= T; d++)
      if (l[m - d] !== T)
        throw new Error("padding is invalid");
    l.splice(m - T, T);
  }
  return a !== "array" ? s !== nt ? Nr(l) : Vr(l) : l;
}
var Lr = {
  encrypt(r, i, s) {
    return ie(r, i, 1, s);
  },
  decrypt(r, i, s) {
    return ie(r, i, 0, s);
  }
}, st = {
  sm2: Er,
  sm3: _r,
  sm4: Lr
};
function A(r, i) {
  if (typeof r == "bigint") {
    if (i === void 0) {
      i = 0n;
      for (var s = r >> 64n; s != 0n; )
        i += 8n, s >>= 64n;
      for (s = r >> (i << 3n); s != 0n; )
        i += 1n, s >>= 8n;
    } else
      r >> (i << 3n) && (r &= (1n << (i << 3n)) - 1n);
    var f = Ur(r.toString(16).padStart(Number(i * 2n), "0")), h = new Uint8Array(f);
    return h;
  } else if (typeof r == "string")
    return i && r.length > i && (r = r.slice(0, Number(i))), kr(r);
  return new Uint8Array();
}
function Ur(r) {
  var i = [], s = r.length;
  s % 2 !== 0 && (r = Kr(r, s + 1)), s = r.length;
  for (var f = 0; f < s; f += 2)
    i.push(parseInt(r.substr(f, 2), 16));
  return i;
}
function Kr(r, i) {
  return r.length >= i ? r : new Array(i - r.length + 1).join("0") + r;
}
function X(r) {
  var i = r.length, s = re(r), f = new Uint8Array(s);
  f.set(r[0]);
  for (var h = 1; h < i; h++)
    r[h] && f.set(r[h], re(r.slice(0, h)));
  return f;
}
function re(r) {
  for (var i = r.length, s = 0, f = 0; f < i; f++)
    r[f] && (s += r[f].length);
  return s;
}
function ne(r) {
  var i = Array.prototype.map.call(new Uint8Array(r), function(s) {
    return ("00" + s.toString(16)).slice(-2);
  });
  return i.join("");
}
function ye(r) {
  var i = new ArrayBuffer(r.length / 2), s = Array.prototype.map.call(new Uint8Array(i), function(f, h) {
    return parseInt(r.slice(h * 2, h * 2 + 2), 16);
  });
  return new Uint8Array(s);
}
function B(r, i) {
  var s = r / i;
  (r < 0n || i < 0n) && s <= 0n && r + i != 0n && (s -= 1n), r < 0n && i < 0n && r > i && (s += 1n);
  var f = r - s * i;
  return f;
}
function kr(r) {
  var i = r.split("").map(function(s) {
    return s.charCodeAt(0);
  });
  return new Uint8Array(i);
}
function me(r, i) {
  return i == 0n ? r : me(i, B(r, i));
}
function be(r, i) {
  if (i === 0n)
    return [1n, 0n];
  var s = be(i, B(r, i)), f = s[0], h = s[1];
  return [h, f - r / i * h];
}
function se(r, i) {
  if (me(r, i) === 1n) {
    var s = be(r, i), f = s[0];
    return s[1], B(f, i);
  } else
    return 1n;
}
var $r = 32;
function oe(r, i) {
  typeof r != "string" && (r = ne(r));
  for (var s = i >> 3, f = "", h = 1; h < Math.ceil(s / $r) + 1; h++) {
    var o = ye(r + ne(A(BigInt(h), 4n))), a = st.sm3(o);
    f = f + a;
  }
  return f.slice(0, s * 2);
}
function zr(r) {
  if (typeof r == "number") {
    for (var i = 0, s = r >> 64; s !== 0; )
      i += 64, s >>= 64;
    for (s = r >> i >>> 8; s !== 0; )
      i += 8, s >>= 8;
    for (r >>= i; r !== 0; )
      i += 1, r >>= 1;
    return i;
  } else {
    if (typeof r == "string")
      return r.length * 8;
    if (Buffer.isBuffer(r))
      return r.length * 8;
  }
  return 0;
}
var Gr = (
  /** @class */
  function() {
    function r(i, s, f, h, o, a) {
      this.p = i, this.a = s, this.b = f, this.n = h, this.G = o, a && (this.h = a), this.O = [-1n, -1n], this._2 = se(2n, i), this.a_3 = B(s + 3n, i);
    }
    return r.prototype.genKeyPaire = function() {
      var i = new Q.SecureRandom(), s = new Q.BigInteger(this.n.toString(16)), f = this.n.toString(16).length * 4, h = new Q.BigInteger(f, i), o = h.mod(s.subtract(Q.BigInteger.ONE)).add(Q.BigInteger.ONE), a = BigInt(o.toString()), y = this.Jacb_multiply(a, this.G);
      return {
        publicKey: { x: y[0], y: y[1] },
        privateKey: a
      };
    }, r.prototype.Jacb_multiply = function(i, s, f) {
      f === void 0 && (f = !0);
      var h;
      if (i === 0n || s[0] == this.O[0] && s[1] == this.O[1])
        return this.O;
      var o = (3n * i).toString(2), a = i.toString(2);
      a = "0".repeat(o.length - a.length) + a, h = Array.from(s);
      for (var y = this.minus(s), l = 1; l < o.length - 1; l++)
        h = this.Jacb_add(h), o[l] === "1" && a[l] === "0" ? h = this.Jacb_add(h, s) : o[l] === "0" && a[l] === "1" && (h = this.Jacb_add(h, y));
      return f ? this.Jacb_to_affine(h) : h;
    }, r.prototype.Jacb_add = function(i, s) {
      var f;
      s === void 0 && (s = null);
      var h, o, a, y, l;
      if (!s || i === s) {
        if (i === this.O)
          return this.O;
        var w = i[0], g = i[1], x = i[2] || 1n;
        if (l = B(g * x << 1n, this.p), l === 0n)
          return this.O;
        h = B(g * g, this.p), o = B(h << 3n, this.p);
        var m = B(w * o, this.p), T = B(x * x, this.p), d = B((w + T) * (w - T) * 3n, this.p);
        d = B(d + this.a_3 * T * T, this.p);
        var F = B(d * d, this.p);
        h = B(h * o, this.p), a = B(F - m, this.p), o = m & 1n ? m + (m + this.p >> 1n) - F : m + (m >> 1n) - F, d = B(d * o, this.p), y = B(d - h, this.p);
      } else {
        if (i === this.O)
          return s;
        if (s === this.O)
          return i;
        var w = i[0], g = i[1], x = i[2] || 1n, D = s[0], E = s[1], q = s[2] || 1n;
        if (q != 1n && x != 1n) {
          var _ = B(x * x, this.p), O = B(q * q, this.p), d = B(w * O, this.p);
          h = B(D * _, this.p);
          var F = d - h;
          if (l = B(x * q * F, this.p), l == 0n)
            return this.O;
          o = B(g * q * O, this.p);
          var m = B(E * x * _, this.p), T = o - m, V = d + h, Z = o + m, H = B(F * F, this.p);
          a = B(T * T - V * H, this.p);
          var K = B(V * H - (a << 1n), this.p);
          y = B((K * T - Z * F * H) * this._2, this.p);
        } else {
          x === 1n && (f = [D, E, q, w, g], w = f[0], g = f[1], x = f[2], D = f[3], E = f[4]);
          var d = B(x * x, this.p);
          h = B(E * x, this.p);
          var F = B(D * d, this.p);
          if (d = B(d * h, this.p), h = F - w, l = B(x * h, this.p), l === 0n)
            return this.O;
          F += w, d -= g, o = B(h * h, this.p);
          var m = B(d * d, this.p);
          h = B(h * o, this.p), F = B(F * o, this.p), o = B(w * o, this.p), a = m - B(F, this.p), h = B(g * h, this.p), F = o - a, d = B(d * F, this.p), y = d - B(h, this.p);
        }
      }
      return [a, y, l];
    }, r.prototype.Jacb_to_affine = function(i) {
      if (i.length == 2)
        return i;
      var s = i[0], f = i[1], h = i[2];
      if (h == 0n)
        return this.O;
      var o = se(h, this.p), a = B(s * o * o, this.p), y = B(f * o * o * o, this.p);
      return [a, y];
    }, r.prototype.minus = function(i) {
      var s = Array.from(i);
      return s[1] = -s[1], s;
    }, r.prototype.isZero = function(i) {
      return i.length == 2 ? i == this.O : i[2] == 0n;
    }, r.prototype.onCurve = function(i) {
      if (this.isZero(i))
        return !1;
      if (i.length == 2) {
        var s = i[0], f = i[1];
        return f * f % this.p == (s * s * s + this.a * s + this.b) % this.p;
      } else {
        var s = i[0], f = i[1], h = i[2];
        return f * f % this.p == (s * s * s + this.a * s * B(Math.pow(h, 4n), this.p) + this.b * B(Math.pow(h, 6n), this.p)) % this.p;
      }
    }, r;
  }()
), Jr = 0x8542d69e4c044f18e8b92435bf6ff7de457283915c45517d722edb8b08f1dfc3n, Yr = 0x787968b4fa32c3fd2417842e73bbfeff2f3c848b6831d7e0ec65228b3937e498n, Xr = 0x63e4c6d3b23b0c849cf84241484bfe48f61d59a5b16ba06e6e12d1da27c5249an, Qr = 0x8542d69e4c044f18e8b92435bf6ff7dd297720630485628d5ae74ee7c32e79b7n, Wr = 0x421debd61b62eab6746434ebc3cc315e32220b3badd50bdc4c4e6c147fedd43dn, tn = 0x0680512bcbb42c07d47349d2153b70c4e5d7fdfcbfa36ea1a85841b9e46e09a2n, fe = 128, rn = (
  /** @class */
  function(r) {
    Xi(i, r);
    function i(s, f, h, o, a, y, l, w, g, x) {
      s === void 0 && (s = Jr), f === void 0 && (f = Yr), h === void 0 && (h = Xr), o === void 0 && (o = Qr), a === void 0 && (a = [Wr, tn]), y === void 0 && (y = 1n), l === void 0 && (l = "");
      var m = r.call(this, s, f, h, o, a, y) || this;
      return m.h = y, typeof l == "string" || typeof l == "number" ? m.ID = l : m.ID = null, !w || !g ? m.initKey() : (m.pk = g, m.sk = w), m;
    }
    return i.prototype.initKey = function() {
      var s = this.genKeyPaire();
      this.pk = s.publicKey, this.sk = s.privateKey;
    }, i.prototype.getZ = function(s, f) {
      var h = !1;
      if (!f) {
        if (Object.hasOwnProperty.call(this, "Z"))
          return this.Z;
        s = this.ID, f = this.pk, h = !0;
      }
      if (f) {
        var o = zr(s), a = A(BigInt(o), 2n), y = [
          a,
          A(s),
          A(this.a),
          A(this.b),
          A(this.G[0]),
          A(this.G[1]),
          A(BigInt(f.x)),
          A(BigInt(f.y))
        ], l = X(y), w = ye(st.sm3(l));
        return h && (this.Z = w), w;
      }
    }, i.prototype.agreement_initiate = function() {
      return this.genKeyPaire();
    }, i.prototype.agreement_response = function(s, f, h, o, a, y, l) {
      h === void 0 && (h = ""), o === void 0 && (o = !1), a === void 0 && (a = null), y === void 0 && (y = null), l === void 0 && (l = null);
      var w = BigInt(s.x), g = BigInt(s.y);
      if (!this.onCurve([w, g]))
        throw new Error("不在曲线上");
      var x = 127n, m = 1n, T = this.getZ(h, f), d = this.getZ();
      if (!a || !y) {
        var F = this.genKeyPaire();
        y = F.publicKey, a = F.privateKey;
      }
      var D = BigInt(y.x), E = BigInt(y.y), q = (1n << x) + (D & (1n << x) - 1n), _ = (BigInt(this.sk) + q * BigInt(a)) % this.n, O = m * _, V = (1n << x) + (w & (1n << x) - 1n), Z = this.Jacb_add(this.Jacb_multiply(V, [BigInt(s.x), BigInt(s.y)], !1), [
        BigInt(f.x),
        BigInt(f.y)
      ]), H = this.Jacb_multiply(O, Z);
      if (this.isZero(H))
        throw new Error("无穷远点");
      var K = H[0], tt = H[1];
      l || (l = fe);
      var it = X([A(K), A(tt), T, d]), S = oe(it, l);
      if (!o)
        return {
          res: !0,
          content: [y, S]
        };
      var bt = X([A(K), T, d, A(w), A(g), A(D), A(E)]), ut = X([A(tt), A(st.sm3(bt))]), wt = st.sm3(X([A(2n), ut])), Ct = st.sm3(X([A(3n), ut]));
      return {
        res: !0,
        content: [y, S, wt, Ct]
      };
    }, i.prototype.agreement_confirm = function(s, f, h, o, a, y, l, w) {
      a === void 0 && (a = ""), y === void 0 && (y = null), l === void 0 && (l = !1), w === void 0 && (w = null);
      var g = f.x, x = f.y, m = h.x, T = h.y;
      if (g = BigInt(g), x = BigInt(x), m = BigInt(m), T = BigInt(T), !this.onCurve([m, T]))
        throw new Error("不在曲线上");
      var d = 127n, F = 1n, D = this.getZ(), E = this.getZ(a, o), q = (1n << d) + (g & (1n << d) - 1n), _ = (BigInt(this.sk) + q * BigInt(s)) % this.n, O = (1n << d) + (m & (1n << d) - 1n), V = F * _, Z = this.Jacb_add(this.Jacb_multiply(O, [BigInt(h.x), BigInt(h.y)], !1), [
        BigInt(o.x),
        BigInt(o.y)
      ]), H = this.Jacb_multiply(V, Z), K = H[0], tt = H[1];
      w || (w = fe);
      var it = X([A(K), A(tt), D, E]), S = oe(it, w);
      if (!l && !y)
        return {
          res: !0,
          content: [S]
        };
      var bt = [A(K), D, E, A(g), A(x), A(m), A(T)], ut = X([A(tt), A(st.sm3(X(bt)))]);
      st.sm3(X([A(2n), ut]));
      var wt = st.sm3(X([A(3n), ut]));
      return {
        res: !0,
        content: [S, wt]
      };
    }, i;
  }(Gr)
);
export {
  rn as SM2
};
