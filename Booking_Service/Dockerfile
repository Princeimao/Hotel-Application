FROM node:18-slim
WORKDIR /app
COPY package*.json /.
RUN npm install
COPY . .
RUN npm install --save-dev ts-node-dev
EXPOSE 3004
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "index.ts"]

