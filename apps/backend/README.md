# 🚀 Saraha Backend

The backend engine for Saraha, built with **NestJS**, **Prisma**, and **PostgreSQL**.

## 🛠 Features
- **REST API**: Clean and scalable endpoints.
- **Authentication**: JWT-based security with Argon2 and Google Social Auth.
- **Database**: Prisma ORM with automated migrations.
- **Validation**: Strict input validation using `class-validator`.

## 🚀 Getting Started

### Prerequisites
Make sure you have configured your `.env` at the root directory.

### Commands
From the project root:

| Command | Description |
| :--- | :--- |
| `nx serve backend` | Start development server |
| `nx build backend` | Build for production |
| `nx test backend` | Run unit tests |
| `nx lint backend` | Run linter |

## 🔗 Environment Variables
See the root `README.md` for the full list of required environment variables.
