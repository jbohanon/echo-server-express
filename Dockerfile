FROM node:alpine
WORKDIR /usr/app
COPY . .
RUN npm install
COPY . .
CMD ["npm", "run", "start-prod"]
