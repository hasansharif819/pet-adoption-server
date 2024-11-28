# Pet Adoption Platform

This repository contains the source code for a Pet Adoption Platform, which is a web application designed to facilitate the adoption of pets. Users can register, login, add pets for adoption, submit adoption requests, and manage their profiles. This platform aims to connect pet lovers with pets in need of a loving home.

### Live API Link : [Link](https://pet-adoption-platform-server-smoky.vercel.app)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Pet Adoption Platform is a web application built using TypeScript, Express.js, Prisma with PostgreSQL for database management, and JSON Web Tokens (JWT) for user authentication. It provides a user-friendly interface for pet adoption enthusiasts to browse pets available for adoption, submit adoption requests, and manage their profiles.

## Features

- User registration and authentication
- Pet listing with detailed information
- Adoption request submission
- Profile management for users
- Error handling for various scenarios
- Pagination and filtering for pet listings
- Role-based access control (future enhancement)

## Technologies

- **TypeScript:** TypeScript is used as the primary programming language for type safety and enhanced developer experience.
- **Express.js:** Express.js is utilized as the web application framework for handling HTTP requests and routing.
- **Prisma:** Prisma is employed as the ORM (Object-Relational Mapping) tool to interact with the PostgreSQL database.
- **PostgreSQL:** PostgreSQL serves as the relational database management system for storing application data.
- **JSON Web Tokens (JWT):** JWT is used for user authentication and authorization purposes, providing secure access to protected endpoints.

## Getting Started

### Prerequisites

Ensure you have the following software installed on your local machine:

- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Installation

1. Clone the repository:

```
git clone <repository-url> cd pet-adoption-platform
```

2. Install dependencies:

```
npm install
```

3. Set up the PostgreSQL database:

   `# Create a new PostgreSQL database createdb pet_adoption_db`

4. Set up environment variables:

   `# Create a .env file in the project root directory touch .env`

- Inside the `.env` file, add the following environment variables:
  `DATABASE_URL="postgresql://username:password@localhost:5432/pet_adoption_db" JWT_SECRET="your_jwt_secret"`

Replace `username` and `password` with your PostgreSQL credentials, and `your_jwt_secret` with your desired JWT secret key.

5. Run database migrations:

```
npx prisma migrate dev
```

6. Start the development server:

```
npm run dev
```

The server will start running at `http://localhost:3000`.

## Usage

To use the Pet Adoption Platform, you can access the various endpoints described in the API documentation. Make sure to include the necessary authorization headers (JWT token) for protected endpoints.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.

## License

This project is licensed under the MIT License.
