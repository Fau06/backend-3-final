# 1. Usar una imagen base oficial de Node.js ligera y segura.
FROM node:18-alpine

# 2. Establecer el directorio de trabajo dentro del contenedor.
WORKDIR /usr/src/app

# 3. Copiar los archivos de dependencias para aprovechar el cache de Docker.
COPY package*.json ./

# 4. Instalar las dependencias del proyecto.
RUN npm install

# 5. Copiar el resto de los archivos de la aplicación al directorio de trabajo.
COPY . .

# 6. Exponer el puerto en el que corre la aplicación dentro del contenedor.
EXPOSE 8080

# 7. Definir el comando para ejecutar la aplicación cuando el contenedor inicie.
CMD [ "node", "src/app.js" ]