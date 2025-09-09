FROM node:18-slim
WORKDIR /app
COPY package*.json /.
RUN npm install
COPY . .
RUN npx prisma generate 
RUN npm install --save-dev ts-node-dev
EXPOSE 3001
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "index.ts"]

