# NovaMart — Frontend Ecommerce Project

A premium, responsive ecommerce front-end built with React + Vite.

## Scope

This project is **frontend only**.

It does not contain:
- a backend server
- a database
- real authentication
- password storage
- real checkout/payment processing
- real order creation
- API calls for product/order persistence

The supplied `user_password` was intentionally **not embedded in the source code**. A real password should never be hard-coded into a frontend application.

## Features

- Responsive ecommerce landing page
- Product collection and category filtering
- Product search
- Product detail modal
- Shopping cart drawer
- Quantity controls
- Frontend-only login modal
- Dark/light visual mode
- Responsive mobile navigation
- Product data separated conceptually from UI
- Modern CSS Grid/Flexbox layout
- Accessible labels for interactive icon buttons
- Lazy-loaded product images

## Run

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

## Product data used

The primary product is the supplied Wireless Mouse data. Additional demo products were added only to make the ecommerce interface feel like a complete storefront.

## Important

`https://example.com/...` is placeholder data. The "buy" link is not connected to a real transaction.

For production, connect the UI to a backend/API for:
authentication, product inventory, users, orders, payments, and secure data storage.
