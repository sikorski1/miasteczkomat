# Use an official Python image as the base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Copy the startup script
COPY start.sh .

# Make the startup script executable
RUN chmod +x start.sh

# Expose the port that the gRPC server will run on
EXPOSE 50050

# Set the default command to run the startup script
CMD ["./start.sh"]