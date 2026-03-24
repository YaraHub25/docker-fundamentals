# Use a lightweight Node.js base image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first (layer caching — only reinstalls if these change)
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy the rest of the application source
COPY . .

# Expose the port the app listens on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]