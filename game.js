import {User} from './user.js';

class Game{
   
    jouer(){
        let reponse = ''
        // récuperer l'index du tableau de façon aléatoire
        let index = Math.floor(Math.random()*listeMots.length);

        let motAjouer = listeMots[index];

        let milieu = motAjouer.substring(3,motAjouer.length-1);
        // le mot cacher
        let aDeviner = "***"+milieu+"*"
        motValue.innerText = aDeviner;

        reponse += reponseInput.value;
        
        // S'il trouve le mot, son score augmente de 1 sinon il n'augmente pas
        if(motAjouer.toLowerCase() == reponse.toLowerCase()){
            return true        
        }else{
            
            return false
        }
    }

    async listeMots(){
        const reponseListeMots = await fetch('ListeMots.json');
        return reponseListeMots.json();
    }
}

const game = new Game();
const user = new User();

const listeJoueurs = await user.listeJoueur();

console.log(listeJoueurs[0]['score'] - 50)

// Recuperer la liste des mots en format Json
const listeMots = await game.listeMots()

let motValue = document.getElementById("mot");
let reponseInput = document.getElementById("reponse");

let start = document.querySelector(".start");
start.addEventListener('click',()=>{
    
    // const user = new User();
    if(game.jouer()===true){
        console.log("Vous  avez trouver le mot")
    }else{
        console.log("*** ahhhh tu as perdus ********");
    }
})

// *****************************************************************************

const divS4 = document.querySelector('div.s4');


