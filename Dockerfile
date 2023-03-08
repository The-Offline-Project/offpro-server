FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

# RUN npm ci --only=production

EXPOSE 5000

CMD ["node", "src/server.js"]