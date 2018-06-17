class Sign:
    def __init__(self, element):
        self.label = element['label']
        self.probability = element['probability']
        self.code = ''

    def write(self):
        print self.label

class ComplexSign:
    def __init__(self, sign):
        self.signs = []
        self.label = sign.label
        self.probability = sign.probability
        self.signs.append(sign)

    def addSign(self, cSign):
        self.label = self.label + cSign.label
        self.signs = self.signs + cSign.signs
        self.probability = self.probability + cSign.probability

    def addCode(self, code):
        for sign in self.signs:
            sign.code = code + sign.code

buffor = []

A = Sign({'label': 'A', 'probability': '0.1'})
B = Sign({'label': 'B', 'probability': '0.05'})
C = Sign({'label': 'C', 'probability': '0.04'})
D = Sign({'label': 'D', 'probability': '0.01'})
E = Sign({'label': 'E', 'probability': '0.11'})
F = Sign({'label': 'F', 'probability': '0.19'})
G = Sign({'label': 'G', 'probability': '0.35'})
H = Sign({'label': 'H', 'probability': '0.25'})


feasibleArr = [A,B,C,D,E,F,G,H]
for sign in feasibleArr:
    buffor.append(ComplexSign(sign))


def huffman(buffor):
    for i in range(len(buffor) - 2, -1,-1):
        buffor.sort(key=lambda cSign: cSign.probability, reverse=True)
        print len(buffor[i].signs)
        buffor[i].addCode('1')
        buffor[i+1].addCode('0')
        buffor[i].addSign(buffor.pop())

huffman(buffor)

for sign in feasibleArr:
    print("Label: %s, Probability: %s, Code: %s" % (sign.label, sign.probability, sign.code))