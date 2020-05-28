# PROJET EXPRESS NODE.JS MAI

Nom du binôme :
 - DAOUDA FOFANA
 - XXXXXXX XXXXXXX

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
Normalement il faut créer une route `DELETE /authors/:id` et un formulaire avec comme seul élément visible dans la page 
le dit-bouton, qui avec la méthode `formmethod` est mis à `DELETE` (documentation [ici](https://developer.mozilla.org/fr/docs/Web/HTML/Element/button#attr-formmethod))
Ne pas oublier que durant la suppression d'un auteur, il faut supprimer aussi ses livres, ce qui peut être fait soit par un service, 
soit par le repository, il n'y a pas de règles métier particulières. On revient sur la page de liste des auteurs après la suppression.
- Étape 4 - Sur la page de détail d'un auteur, on doit pouvoir supprimer un de ses livres.
Il faut un bouton avec écrit `Delete book` après chaque livre. Même principe que pour la suppression d'un auteur pour la 
façon de faire. À la fin de la suppression on revient sur la page de détail de l'auteur.

Ne pas oublier durant les relectures de bien faire en sorte que les deux façons de faire soient homogènes.


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
