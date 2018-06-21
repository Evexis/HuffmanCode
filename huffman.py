class Sign:
    def __init__(self, element):
        self.label = element['label']
        self.probability = element['probability']
        self.code = ''

    def write(self):
        print(self.label)

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


plik = open('huff.txt')
try:
	tekst = plik.read()
finally:
	plik.close()

print("Wczytuje z pliku: ",tekst)
liczba_znakow = len(tekst)

Dict = {}
for x in tekst:
    if x in Dict:
        temp = Dict[x]
        Dict[x] = temp + 1
    else:
        Dict[x] = 1


print("Liczba znakow ogolem: ", liczba_znakow)
print("Liczba wystapien: ", Dict)
print("Liczba znakow: ", len(Dict))

Dict2 = {}
for x in Dict:
    Dict2[x] = Dict[x] / liczba_znakow


feasibleArr = []

for x in Dict2:
    feasibleArr.append(Sign({'label': x, 'probability': Dict2[x]}))


for sign in feasibleArr:
    buffor.append(ComplexSign(sign))


def huffman(buffor):
    for i in range(len(buffor) - 2, -1,-1):
        buffor.sort(key=lambda cSign: cSign.probability, reverse=True)
        #print(len(buffor[i].signs))
        buffor[i].addCode('1')
        buffor[i+1].addCode('0')
        buffor[i].addSign(buffor.pop())

huffman(buffor)

for sign in feasibleArr:
    print("Label: %s, Probability: %s, Code: %s" % (sign.label, sign.probability, sign.code))