# Stage 1: Build the React Application
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve with Python/FastAPI (Required for Scaler OpenEnv Checks)
FROM python:3.9-slim

WORKDIR /app

# Install necessary python packages for the inference checking endpoints
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the built React UI and the checker endpoints
COPY --from=builder /app/dist ./dist
COPY inference.py .

EXPOSE 7860

# Run the python-based web server that serves both the UI and the automated checking routes
CMD ["python", "inference.py"]
