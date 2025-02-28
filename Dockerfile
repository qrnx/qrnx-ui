# Используем официальный образ Node.js
FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Копируем весь проект и собираем Next.js
COPY . .
RUN yarn build

# Открываем порт 3000
EXPOSE 3000

# Запускаем Next.js
CMD ["yarn", "start"]
