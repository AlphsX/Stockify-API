# stockify-api

REST API for **stockify-web**, built with [Bun](https://bun.sh), [Elysia](https://elysiajs.com), [Prisma](https://prisma.io), and [Supabase](https://supabase.com) (PostgreSQL).

---

## Stack

| Layer     | Technology            |
| --------- | --------------------- |
| Runtime   | Bun                   |
| Framework | Elysia v1             |
| ORM       | Prisma v6             |
| Database  | Supabase (PostgreSQL) |

---

## Getting started

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Find the connection strings in your Supabase dashboard under  
**Project Settings → Database → Connection string** (use the _URI_ tab).

| Variable       | Where to find it                              |
| -------------- | --------------------------------------------- |
| `DATABASE_URL` | Pooler URL — port **6543** (Transaction mode) |
| `DIRECT_URL`   | Direct URL — port **5432**                    |

### 3. Push schema to Supabase

```bash
bun run db:push        # quick apply without migration history
# or
bun run db:migrate     # create a named migration
```

### 4. Start the dev server

```bash
bun run dev
```

The API listens on <http://localhost:3000> by default.

---

## Endpoints

| Method   | Path                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `GET`    | `/health`                 | Health check                                  |
| `GET`    | `/inventory`              | List all products (supports sorting & filter) |
| `POST`   | `/inventory`              | Add new product into system                   |
| `PATCH`  | `/inventory/:id/adjust`   | Adjust product quantity (+/- stock)           |
| `DELETE` | `/inventory/:id`          | Delete product (allowed only if quantity is 0) |

### Request / Response examples

**GET `/inventory?low_stock=true`**
- Filters products with `quantity <= 10`.
- Default sorting: `name` (A-Z).

**POST `/inventory`**

```json
// body
{
  "name": "Mechanical Keyboard",
  "sku": "KB-001",
  "quantity": 50,
  "zone": "A1"
}

// response 200
{
  "id": "uuid-v4",
  "name": "Mechanical Keyboard",
  "sku": "KB-001",
  "quantity": 50,
  "zone": "A1",
  "createdAt": "...",
  "updatedAt": "..."
}
```

**PATCH `/inventory/:id/adjust`**

```json
// body
{ "change": -5 } // Means 5 items withdrawn

// response 200 (updated product)
{ ... "quantity": 45, ... }
```

---

## Environment variables

| Variable       | Required | Default                | Description                                          |
| -------------- | -------- | ---------------------- | ---------------------------------------------------- |
| `DATABASE_URL` | ✅       | —                      | Prisma pooled connection string                      |
| `DIRECT_URL`   | ✅       | —                      | Prisma direct connection string                      |
| `PORT`         | ❌       | `3000`                 | Port the server listens on                           |
| `CORS_ORIGIN`  | ❌       | localhost + Codespaces | Allowed CORS origin(s), `*`, or comma-separated list |
