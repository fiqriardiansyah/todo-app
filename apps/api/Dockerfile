FROM node:18-alpine
WORKDIR /todo-app
COPY package*.json .
COPY prisma .
RUN npm i
COPY . .
RUN npx prisma generate
CMD npm run start