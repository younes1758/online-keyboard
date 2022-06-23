import json

# class
class Btn:
	def __init__(self, in_id, in_arabic, in_min_fr, in_maj_fr, in_chift_fr, in_alt_gr):
		self.id = in_id
		self.arabic = in_arabic
		self.min_fr = in_min_fr
		self.maj_fr = in_maj_fr
		self.chift_fr = in_chift_fr
		self.alt_gr = in_alt_gr

# creer la liste des boutons
list_btn = []
for i in range(86):
	list_btn.append(Btn(i+1, '', '', '', '', ''))

# lire le fichier des caractères arabic
file1 = open('arabic.txt', 'r')
lines = file1.readlines()
for i in range(86):
	list_btn[i].arabic = lines[i][0]

# lire le fichier des caractères chift-fr
file1 = open('chift-fr.txt', 'r')
lines = file1.readlines()
for i in range(86):
	list_btn[i].chift_fr = lines[i][0]

# lire le fichier des caractères min-fr
file1 = open('min-fr.txt', 'r')
lines = file1.readlines()
for i in range(86):
	list_btn[i].min_fr = lines[i][0]

# lire le fichier des caractères maj-fr
file1 = open('maj-fr.txt', 'r')
lines = file1.readlines()
for i in range(86):
	list_btn[i].maj_fr = lines[i][0]


# lire le fichier des caractères alt-gr
file1 = open('alt-gr.txt', 'r')
lines = file1.readlines()
for i in range(86):
	list_btn[i].alt_gr = lines[i][0]

# sauvegarder la liste des btns dasns fichier json
with open("caracters.json", "w") as file:
	json.dump([btn.__dict__ for btn in list_btn], file)

	