FROM node:20.12.2

WORKDIR /app

COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY . .

RUN npm i
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
