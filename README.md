# Mon Forum Anonyme

Ce projet est un forum anonyme déployé avec Docker et Docker Compose.

## Services

- **API**: Service Node.js/Express qui gère la création et la récupération des messages.
- **DB**: Base de données PostgreSQL utilisée par l'API.
- **Thread**: Service affichant les messages via une interface web sur le port 80.
- **Sender**: Service permettant de poster des messages via une interface web sur le port 8080.

## Lancer le projet

Assurez-vous d'avoir Docker et Docker Compose installés.

Dans le répertoire du projet, lancez la commande suivante :

```bash
docker-compose up --build
```
