// Constructeur des ingrédients et ajout à la liste 
class Ingredient {
    constructor(nom, uniteMesure, quantiteUnite, quantiteLot, quantite) {
        this.nom = nom
        this.uniteMesure = uniteMesure
        this.quantiteUnite = quantiteUnite
        this.quantiteLot = quantiteLot
        this.quantite = quantite
        Ingredient.objects.push(this)
    }
}

// Création de la liste des ingrédients
Ingredient.objects = []

// Création des ingrédients
let farine = new Ingredient("Farine", "g", 63, 1000)
let oeuf = new Ingredient("Oeuf", "oeufs", 1, 12)
let lait = new Ingredient("Lait", "L", 0.25, 1)
let sucre = new Ingredient("Sucre", "g", 12.5, 1000)
let beurre = new Ingredient("Beurre", "g", 15, 1000)

// Récupération du nombre de personnes d'après l'input
let inputNbPersonnes = document.getElementById("input-nombre-personnes")
let nbPersonne = inputNbPersonnes.value

//#region Initialisation 

divIngredients = document.querySelector("div.ingredients")
CreationSpanIngredient(Ingredient.objects, divIngredients)
refreshQuantites()

//#endregion

//#region Evenements
btnGenerer = document.getElementById("btn-generer")
btnGenerer.addEventListener("click", function () {
    refreshQuantites()
});

//#endregion

//#region Fonctions

// Actualisation des quantités d'après le nombre de personnes
function refreshQuantites() {

    nbPersonne = inputNbPersonnes.value

    for (let i = 0; i < Ingredient.objects.length; i++) {
        let ingr = Ingredient.objects[i]

        ingr.quantite = ingr.quantiteUnite * nbPersonne
        ingr.quantiteCourse = Math.ceil(ingr.quantite / ingr.quantiteLot)

        let spanIngredients = document.getElementsByClassName("span-ingredient")

        for (let i = 0; i < spanIngredients.length; i++) {
            let spanIngredient = spanIngredients[i]
            let id = "span-" + ingr.nom
            if (spanIngredient.id == id) {
                spanIngredient.innerText = ingr.nom + " : " + ingr.quantite + " " + ingr.uniteMesure
            }
        }
    }
}

// Création d'un span pour chaque ingrédient
function CreationSpanIngredient(ingredientList, divIngredients) {

    for (let i = 0; i < ingredientList.length; i++) {
        let span = document.createElement("span")
        span.classList.add("span-ingredient")
        let ingr = ingredientList[i]
        let spanName = "span-" + ingr.nom
        span.id = spanName
        span.innerText = ingr.nom + " : " + ingr.quantite + " " + ingr.uniteMesure
        divIngredients.appendChild(span)
    }

}

//#endregion