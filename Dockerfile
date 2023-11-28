# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run
FROM node:18

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY .env .env  

RUN npm install --production

EXPOSE 3000

CMD [ "node", "dist/src/main" ]
