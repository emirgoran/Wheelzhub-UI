# WheelzHub Documentation

This documentation provides setup instructions for two separate applications: a React frontend application and a Spring Boot API. Both are configured for easy deployment and development using Docker Compose.

## Prerequisites
- Docker
- Docker Compose

## Quick Start Guide

### Clone the Repositories
First, clone the repositories for both applications:
```bash
# Clone the React application
git clone https://github.com/emirgoran/Wheelzhub-UI


# Clone the Spring Boot API
git clone https://github.com/emirgoran/WheelzHub-API
```

To start the application:
```bash
# Start the React application
cd Wheelzhub-UI
docker-compose up -d
cd ..

# Start the Spring Boot API
cd WheelzHub-API
docker-compose up -d
cd ..
```

To stop the application:
```bash
# Stop the React application
cd Wheelzhub-UI
docker-compose down
cd ..

# Start the Spring Boot API
cd WheelzHub-API
docker-compose down
cd ..
```

### Accessing the Applications

Access the frontend at http://localhost:80  
The API will be available at http://localhost:8080  