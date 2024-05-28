const express = require("express");
const path = require("path");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const optionBd = {
    host : "localhost",
    user: "root",
    password: "",
    port: 3306,
    database : "devinette"
}

const app = express();


// Configurer le dossier des fichiers statiques
app.use('/static', express.static(path.join(__dirname, 'assets')))

// configuration de Multer pour le stocckage des fichiers
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'assets/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+path.extname(file.originalname)); // Ajoute un timestamp au nom du fichiers pour éviter les doublons
    }
});

const upload = multer({storage: storage});

// Extration des données du formulaire
app.use(express.urlencoded({extends: false}))

// Définition du middleware pour connection 
app.use(myConnection(mysql, optionBd, 'pool'));

app.post('/upload', upload.single('image'), (req, res)=>{
    let pseudo=  req.body.pseudo;
    let imageName = req.file.filename;
    if(!req.file){
        return res.send("Veuillez sélectionner un fichier à uploader")
    }
    // res.status(200).redirect('/')

    req.getConnection((erreur, connection)=>{
        if(erreur){
            console.log(erreur);
        }else{
            connection.query("INSERT INTO users(pseudo, image) VALUES(?, ?)", [pseudo, imageName], (erreur, resultat)=>{
                if(erreur){
                    console.log(erreur);
                }else{ 
                }
                res.status(200).render('jouer', {resultat})
            })
        }
    })

})

// Définition du moteur de recherche
app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/', (req, res)=>{
    req.getConnection((erreur, connection)=>{
        if(erreur){
            console.log(erreur);
        }else{
            connection.query("SELECT * FROM users", [], (erreur, resultat)=>{
                if(erreur){
                    console.log(erreur);
                }else{ 
                    res.status(200).render('index', {resultat})
                }
            })
        }
    })
    
})

app.get('/jouer', (req, res)=>{
    
    req.getConnection((erreur, connection)=>{
        if(erreur){
            console.log(erreur);
        }else{
            connection.query("SELECT * FROM users", [], (erreur, resultat)=>{
                if(erreur){
                    console.log(erreur);
                }else{ 
                }
                res.status(200).render('jouer', {resultat})
            })
        }
    })
    
})


app.get('/createCompte', (req, res)=>{
        res.status(200).render('createJoueur')
})


app.get('/listeJoueur', (req, res)=>{
    req.getConnection((erreur, connection)=>{
        if(erreur){
            console.log(erreur);
        }else{
            connection.query("SELECT * FROM users", [], (erreur, resultat)=>{
                if(erreur){
                    console.log(erreur);
                }else{ 
                    res.status(200).render('listejoueur', {resultat})
                }
            })
        }
    })
    
})

app.use((req, res)=>{
   res.status(404).render('404')
})



app.listen(3001)
console.log("Attente des requêtes au port 3001");
