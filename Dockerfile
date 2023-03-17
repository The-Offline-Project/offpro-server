FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

# RUN npm ci --only=production


ENV NODE_ENV=production
ENV DB_USER=root
ENV DB_PASSWORD=root
ENV OAUTH_CLIENTID=344032536233-dt1m4fru8kjs1g8aj76sc1usfm01i7aq.apps.googleusercontent.com
ENV OAUTH_CLIENT_SECRET=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
ENV OAUTH_REFRESH_TOKEN=1//04va1MamqvcQnCgYIARAAGAQSNwF-L9IrL6UrnthG6rLL2vh6odDSocvuj78isOaetu3dUfi3Ry9y4qMYZ68KlPyzbgVWT1Cfli8
ENV MAIL_PASSWORD=tgfvckomyadtxfop
ENV MAIL_USERNAME=blinkztyler@gmail.com
ENV  JWT_SECRET=BeBNuHjmsXNoUGjekeLIztJi2ykAIR8aefOv7FIyURUb4m6I2dRUQ53uT71ohGk1
ENV  TWILIO_ACCOUNT_SID=ACcda791381d569747b33c5568bedfd11a
ENV  TWILIO_AUTH_TOKEN=2b07209d80c907243263a46a722d33ba
ENV  TWILIO_SERVICE_ID=VAd5df8e634ec0fe9c775db69c99e45563

EXPOSE 5000

CMD ["node", "src/server.js"]