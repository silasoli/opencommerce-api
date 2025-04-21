# Use a imagem oficial do Node.js
FROM node:22-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Compila o projeto
RUN npm run build

# Expõe a porta que o NestJS usa (normalmente 3000)
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "run", "start:prod"]
