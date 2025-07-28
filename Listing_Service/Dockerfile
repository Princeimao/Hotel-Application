FROM node:18-slim
WORKDIR /app
COPY package*.json /.
RUN npm install
COPY . .
RUN npm install -g ts-node-dev
EXPOSE 3003
CMD ["ts-node-dev", "--respawn", "--transpile-only", "src/index.ts"]

