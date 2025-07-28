FROM node:18-slim
WORKDIR /app
COPY package*.json /.
RUN npm install
COPY . .
RUN npx prisma generate 
RUN npm install -g ts-node-dev
EXPOSE 3001
CMD ["ts-node-dev", "--respawn", "--transpile-only", "src/index.ts"]

