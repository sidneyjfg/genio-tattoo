# Use a imagem oficial do Node.js
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos necessários
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Exponha a porta do backend (ajuste caso não seja 3000)
EXPOSE 3000

# Comando para rodar o servidor
CMD ["npm", "start"]
