FROM node:18
ENV HOST 0.0.0.0
ENV WDS_SOCKET_PORT 80
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 3000
CMD ["npm", "run", "start"]