#!/bin/bash
# Generate self-signed SSL certificate for local HTTPS development

echo "Generating self-signed SSL certificate for local development..."

# Create certs directory if it doesn't exist
mkdir -p certs

# Generate private key
openssl genrsa -out certs/key.pem 2048

# Generate certificate
openssl req -new -x509 -key certs/key.pem -out certs/cert.pem -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

echo "Certificate generated successfully!"
echo "Files created:"
echo "  - certs/key.pem (private key)"
echo "  - certs/cert.pem (certificate)"
echo ""
echo "Note: Your browser will show a security warning for self-signed certificates."
echo "This is normal for local development. Click 'Advanced' and 'Proceed to localhost' to continue."

