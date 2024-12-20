# Use the official Node.js image as the base image
FROM node:18-alpine as builder

# Define a build argument for the environment variable
ARG NEXT_PUBLIC_SIGNALR_URL

# Set the environment variable from the build argument
ENV NEXT_PUBLIC_SIGNALR_URL=${NEXT_PUBLIC_SIGNALR_URL}

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the application code
COPY . .

# Build and export the Next.js application
RUN npm run build && npm run export

# Use a lightweight nginx image for serving the static files
FROM nginx:alpine

# Copy the static files from the builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
