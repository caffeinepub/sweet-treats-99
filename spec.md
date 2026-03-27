# Sweet Treats 99

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full bakery website with soft pastel theme
- Home page with hero section and tagline "Freshly Baked Happiness Delivered"
- 3D rotating cake animation on the home page (Three.js/React Three Fiber)
- Cake catalog with sample products (name, description, price, image)
- Order form — customers can place orders with name, phone, cake selection, quantity, notes
- Customer order history (view own past orders)
- Floating WhatsApp button (placeholder number, admin-configurable)
- Contact/location section (placeholder data, admin-configurable)
- Admin panel at /admin — password protected via role-based authorization
  - Manage products (add/edit/delete cakes)
  - Manage orders (view, update status)
  - Edit business info: WhatsApp number, location, contact details
- Internet Identity login for customers and admin
- First login auto-assigns admin role to the first user (owner)

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Select authorization and blob-storage components
2. Generate Motoko backend with: products, orders, business info, and role management
3. Build React frontend with React Three Fiber 3D animation, catalog, order form, admin panel, and floating WhatsApp button
