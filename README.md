<!-- markdownlint-disable MD033 MD041 MD013 -->
<div align="center">

# Stockify API ✨

**The high-performance inventory management backbone for modern enterprises.**

Built with a lightning-fast runtime and type-safe orchestration for real-time stock integrity.

[![Bun](https://img.shields.io/badge/Runtime-Bun-fbf0df?style=flat&logo=bun&logoColor=fbf0df&labelColor=333333)](https://bun.sh/)
[![ElysiaJS](https://img.shields.io/badge/Framework-ElysiaJS-7c3aed?style=flat&logo=elysia&logoColor=white&labelColor=333333)](https://elysiajs.com/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2d3748?style=flat&logo=prisma&logoColor=white&labelColor=333333)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169e1?style=flat&logo=postgresql&logoColor=white&labelColor=333333)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?style=flat&logo=typescript&logoColor=white&labelColor=333333)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Infra-Supabase-3ecf8e?style=flat&logo=supabase&logoColor=white&labelColor=333333)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-97ca00?style=flat&labelColor=333333)](https://opensource.org/licenses/MIT)

</div>

---

> **Note**
>
> **Production-Ready Inventory Engine**
>
> This is a robust, type-safe implementation of an Inventory Management API. Built with the **Stockify Architecture** in mind, it provides atomic transactions, strictly validated data flows, and automated OpenAPI documentation.
>
> **Perfect for:** Enterprise-grade stock tracking, real-time retail backends, and high-concurrency business intelligence applications.

---

**Stockify API provides the reliable engine behind retail stability**, ensuring atomic data consistency, reactive stock adjustments, and seamless integration for frontend consumers.

The [Inventory Logic](https://github.com/AlphsX/Stockify-API/blob/main/src/routes/inventory.ts) is designed for precision. This implementation leverages Prisma ORM and Elysia's type-box validation to ensure every stock movement is calculated with 100% accuracy.

```typescript
// Core Inventory Logic: Atomic Stock Adjustment
.patch(
  "/:id/adjust",
  async ({ params, body, set }) => {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      set.status = 404;
      return { message: "Product not found" };
    }

    const newQuantity = product.quantity + body.change;

    // Zero-Floor Validation
    if (newQuantity < 0) {
      set.status = 400;
      return { message: "Insufficient stock" };
    }

    return await prisma.product.update({
      where: { id: params.id },
      data: { quantity: newQuantity },
    });
  }
)
```

## 📋 Table of Contents

- [What is Stockify API?](#what-is-stockify-api)
- [Why This Engine?](#why-this-engine)
- [System Capabilities](#system-capabilities)
- [Backend Architecture](#backend-architecture)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Engineering & Expertise](#engineering--expertise)
- [License](#license)

## What is Stockify API?

Stockify API is a specialized data orchestration layer designed for **Modern Retail** infrastructures. It focuses on:

- **Lightning Performance**: Leveraging the Bun runtime for sub-millisecond response times.
- **Strict Validation**: Utilizing TypeBox for zero-garbage data ingestion.
- **Relational Integrity**: Powered by Prisma and PostgreSQL for complex business logic.
- **Auto-Documentation**: Integrated Swagger/OpenAPI for developer productivity.

The system acts as the "Source of Truth" for your inventory, ensuring that even under high load, your stock levels remain synchronized across all channels.

### Key Concepts

- **Prisma Client**: Type-safe database access with custom-generated client modules.
- **Elysia Routing**: High-performance endpoint management with built-in CORS and OpenAPI support.
- **Adaptive Sorting**: Dynamic query resolution for optimized data retrieval.
- **Stock Guard**: Intellectual logic that prevents deletion of items with remaining inventory.

## Why This Engine?

This API handles the complex state and concurrency of retail stocks while maintaining a premium developer experience.

🚀 **High-Performance**: Powered by Bun—the fastest JS runtime available.  
🛡️ **Type-Safe**: End-to-end TypeScript types shared from DB to Route handlers.  
📦 **Modular**: Clean separation between database schemas, server initialization, and business routes.  
🧬 **Maintainable**: Uses clean code patterns with instructional Thai comments for education.  
🔒 **Atomic**: Ensures stock adjustments are handled with precision logic.

## System Capabilities

### Inventory Core Logic

- **Smart Filtering**: Built-in logic for `low_stock` alerts and dynamic sorting.
- **Relational Mapping**: Snake_case database mapping with CamelCase code access.
- **Validation Layer**: Strict string length and numeric range checks on all inputs.
- **Safety Locks**: Prevents data loss by restricting deletion of active stock.

### Technical Stack Features

- 🎯 **OpenAPI v3**: Interactive developer playground at `/swagger`.
- 🐘 **Supabase Integration**: Managed PostgreSQL with high availability.
- 🛠️ **Prisma Adapter**: Native PostgreSQL adapter for optimized pooling.
- 🌍 **Dynamic CORS**: Pre-configured for GitHub Codespaces and local development.

## Backend Architecture

```text
Stockify-API/
├── prisma/
│   ├── schema.prisma   # Unified Database Model
│   └── config.ts       # Environment-aware Prisma Configuration
├── src/
│   ├── generated/      # Auto-generated Prisma Client
│   ├── lib/            # Singleton Service instances (Prisma)
│   ├── routes/         # Inventory Business Logic (The Core)
│   └── index.ts        # Server Entry & Middleware Orchestration
├── README.md           # You are here
└── .env.example        # Environment Template
```

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/AlphsX/Stockify-API.git
cd Stockify-API

# Install dependencies with Bun
bun install

# Generate Prisma Client
bun run db:generate
```

### Development

```bash
# Sync database schema
bun run db:push

# Start development server
bun run dev
```

## Engineering & Expertise

### Technical Expertise

**Project Architect** specializing in High-Performance Backends, Data Orchestration, and Scalable Cloud Infrastructure.

#### Core Competencies:

- 🪄 **Backend Engineering**: Bun, ElysiaJS, and Type-safe Routing.
- 🐘 **Database Design**: PostgreSQL, Prisma ORM, and Data Normalized patterns.
- 🛠️ **DevOps**: Scalable infrastructure deployment via Supabase and Vercel.
- 📊 **Architecture**: Enterprise-grade service layers and atomic transaction management.

---

### Contact & Links

- **GitHub**: [@AlphsX](https://github.com/AlphsX)
- **Repository**: [Stockify API](https://github.com/AlphsX/Stockify-API)
- **Documentation**: `localhost:3000/openapi` (Local)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❣️ for the open-source community

© 2026 AlphsX, Inc.

</div>
