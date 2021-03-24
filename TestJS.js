        // var nombre =81
        // var estPremier = true

        // for (var i = 2; i < nombre; i++) {
        //     console.log('valeur de i : ' + i)
        //     if (nombre % i === 0) {
        //         estPremier = false
        //         console.log('Ce nombre n\'est pas premier')
        //         console.log(nombre + ' est divisible par ' +i)
        //         break
        //     }
        //     console.log('valeur de i : ' + i)
        // }
        // if (estPremier) {
        //     console.log(nombre + ' est premier')
        // }
        // console.log("testrtbh")
        // La fonction sera utilisé pour "construire" un objet




        //     // On écriera jamais ça
        // var jean = {notes: [10, 12]} // On crée un eleve en utilisant un objet
        // jean.__proto__ = Eleve // On change le prototype
        // jean.moyenne() // 11, La méthode moyenne est disponible sur le prototype et peut donc être appellée

        var Eleve1 = {
            moyenne: function () {
                var somme = 0
                for (var i = 0; i < this.notes.length; i++) {
                    somme += this.notes[i]
                }
                return somme / this.notes.length
            }
        }
        // On peut utiliser Object.create()
        var jean1 = Object.create(Eleve1) // Crée un objet qui aura comme prototype Eleve
        jean1.notes = [10, 12]
        console.log(jean1.moyenne()) // 11
        console.log(Object.getPrototypeOf(jean1))
        console.log(Eleve1) // 11


        var Eleve = function (nom) {
            this.nom = nom // On ajoutera une propriété "nom" 
        }
        
        Eleve.prototype.moyenne = function () {
            var somme = 0
            for (var i = 0; i < this.notes.length; i++) {
                somme += this.notes[i]
            }
            return somme / this.notes.length
        }

        var jean = new Eleve('Jean') 
        jean.notes = [10, 12]
        console.log(jean.moyenne()) // 11
        console.log(Object.getPrototypeOf(jean))
        console.log(Object.getPrototypeOf(jean) === Eleve.prototype )/// true