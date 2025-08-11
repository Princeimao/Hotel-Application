FROM node:18-slim
WORKDIR /app
COPY package*.json /.
RUN npm install
COPY . .
RUN npm install -g ts-node-dev
EXPOSE 3004
CMD ["ts-node-dev", "--respawn", "--transpile-only", "index.ts"]

