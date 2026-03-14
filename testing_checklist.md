# Testing Checklist: COD Currency Workaround

Follow these steps to verify that the Cash on Delivery (COD) currency workaround is functioning correctly.

### 1. Storefront Testing
1. **Change Locale:** Go to the storefront and switch to a non-EUR currency (e.g., Polish / PLN).
2. **Add to Cart:** Add any product to the cart and open the cart drawer.
3. **Verify Cart Total:** Note the total displayed in the cart drawer (e.g., `362,07 PLN`).
4. **Checkout:** Click the "Checkout" button.
5. **Network Inspection (Optional but recommended):**
   - Open your browser's Developer Tools (Network tab).
   - Look for a `POST` request to `/cart/update.js` immediately after clicking checkout.
   - Inspect the Payload/Body of this request. You should see `attributes[customer_presentment_total_raw]` with the value `362,07 PLN` (or similar).
6. **Complete Order:** Proceed through checkout using the "Cash on Delivery" (manual) payment method.

### 2. Admin Verification (GraphQL)
Once the order is placed, use the Shopify Admin GraphQL App (or a tool like Postman) to query the order attributes. Replace `gid://shopify/Order/1234567890` with your actual Order ID (you can find this ID in the URL when viewing the order in the Shopify Admin).

```graphql
query CheckCODCustomAttributes {
  order(id: "gid://shopify/Order/1234567890") {
    name
    totalPriceSet {
      presentmentMoney {
        amount
        currencyCode
      }
      shopMoney {
        amount
        currencyCode
      }
    }
    customAttributes {
      key
      value
    }
  }
}
```

**Expected Result in `customAttributes`:**
You should see the following keys indicating the script successfully captured the storefront data:
- `customer_presentment_currency`: e.g., "PLN"
- `customer_presentment_total`: e.g., "362.07"
- `customer_presentment_total_raw`: e.g., "362,07 PLN"
- `shop_currency`: "EUR"

If these attributes are present, your backend systems or manual packing slips can now read exactly what the customer saw, even if Shopify finalizes the order in EUR.
