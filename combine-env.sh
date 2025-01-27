#!/bin/bash

# Define file paths
FRONTEND_ENV="./frontend/.env"
BACKEND_ENV="./backend/.env"
ROOT_ENV="./.env"

# Combine frontend and backend .env files into the root .env
echo "Combining .env files..."

# Clear existing root .env
> $ROOT_ENV

# Append frontend .env
if [ -f "$FRONTEND_ENV" ]; then
    echo "# Frontend .env" >> $ROOT_ENV
    cat $FRONTEND_ENV >> $ROOT_ENV
    echo "" >> $ROOT_ENV
else
    echo "Frontend .env not found."
fi

# Append backend .env
if [ -f "$BACKEND_ENV" ]; then
    echo "# Backend .env" >> $ROOT_ENV
    cat $BACKEND_ENV >> $ROOT_ENV
    echo "" >> $ROOT_ENV
else
    echo "Backend .env not found."
fi

echo "Combined .env file created at $ROOT_ENV"