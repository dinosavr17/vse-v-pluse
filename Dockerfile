# Use an official Node.js runtime as the base image
FROM node:16.15.1-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Expose port 8080
EXPOSE 8080

# Set environment variable for backend IP address
ENV REACT_APP_BACKEND_IP=localhost:8081

# Build the React app for development
RUN npm run build-dev

# Set the command to run when the container starts
CMD [ "npm", "start" ]
