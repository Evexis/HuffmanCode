var Sign = /** @class */ (function () {
    function Sign(_a) {
        var label = _a.label, probability = _a.probability;
        this.label = label;
        this.probability = probability;
        this.code = '';
    }
    return Sign;
}());
var ComplexSign = /** @class */ (function () {
    function ComplexSign(sign) {
        this.label = '';
        this.signs = [];
        this.probability = 0;
        this.label = sign.label;
        this.signs.push(sign);
        this.probability = sign.probability;
    }
    ComplexSign.prototype.addSign = function (cSign) {
        var _a;
        this.label = this.label + cSign.label;
        (_a = this.signs).push.apply(_a, cSign.signs);
        this.probability += cSign.probability;
    };
    ComplexSign.prototype.addCode = function (code) {
        this.signs.forEach(function (sign) { return sign.code = code + sign.code; });
    };
    return ComplexSign;
}());
function compareProb(a, b) {
    return b.probability - a.probability;
}
var buffor = [];
// tworzymy buffor zawierający wszystkie znaki wraz z prawdopodobienstwami
/* robimy pętle iterującą buffor.length - 1 razy składając przy tym znaki
 * przy każdej iteracji:
 * 1) mamy sort po item.probability
 * 2) ostatni element addCode(0) przed ostatni addCode(1);
 * 3) (przed ostatni element).addSign(ostatni element)
 * 4) usunięcie ostatniego elementu
 */
var A = new Sign({ label: 'A', probability: 0.1 });
var B = new Sign({ label: 'B', probability: 0.05 });
var C = new Sign({ label: 'C', probability: 0.04 });
var D = new Sign({ label: 'D', probability: 0.01 });
var E = new Sign({ label: 'E', probability: 0.11 });
var F = new Sign({ label: 'F', probability: 0.19 });
var G = new Sign({ label: 'G', probability: 0.35 });
var H = new Sign({ label: 'H', probability: 0.25 });
[A, B, C, D, E, F, G, H].forEach(function (s) { return buffor.push(new ComplexSign(s)); });
for (var i = buffor.length - 2; i > -1; i--) {
    buffor.sort(compareProb);
    buffor[i].addCode(1);
    buffor[i + 1].addCode(0);
    buffor[i].addSign(buffor.pop());
}
[A, B, C, D, E, F, G, H].forEach(function (s) { return console.log(s); });
