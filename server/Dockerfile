# Stage 1: Build the application
FROM node:22 AS build

# Set the working directory
WORKDIR /app

# Copy only necessary files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files (e.g., source, Prisma schema)
COPY . .

# Generate Prisma client for the correct binary targets
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:22 AS production

# Set the working directory
WORKDIR /app

# Copy only the built application and runtime dependencies
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/package.json /app/package.json

# Run the application
CMD ["node", "dist/src/index.js"]