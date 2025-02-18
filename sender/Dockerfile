FROM node:16-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json (s'ils existent) dans le conteneur
COPY package*.json ./

# Installe les dépendances définies dans package.json
RUN npm install

# Copie le reste du code de l'application dans le conteneur
COPY . .

# Expose le port 8080 pour permettre l'accès à l'application
EXPOSE 8080

# Définit la commande de démarrage de l'application
CMD ["npm", "start"]