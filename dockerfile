# 使用官方 Node.js 映像作為基礎映像
FROM node:18

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 文件到容器中
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製應用程序代碼到容器中
COPY . .

# 構建應用程序
RUN npm run build

# 開放端口
EXPOSE 6666

# 啟動應用程序
CMD ["npm", "run", "dev"]
