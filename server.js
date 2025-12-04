// Load environment variables from .env file if it exists
try {
  require('dotenv').config();
} catch (e) {
  // dotenv not installed, that's okay - use command line env vars instead
}

const express = require('express');
const cors = require('cors');
const path = require('path');
const { Client, Environment } = require('square');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initialize Square client
// IMPORTANT: Set your Square Access Token as an environment variable
// For sandbox: Get from https://developer.squareup.com/apps -> Your App -> Sandbox -> Access Token
// For production: Get from https://developer.squareup.com/apps -> Your App -> Production -> Access Token
const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN || 'YOUR_SQUARE_ACCESS_TOKEN',
  environment: process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox
});

// Payment processing endpoint
app.post('/api/process-payment', async (req, res) => {
  try {
    // Check if Square Access Token is configured
    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    if (!accessToken || accessToken === 'YOUR_SQUARE_ACCESS_TOKEN') {
      return res.status(500).json({
        success: false,
        error: 'Square Access Token not configured. Please set SQUARE_ACCESS_TOKEN environment variable.'
      });
    }

    const { sourceId, amount, items, shipping } = req.body;

    if (!sourceId || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment information'
      });
    }

    // Generate a unique idempotency key to prevent duplicate charges
    const idempotencyKey = require('crypto').randomUUID();

    // Create payment request
    const requestBody = {
      sourceId: sourceId,
      amountMoney: {
        amount: amount, // Amount in cents
        currency: 'USD'
      },
      idempotencyKey: idempotencyKey,
      note: `Order from ${shipping?.name || 'Customer'}`,
      buyerEmailAddress: shipping?.email
    };

    // Process payment using Square Payments API
    const { result } = await squareClient.paymentsApi.createPayment(requestBody);

    if (result.payment) {
      const payment = result.payment;
      
      // Payment successful
      // Here you would typically:
      // 1. Save order to database
      // 2. Send confirmation email
      // 3. Update inventory
      // 4. Log the transaction
      
      // Convert BigInt to Number for JSON serialization
      const amount = payment.amountMoney?.amount 
        ? Number(payment.amountMoney.amount) 
        : null;

      res.json({
        success: true,
        paymentId: payment.id,
        status: payment.status,
        amount: amount
      });
    } else {
      // Payment failed
      const errors = result.errors || [];
      
      res.status(400).json({
        success: false,
        error: errors[0]?.detail || 'Payment failed',
        errors: errors
      });
    }
  } catch (error) {
    // Handle Square API errors
    if (error.errors && Array.isArray(error.errors)) {
      return res.status(400).json({
        success: false,
        error: error.errors[0]?.detail || 'Payment processing failed',
        errors: error.errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Payment processing failed'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve the main pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  // Server started
});

