# WS Node App

Đây là một ứng dụng backend được xây dựng bằng Node.js, Express.js và MongoDB, hỗ trợ quản lý người dùng, bài giảng, thông báo và tích hợp WebSocket.

## Mục lục
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Cài đặt](#cài-đặt)
- [Chạy ứng dụng](#chạy-ứng-dụng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)

## Cấu trúc thư mục
```sh
├── index.js # Điểm khởi đầu của ứng dụng 
├── config/ # Cấu hình cơ sở dữ liệu
│ ├── db.js # Kết nối MongoDB 
├── models/ # Định nghĩa các schema MongoDB 
│ ├── Lecture.js # Schema bài giảng 
├── logger.js # Cấu hình logger sử dụng Winston
├── package.json # Thông tin và dependencies của project
├── .env # Biến môi trường (bị ignore trong Git)
├── .gitignore # File ignore cho Git
```
## Cài đặt
1. Clone repository:
   ```bash
   git clone <repository-url>
   cd WS_IoT_Screening
   ```
2. Cài đặt các dependencies:     
    ```bash
    npm install
    ```
3. Tạo file .env trong thư mục gốc và thêm các biến môi trường sau:
    ```bash
    MONGO_URI=<MongoDB Connection String>
    JWT_SECRET=<JWT Secret Key>
    ```
## Chạy ứng dụng
Chế độ phát triển
Sử dụng lệnh sau để chạy ứng dụng:
    ```bash
    npm run dev
    ```
## Công nghệ sử dụng
- Node.js: Runtime chính
- Express.js: Framework backend
- MongoDB: Cơ sở dữ liệu NoSQL
- WebSocket: Giao tiếp thời gian thực
- Winston: Ghi logCông nghệ sử dụng
- Node.js: Runtime chính
- Express.js: Framework backend
- MongoDB: Cơ sở dữ liệu NoSQL
- WebSocket: Giao tiếp thời gian thực
- Winston: Ghi log