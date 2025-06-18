#!/bin/bash

# Install dependencies
npm install

# Create necessary directories
mkdir -p public/images
mkdir -p app/api
mkdir -p lib/ai
mkdir -p lib/encryption
mkdir -p lib/geo

# Download Leaflet marker icons
curl -o public/images/marker-icon.png https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png
curl -o public/images/marker-icon-2x.png https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png
curl -o public/images/marker-shadow.png https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png

# Create .env.local file
echo "NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here" > .env.local

# Create .gitignore
echo "node_modules/
.next/
.env.local
.DS_Store" > .gitignore

echo "Setup complete! You can now run 'npm run dev' to start the development server." 