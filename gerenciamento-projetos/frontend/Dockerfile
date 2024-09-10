FROM node:18.14-alpine
WORKDIR /frontend
COPY package*.json /frontend
RUN npm install
COPY . /frontend
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]