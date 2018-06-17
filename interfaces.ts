class Sign {
    label: string;
    code: string;
    probability: number;

    constructor({label: label, probability: probability}) {
        this.label = label;
        this.probability = probability;
        this.code = '';

    }
}

class ComplexSign {
    label: string = ''
    signs: Sign[] = [];
    probability: number  = 0;

    constructor(sign: Sign) {
        this.label = sign.label;
        this.signs.push(sign);
        this.probability = sign.probability;
    }

    addSign(cSign: ComplexSign) {
        this.label += cSign.label;
        this.signs.push(...cSign.signs);
        this.probability += cSign.probability;
    }

    addCode(code: 0 | 1){
        this.signs.forEach(sign => sign.code = code + sign.code)
    }
}

function compareProb(a: ComplexSign, b: ComplexSign) {
    return b.probability - a.probability;
}

let buffor: ComplexSign[] = [];


// tworzymy buffor zawierający wszystkie znaki wraz z prawdopodobienstwami
/* robimy pętle iterującą buffor.length - 1 razy składając przy tym znaki
 * przy każdej iteracji:
 * 1) mamy sort po item.probability
 * 2) ostatni element addCode(0) przed ostatni addCode(1);
 * 3) (przed ostatni element).addSign(ostatni element)
 * 4) usunięcie ostatniego elementu  
 */


let A = new Sign({label: 'A', probability: 0.1});
let B = new Sign({label: 'B', probability: 0.05});
let C = new Sign({label: 'C', probability: 0.04});
let D = new Sign({label: 'D', probability: 0.01});
let E = new Sign({label: 'E', probability: 0.11});
let F = new Sign({label: 'F', probability: 0.19});
let G = new Sign({label: 'G', probability: 0.35});
let H = new Sign({label: 'H', probability: 0.25});

[A,B,C,D,E,F,G,H].forEach(s=> buffor.push(new ComplexSign(s)));


for (let i = buffor.length - 2; i > -1; i--) {
    buffor.sort(compareProb);
    buffor[i].addCode(1);
    buffor[i+1].addCode(0);
    buffor[i].addSign(buffor.pop());
}

[A,B,C,D,E,F,G,H].forEach(s => console.log(s));



