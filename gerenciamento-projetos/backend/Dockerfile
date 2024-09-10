FROM node:18.19-alpine
WORKDIR /backend
COPY package*.json /backend
RUN npm install
COPY . /backend
EXPOSE 3001
RUN npm run build
ENTRYPOINT [ "npm", "run", "start" ]