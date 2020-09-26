FROM node:12.18.3-alpine
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python git curl unzip libc6-compat
EXPOSE 80
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN tsc
CMD node -r ts-node/register/transpile-only -r tsconfig-paths/register /app/dist/src/server.js