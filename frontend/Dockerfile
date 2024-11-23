# Use a imagem oficial do Node.js para construir o frontend
FROM node:18 as build

# Diretório de trabalho para a build
WORKDIR /app

# Copie os arquivos necessários
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Construa o frontend
RUN npm run build

# Use uma imagem de servidor leve para servir o frontend
FROM nginx:alpine

# Copie os arquivos buildados para o diretório padrão do nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta do frontend (ajuste caso não seja 80)
EXPOSE 80

# Comando padrão do nginx
CMD ["nginx", "-g", "daemon off;"]
