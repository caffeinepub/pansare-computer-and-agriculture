# Pansare Computer and Agriculture App

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- A dual-purpose business app for "Pansare" covering two departments:
  1. **Computer Services** - Services offered (repair, sales, accessories, software), service request/enquiry form, product listings
  2. **Agriculture** - Agricultural products/supplies listings, crop advisory/tips, enquiry form for farming supplies
- Home/landing page with business branding (Pansare Computer and Agriculture)
- Navigation between Computer and Agriculture sections
- Contact/enquiry form for both departments
- Product/service catalog for computers and agriculture supplies
- Sample content pre-loaded for both departments
- Admin-style management: add/edit products and services

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend:
   - Data types: Product (id, name, category, description, price, department: #computer | #agriculture, imageUrl)
   - Data types: Enquiry (id, name, phone, email, message, department, timestamp)
   - Data types: ServiceRequest (id, customerName, phone, serviceType, description, status, timestamp)
   - CRUD for Products (add, update, delete, list by department)
   - CRUD for Enquiries (submit, list)
   - Service requests (submit, list, update status)
   - Pre-load sample products and services for both departments

2. Frontend:
   - Landing page with business name, tagline, and department navigation cards
   - Computer section: service list, product catalog, repair request form
   - Agriculture section: product catalog, crop tips, enquiry form
   - Shared enquiry/contact form
   - Admin panel to manage products/services
   - Responsive layout for mobile and desktop
