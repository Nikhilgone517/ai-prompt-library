# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your Angular code
COPY . .

# Expose the Angular port
EXPOSE 4200

# Start the Angular development server
# (--host 0.0.0.0 allows the container to be accessed from your browser)
CMD ["npx", "@angular/cli@14", "serve", "--host", "0.0.0.0"]