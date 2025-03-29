#!/bin/bash

echo "--- Running index_products.py to populate ChromaDB ---"
python index_products.py

if [ $? -ne 0 ]; then
    echo "Error: Failed to run index_products.py. Exiting."
    exit 1
fi

echo "--- Starting the gRPC server ---"
python server.py