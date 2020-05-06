FROM node:14.0
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "test"]
