FROM node:12.18.3-alpine
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python git curl unzip libc6-compat
RUN npm config set unsafe-perm true
RUN npm install pm2 -g
WORKDIR /usr/src/api
COPY package.json ./
RUN npm install 
COPY . .
EXPOSE 80
CMD npm run deploy