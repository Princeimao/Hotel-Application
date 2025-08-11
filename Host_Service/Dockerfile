FROM node:18-slim
WORKDIR /app
COPY package*.json /.
RUN npm install
COPY . .
RUN npx prisma generate 
RUN npm install -g ts-node-dev
EXPOSE 3002
CMD ["ts-node-dev", "--respawn", "--transpile-only", "index.ts"]

