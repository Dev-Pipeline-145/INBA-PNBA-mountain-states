# Square Payment Integration Setup Guide

This guide will help you set up Square payment processing for the shop page.

## Prerequisites

1. A Square account (sign up at https://squareup.com)
2. A Square Developer account (sign up at https://developer.squareup.com)
3. A backend server to process payments securely

## Step 1: Get Your Square Application ID

1. Go to https://developer.squareup.com/apps
2. Sign in or create a Square Developer account
3. Click "New Application"
4. Fill in your application details
5. After creating the app, you'll see your **Application ID** (also called Application ID)
6. Copy this ID

## Step 2: Get Your Square Location ID

1. In your Square Developer Dashboard, go to your application
2. Navigate to the "Locations" section
3. You'll see your **Location ID**
4. Copy this ID

## Step 3: Update the JavaScript Configuration

Open `/src/assets/js/shop.js` and update these lines:

```javascript
// Replace these with your actual Square credentials
this.squareApplicationId = 'YOUR_SQUARE_APPLICATION_ID';
this.squareLocationId = 'YOUR_SQUARE_LOCATION_ID';
```

## Step 4: Set Up Backend Payment Processing

**IMPORTANT:** Square requires server-side payment processing for security. You cannot process payments directly from the browser.

### Create a Backend Endpoint

You need to create a backend endpoint at `/api/process-payment` that:

1. Receives the payment token from the frontend
2. Uses Square's Payments API to process the payment
3. Returns success/failure status

### Example Backend Implementation (Node.js/Express)

```javascript
const express = require('express');
const { Client, Environment } = require('squareup');

const app = express();
app.use(express.json());

// Initialize Square client
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN, // Get from Square Dashboard
  environment: Environment.Sandbox // Use Environment.Production for live
});

app.post('/api/process-payment', async (req, res) => {
  try {
    const { sourceId, amount, items, shipping } = req.body;

    // Create payment request
    const requestBody = {
      sourceId: sourceId,
      amountMoney: {
        amount: amount, // Amount in cents
        currency: 'USD'
      },
      idempotencyKey: require('crypto').randomUUID()
    };

    // Process payment
    const response = await client.paymentsApi.createPayment(requestBody);

    if (response.result.payment) {
      // Payment successful
      // Here you would typically:
      // 1. Save order to database
      // 2. Send confirmation email
      // 3. Update inventory
      
      res.json({
        success: true,
        paymentId: response.result.payment.id
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Payment failed'
      });
    }
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Payment processing failed'
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Get Your Square Access Token

1. Go to https://developer.squareup.com/apps
2. Select your application
3. Go to "Credentials" or "OAuth"
4. Generate an access token
5. **Keep this secret!** Store it as an environment variable

## Step 5: Environment Setup

### For Development (Sandbox)

The code currently uses Square's sandbox environment for testing. Use these test card numbers:

**Visa (Successful Payment):**
- **Card Number:** `4111 1111 1111 1111`
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **ZIP:** Any 5 digits

**Mastercard (Successful Payment):**
- **Card Number:** `5105 1051 0510 5100`
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **ZIP:** Any 5 digits

**Discover (Successful Payment):**
- **Card Number:** `6011 0000 0000 0004`
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **ZIP:** Any 5 digits

**American Express (Successful Payment):**
- **Card Number:** `3400 0000 0000 009`
- **CVV:** Any 4 digits
- **Expiry:** Any future date
- **ZIP:** Any 5 digits

**Note:** Square's test card numbers may change. For the most up-to-date test cards, visit: https://developer.squareup.com/docs/devtools/sandbox/payments

### For Production

1. Change the Square SDK URL in `shop.html`:
   ```html
   <!-- Change from sandbox to production -->
   <script type="text/javascript" src="https://web.squarecdn.com/v1/square.js"></script>
   ```

2. Update your backend to use `Environment.Production`

3. Update your Square Application ID and Location ID to production values

## Step 6: Testing

1. Add items to cart
2. Click "Checkout"
3. Fill in shipping information
4. Use one of the test cards listed above (e.g., Visa: `4111 1111 1111 1111`)
5. Complete payment

**Important:** 
- Test cards only work in the Sandbox environment
- Use any future expiration date
- Use any valid CVV (3 digits for most cards, 4 digits for Amex)
- Use any 5-digit ZIP code
- If test cards aren't working, verify you're using the Sandbox environment and check Square's latest documentation

## Security Notes

- **Never** expose your Square Access Token in frontend code
- Always process payments on the backend
- Use HTTPS in production
- Validate all input data on the backend
- Implement proper error handling
- Log payment attempts for auditing

## Additional Resources

- [Square Web Payments SDK Documentation](https://developer.squareup.com/docs/web-payments/overview)
- [Square Payments API Documentation](https://developer.squareup.com/reference/square/payments-api)
- [Square Developer Dashboard](https://developer.squareup.com/apps)

## Troubleshooting Test Cards

If test card numbers are not working:

1. **Verify Sandbox Environment**: Ensure your Square client is configured for Sandbox:
   ```javascript
   environment: Environment.Sandbox
   ```

2. **Check Latest Test Cards**: Square may update test card numbers. Always check the official documentation:
   - https://developer.squareup.com/docs/devtools/sandbox/payments

3. **Verify HTTPS**: Square Web Payments SDK requires HTTPS. For local development:
   - Use `https://localhost:3443` (after running `./generate-cert.sh`)
   - Or use ngrok: `ngrok http 3000`

4. **Check Browser Console**: Look for errors in the browser developer console

5. **Verify Credentials**: Ensure your Square Application ID and Location ID are correct for the Sandbox environment

6. **Check Backend Logs**: Review server logs for payment processing errors

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check your backend server logs
3. Review Square's API documentation: https://developer.squareup.com/docs/devtools/sandbox/payments
4. Contact Square support if needed




