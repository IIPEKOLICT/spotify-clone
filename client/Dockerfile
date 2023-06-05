FROM node:18-alpine
WORKDIR /app/client
ENV PATH /app/client/node_modules/.bin:$PATH
COPY package.json /app/client/package.json
COPY package-lock.json /app/client/package-lock.json
RUN npm ci --silent
COPY . /app/client
CMD ["npm", "start"]
