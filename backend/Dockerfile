# Use an official Node.js runtime as a parent image
FROM node:latest

# Set environment variable to bind to 0.0.0.0
ENV HOST 0.0.0.0

# Set the working directory
WORKDIR /app

# Create uploads directory and set permissions
RUN mkdir uploads && chown node:node uploads

# Copy package files and install dependencies
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

# Install Python and required packages
RUN apt-get update && \
    apt-get install -y python3-dev python3-pip && \
    python3 -m pip install -r requirements.txt --break-system-packages

# Install Node.js dependencies
RUN npm install

# Expose the port
EXPOSE 4000

# Set health check
HEALTHCHECK --interval=1m --timeout=3s --start-period=15s \
  CMD curl -fs http://localhost:4000/healthcheck || exit 1

# Start the application
CMD ["npm", "run", "start"]