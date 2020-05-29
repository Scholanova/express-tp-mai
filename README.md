# PROJET EXPRESS NODE.JS MAI

Nom du binôme :
 - Michel Aurélien
 - Diard Loic

## CONSIGNES GÉNÉRALES  
Le projet correspondant aux cours du 28 et 29 mai 2020. 
Il fait suite aux projets express du 16 et 17 avril, 20 et 21 février et 19 et 20 mars.

NPM doit être installé sur votre machine, ainsi que Postgres.

Il vous faut cloner le repository, créer une branche au nom des deux membres du binôme sous le format `nom-prenom+nom-prenom`.

Chaque membre du binôme prend une étape, et créé une branche sous le format `nom-prenom+nom-prenom/etape-XX` ou XX est 
le numéro de l'étape.

Commitez à au cours de la conception de votre étape. À la fin du développement de l'étape, ouvrez une Pull-Request, 
et demandez à votre binôme de vous faire une revue de code. Prenez en compte ses remarques puis fusionnez la pull request.
Repartez ensuite de branche `nom-prenom+nom-prenom` pour créer une nouvelle branche `nom-prenom+nom-prenom/etape-XX`. 

Vous êtes libre pour les messages de commit. Cependant rappelez-vous qu'ils peuvent aider votre binôme, 
donc faites des messages cohérents et lisibles.

Les fonctionnalités doivent être testées et les tests doivent passer pour fusionner la branche, en tant que relecteur, 
n'oubliez pas de relire les tests.

## PRÉREQUIS 
- Savoir utiliser npm
- Comprendre le JS
- Connaissance d'Express, de EJS et de Sequelize 

## PARTIE 0 - VERIFICATION QUE LE PROJET TOURNE ET QUE LES OUTILS SONT MAÎTRISÉS
- Cloner le projet
- Installer les dépendances avec `npm install`
- Initialiser le projet avec `npm run db:init`, `npm run db:migrate`, `npm run db:seed` et `npm run db:test:init`
- Lancer les tests avec `npm test` et verifier qu'ils passent tous
- Lancer le server avec `npm start` et verifier qu'il se lance sur le port 3000
- Lancer le server de dev avec `npm run start:dev` et verifier qu'il se lance le port 3000
- Créez une branche `nom-prenom+nom-prenom/etape-0` (voyez avec votre binôme pour que lui crée la branche 
`nom-prenom+nom-prenom/etape-0-bis`).
- Commitez en remplaçant dans le readme un des "XXXXXXX XXXXXXX" par votre nom et prénom, puis poussez sur Origin. 
- Ouvrez une Pull Request sur github, depuis votre branche `nom-prenom+nom-prenom/etape-0` vers `nom-prenom+nom-prenom`.
- Faitez que votre binôme fasse la revue de votre branche, et la fusionne. Faites de même pour la sienne.
 Il risque d'y avoir un conflit, vous pouvez alors soit faire une fusion de `nom-prenom+nom-prenom` dans `nom-prenom+nom-prenom/etape-0-bis`
ou rebase `nom-prenom+nom-prenom/etape-0-bis` sur `nom-prenom+nom-prenom` (en supposant que `nom-prenom+nom-prenom/etape-0`
 aie été la branche fusionnée en premier)
 

## PARTIE 1 - PETITS AJOUTS POUR COMMENCER
Le projet est le même qu'en avril, jusqu'à la partie 3. Il existe des auteurs, que l'on peut créer, lister et afficher.
Ces auteurs ont des livres, qui sont affichés sur la pages des auteurs, et on peut en rajouter de nouveaux depuis la 
page de détails d'un auteur. 

- Étape 1 - Lorsqu'un auteur n'a pas de pseudo, sur la vue de liste (`/authors`), s'affiche `()`, 
il faudrait que cela ne s'affiche pas. Lorsque l'auteur a un pseudo, rien ne change.
- Étape 2 - Lorsqu'un auteur n'a pas de pseudo, sur la vue de détail (`/authors/:id`), s'affiche `Pseudo: `,
il faudrait que la ligne ne s'affiche pas. Lorsque l'auteur a un pseudo, rien ne change.

