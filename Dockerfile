FROM node:10-alpine
COPY src ./src
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT ["npm", "run", "start:production"]
