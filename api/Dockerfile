FROM node:16-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers de dépendances et installe les modules Node
COPY package*.json ./
RUN npm install

# Copie l'ensemble des fichiers de l'application dans le conteneur
COPY . .

# Expose le port 5100 pour accéder à l'application
EXPOSE 5100

# Définit la commande par défaut pour démarrer l'application
CMD ["npm", "start"]