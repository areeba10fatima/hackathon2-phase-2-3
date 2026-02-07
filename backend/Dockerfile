# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first (faster caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project code
COPY . .

# Expose port 8000
EXPOSE 8000

# Command to run app
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
