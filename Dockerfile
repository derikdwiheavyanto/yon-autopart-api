# stage builder
FROM node:20-alpine as builder

WORKDIR /yon-autopart-app

COPY package*.json .
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# stage runtime
FROM node:20-alpine

WORKDIR /yon-autopart-app

COPY package*.json .

# uncomment if this production
# RUN npm install --omit=dev  
# for development
RUN npm install  

COPY --from=builder /yon-autopart-app/dist ./dist
COPY --from=builder /yon-autopart-app/prisma ./prisma
COPY --from=builder /yon-autopart-app/prisma.config.ts .


EXPOSE 3333

CMD [ "node","dist/src/server.js" ]