## PARTIE 2 - UN PEU PLUS GROS 
- Étape 3 - Sur la page de détail d'un auteur, on doit pouvoir supprimer un auteur. 
Il faut un bouton avec écrit `Delete author` et le positionner après la langue et avant la liste des livres.
Normalement il faut créer une route `DELETE /authors/:id` et un bouton qui appelle cette route (voir l'aide plus bas dans ce readme)
Ne pas oublier que durant la suppression d'un auteur, il faut supprimer aussi ses livres, ce qui peut être fait soit par un service, 
soit par le repository, il n'y a pas de règles métier particulières. On revient sur la page de liste des auteurs après la suppression.
- Étape 4 - Sur la page de détail d'un auteur, on doit pouvoir supprimer un de ses livres.
Il faut un bouton avec écrit `Delete book` après chaque livre. Même principe que pour la suppression d'un auteur pour la 
façon de faire. À la fin de la suppression on revient sur la page de détail de l'auteur.

Ne pas oublier durant les relectures de bien faire en sorte que les deux façons de faire soient homogènes.

## PARTIE 3 - LES CHOSES SÉRIEUSES
Cette étape est conçue pour qu'il y ait des conflits. N'hésitez pas à communiquer à l'avance avec votre binôme sur
l'architecture de la solution et pour l'ordre de fusion des branches. 

- Étape 5 - Rajouter une règle qui empêche un auteur d'avoir plus de 5 livres différents.
    - C'est une règle de validation à mettre au niveau du service.
    - L'erreur doit apparaître au niveau du formulaire de création de livre.
- Étape 6 - Rajouter une règle qui empêche un auteur deux fois un livre avec le même titre.
    - C'est une règle de validation à mettre au niveau du service.
    - L'erreur doit apparaître au niveau du formulaire de création de livre.
    
## PARTIE 4 - TRAVAIL SUR LA BASE DE DONNÉE
- Étape 7 - Rajouter une page qui affiche tous les livres écrits dans une certaine langue
 (c'est-à-dire dont l'auteur écrit dans la langue en question).
    - Il faut mettre en place une règle au niveau du service pour remonter une erreur si la langue n'est pas `french` ou `english`
    - Le repository devra faire un inner-join pour remonter les livres en question.
    - Il faut qu'il y ait une page à part (/books/filter) avec un formulaire pour renseigner la langue.
- Étape 8 - Rajouter l'information de nombre de pages sur un livre.
    - Cette information est obligatoire et un nombre entier strictement supérieur à zéro.
    - Il faut penser à faire une migration avec un nombre par défaut pour les livres existants en base de donnée.
    - Cette information doit être affichée au niveau du titre de l'ouvrage dans la page de détail d'un auteur.

## AIDE POUR LA MIGRATION DE BASE DE DONNÉES

Pour créer une nouvelle migration faites la commande suivante :
 
`$ npx sequelize migration:create --name <le nom de votre migration>`

Voici un exemple de migration pour l'ajout d'une colonne sur la table `Person`. 
```javascript
module.exports = {
  up: (queryInterface, Sequelize) => {
        queryInterface.addColumn('Person', 'petName', {
          type: Sequelize.DataTypes.STRING
        })
    }
  },
  down: (queryInterface, Sequelize) => {
        queryInterface.removeColumn('Person', 'petName')
  }
};
```

## AIDE POUR L'ASSOCIATION ENTRE DEUX MODELES

Exemple pour ajouter une clé externe à un nouveau modèle durant une migration.
```javascript
return queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      personId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Persons',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
```

Pour associer ces deux modèles Sequelize, il faut signifier à Sequelize comment ces deux modèles sont liés l'un avec
l'autre. Pour cela on va lier les deux modèles au travers d'associations ([Doc](https://sequelize.org/v5/identifiers.html#associations)).
```javascript
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    name: DataTypes.STRING
  }, {});
  Person.associate = function(models) {
    // associations can be defined here
    Person.hasMany(models.Pet, {foreignKey: 'personId', sourceKey: 'id'});
  };
  return Person;
};

module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    name: DataTypes.STRING
  }, {});
  Pet.associate = function(models) {
    // associations can be defined here
    Pet.belongsTo(models.Person, {foreignKey: 'personId', sourceKey: 'id'});
  };
  return Pet;
};
```
On pourra alors créer des objets `Pet` appartenant à une `Person`.
```javascript
return Pet.create({ name: 'Rex', Person: somePersonInstance }, { include: Person })
// Returns a Pet

return person.createPet({
          name: 'Awesome!'
        })
// Returns a person
```
Pour récupérer les objets au travers de leurs associations, il y a plusieurs méthodes.
```javascript
return pet.getPerson() 
// returns the person instance associated with the pet

return person.getPets() 
// returns all the pets associated with the person

return Pet.findAll({ where: { personId: id } })
// Returns the pets associated with the person
```

## AIDE POUR INSPECTER UN SCHEMA POSTGRES

En se connectant au terminal distant du server de la base de donnée postgres, on peut récupérer
des informations sur le schéma exact d'une table donnée en entrant la commande suivante:
`$ \d "<nom de la table>"` 

## AIDE POUR EFFECTUER UNE REQUÊTE DELETE

Les requêtes HTTP du type `DELETE` ne sont pas permises au travers d'un formulaire html. 
Cependant, il est possible de les faire au travers d'un peu de javascript, comme suit :

```html
<button onclick = "deleteAuthorById(<%= author.id %>)" %> > Delete </button>
<script>
function deleteAuthorById (authorId) {
  fetch(`/authors/${authorId}`, { method: 'DELETE' })
}
</script>
```
