<div align="center">

# ☁️ CloudCart — Cloud-Native Enterprise E-Commerce Platform

[![Java 17](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot 3](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Security](https://img.shields.io/badge/Spring_Security-6.x-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white)](https://spring.io/projects/spring-security)
[![Angular 17](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![AWS Cloud](https://img.shields.io/badge/AWS-Cloud_Deploy-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

<p align="center">
  <b>Enterprise Full-Stack E-Commerce Ecosystem Featuring Role-Based Access Control (RBAC), Stateless JWT Security, AWS S3 Media Ingestion, and High-Performance Angular SPA</b>
</p>

---

<img src="docs/screenshots/products-catalog.png" alt="CloudCart Platform Catalog Preview" width="900" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" />

</div>

---

## 📌 Project Overview & Engineering Scope

**CloudCart** is an enterprise-grade full-stack e-commerce web platform engineered for reliability, security, and cloud scalability. 

Designed with a decoupled **Client-Server Architecture**, it pairs a high-performance **Spring Boot 3 RESTful API** backend with a modern **Angular 17 Single Page Application (SPA)** frontend. The system features stateless JWT authentication, multi-tier Role-Based Access Control (RBAC), end-to-end order lifecycle management, dynamic pagination, and cloud storage integration for product media.

---

## 🏛️ System Architecture

```mermaid
graph TD
    subgraph Client Layer [Frontend - Angular 17 SPA]
        UI[Bootstrap 5 + Modern UI Design System]
        G[Auth & Role Route Guards]
        Inter[HTTP JWT Interceptor]
        Services[Reactive Angular Services]
        UI --> G --> Inter --> Services
    end

    subgraph Security Layer [Spring Security 6]
        JWTFilter[OncePerRequest JWT Filter]
        AuthProvider[JWT Token Provider & Validator]
        SecContext[Security Context Holder]
        Services -->|Bearer Token HTTP Req| JWTFilter
        JWTFilter --> AuthProvider --> SecContext
    end

    subgraph API & Business Logic [Spring Boot 3 Backend]
        Controllers[REST Controllers: /api/*]
        ServiceLayer[Transactional Service Layer & DTO Mappers]
        SecContext --> Controllers --> ServiceLayer
    end

    subgraph Data & Cloud Infrastructure [Persistence & AWS Cloud]
        JPA[Spring Data JPA / Hibernate ORM]
        DB[(Relational Database: H2 / PostgreSQL)]
        S3[AWS S3 Cloud Media Storage]
        ServiceLayer --> JPA --> DB
        ServiceLayer -->|Product Images| S3
    end
```

---

## 🗄️ Database Entity-Relationship (ER) Schema

```mermaid
erDiagram
    USERS ||--o{ USER_ROLES : has
    ROLES ||--o{ USER_ROLES : assigned
    USERS ||--|| CARTS : owns
    CARTS ||--o{ CART_ITEMS : contains
    PRODUCTS ||--o{ CART_ITEMS : references
    CATEGORIES ||--o{ PRODUCTS : categorizes
    USERS ||--o{ ORDERS : places
    ORDERS ||--o{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : includes
    ORDERS ||--|| PAYMENTS : settled_by

    USERS {
        Long userId PK
        String username
        String email
        String password
    }
    PRODUCTS {
        Long productId PK
        String productName
        String description
        Double price
        Double discount
        Double specialPrice
        Integer quantity
        String image
    }
    ORDERS {
        Long orderId PK
        String email
        LocalDate orderDate
        Double totalAmount
        String orderStatus
    }
```

---

## 📸 Platform Visual Showcase

<table align="center">
  <tr>
    <td align="center" width="50%">
      <b>🛍️ Product Discovery & Category Navigation</b><br><br>
      <img src="docs/screenshots/products-catalog.png" width="100%" style="border-radius: 8px;" />
    </td>
    <td align="center" width="50%">
      <b>🧺 Real-Time Cart & Quantity Manager</b><br><br>
      <img src="docs/screenshots/cart.png" width="100%" style="border-radius: 8px;" />
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <b>💳 Order Checkout & Payment Summary</b><br><br>
      <img src="docs/screenshots/checkout.png" width="100%" style="border-radius: 8px;" />
    </td>
    <td align="center" width="50%">
      <b>📦 Track Orders & Shipment History</b><br><br>
      <img src="docs/screenshots/my-orders.png" width="100%" style="border-radius: 8px;" />
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <b>🛠️ Admin Product & Inventory Dashboard</b><br><br>
      <img src="docs/screenshots/admin-dashboard.png" width="100%" style="border-radius: 8px;" />
    </td>
    <td align="center" width="50%">
      <b>➕ Admin Product Publishing Workflow</b><br><br>
      <img src="docs/screenshots/admin-create-product.png" width="100%" style="border-radius: 8px;" />
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <b>🔐 Secure JWT User Login</b><br><br>
      <img src="docs/screenshots/login.png" width="100%" style="border-radius: 8px;" />
    </td>
    <td align="center" width="50%">
      <b>❤️ Wishlist & Saved Products</b><br><br>
      <img src="docs/screenshots/wishlist.png" width="100%" style="border-radius: 8px;" />
    </td>
  </tr>
</table>

---

## ✨ Key Technical Capabilities

### 1. 🛡️ Enterprise Security & Multi-Role Authorization
- **Stateless JWT Flow**: Secure login generating signed JWT tokens with customizable expiration.
- **Spring Security 6 Filter Chain**: Custom `AuthTokenFilter` intercepts requests to populate `SecurityContextHolder`.
- **Role-Based Access Control (RBAC)**:
  - `ROLE_USER`: Browse catalog, manage personal cart, wishlist, and submit orders.
  - `ROLE_SELLER` / `ROLE_ADMIN`: Create, update, delete products, manage inventory stock, and update shipment statuses.

### 2. ⚡ Modern Angular 17 Architecture
- **Standalone Components & Reactive Signals**: Optimized change detection and modular component hierarchy.
- **HTTP Interceptors**: Centralized token injection (`Authorization: Bearer <JWT>`) and automated 401/403 redirection.
- **CanActivate Route Guards**: Protects customer and admin panels against unauthorized URL navigation.
- **Dynamic Catalog Controls**: Instant category pill navigation, page size selectors, and keyword search debounce.

### 3. 📦 Business Logic & Persistence Layer
- **Transactional Consistency**: Atomic operations for order placement, stock decrement, and cart clearing using Spring `@Transactional`.
- **Automated Price Computations**: Dynamic calculation of discount deductions and special pricing.
- **Pagination & Sorting**: Spring Data JPA `Pageable` support for memory-efficient query execution.

---

## 📂 Repository Structure

```text
Cloud-ecommerce-platform/
│
├── e-commerce-backend/                # Spring Boot 3 REST API Application
│   ├── src/main/java/com/app/
│   │   ├── config/                    # Security Filter Chain & ModelMapper Config
│   │   ├── controllers/               # REST Endpoints (Auth, Cart, Orders, Products)
│   │   ├── exceptions/                # Global API Exception Handlers
│   │   ├── models/                    # JPA Entities (User, Role, Product, Cart, Order)
│   │   ├── payloads/                  # Request/Response DTOs & Validation Schemas
│   │   ├── repositories/              # Spring Data JPA Data Access Interfaces
│   │   ├── security/                  # JWT Utils, EntryPoint & AuthTokenFilter
│   │   └── services/                  # Business Logic Services & Implementations
│   ├── src/main/resources/            # Application Properties & DB Profiles
│   └── pom.xml                        # Maven Dependencies & Plugins
│
├── e-commerce-frontend/               # Angular 17 Standalone Application
│   ├── src/app/
│   │   ├── auth/                      # Login & Registration Components
│   │   ├── cart/                      # Cart Management & Quantity Controls
│   │   ├── orders/                    # Order Tracking & Checkout Flow
│   │   ├── products/                  # Catalog, Product Creation & Admin Management
│   │   ├── services/                  # Angular HttpClient API Services
│   │   └── shared/                    # Header, Footer, Route Guards & Interceptors
│   ├── angular.json                   # Angular Workspace Configuration
│   └── package.json                   # Dependencies & Scripts
│
├── docs/screenshots/                  # Platform UI Visual Assets & Demonstrations
├── eCommerce.postman_collection.json  # Comprehensive Postman Test Collection
└── README.md                          # Platform Documentation
```

---

## 💽 REST API Endpoint Reference

| HTTP Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate credentials & return JWT |
| `GET` | `/api/public/products` | Public | Fetch paginated product catalog |
| `GET` | `/api/public/categories` | Public | Fetch all product categories |
| `POST` | `/api/admin/products` | Admin / Seller | Create and publish a new product |
| `PUT` | `/api/admin/products/{id}` | Admin / Seller | Update existing product details |
| `DELETE` | `/api/admin/products/{id}` | Admin | Remove product from inventory |
| `GET` | `/api/cart` | Authenticated | Retrieve current user's shopping cart |
| `POST` | `/api/cart/products/{id}` | Authenticated | Add product to cart |
| `DELETE` | `/api/cart/{productId}` | Authenticated | Remove product from cart |
| `POST` | `/api/orders` | Authenticated | Place order & initiate checkout |
| `GET` | `/api/orders/user` | Authenticated | Fetch current user order history |
| `PUT` | `/api/admin/orders/{id}/ship` | Admin | Update shipment status to Shipped |

---

## 🚀 Local Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/code-with-apoorv/Cloud-ecommerce-platform.git
cd Cloud-ecommerce-platform
```

### 2. Run the Spring Boot Backend
```bash
cd e-commerce-backend
./mvnw clean spring-boot:run
```
*The backend REST API will initialize on `http://localhost:8080`.*

### 3. Run the Angular Frontend
```bash
cd ../e-commerce-frontend
npm install
npm start
```
*The frontend web application will launch on `http://localhost:4200`.*

### 4. API Testing with Postman
Import `eCommerce.postman_collection.json` into Postman to test pre-configured endpoints with automated JWT token passing.

---

## 🎙️ Interview Highlights & Technical Discussion Points

1. **Why Angular + Spring Boot?**
   - *"I separated concerns between a stateless Spring Boot microservice/REST backend and an Angular SPA to allow independent scaling, clear API boundaries, and high reusability for mobile or third-party clients."*
2. **How is Security Handled?**
   - *"Authentication is implemented via Spring Security 6 using stateless JWT tokens. Outgoing Angular HTTP requests pass through an Interceptor that attaches the Bearer token, while the Spring filter chain validates the token signature and sets the SecurityContext on every request."*
3. **Database Performance & Transactions**:
   - *"All order operations use `@Transactional` to guarantee atomicity between cart clearing, stock reduction, and order generation. Product lists utilize Spring Data JPA `Pageable` to prevent memory bottlenecks."*

---

## 👨‍💻 Author
**Apoorv**  
- GitHub: [@code-with-apoorv](https://github.com/code-with-apoorv)  
- Repository: [Cloud-ecommerce-platform](https://github.com/code-with-apoorv/Cloud-ecommerce-platform)
