import { Elysia, t } from "elysia";
import { prisma } from "../lib/prisma";

export const inventoryRoutes = new Elysia({ prefix: "/inventory" })

  // TODO: Lab 1 - GET /inventory — ดึงข้อมูลสินค้าทั้งหมด
  // query params (optional):
  //   low_stock: "all" | "true" | "false"   (default "all")
  //   sortBy:    "createdAt" | "name" | "quantity" (default "name")
  //   sortOrder: "asc" | "desc"            (default "asc")
  // Logic: ถ้า low_stock === "true" → where = { quantity: { lte: 10 } } ไม่งั้น where = {}
  // ใช้ t.Object + t.Optional + t.Union + t.Literal สำหรับ query validation
  .get(
    "/",
    async ({ query }) => {
      // TODO: implement
      const { low_stock = "all", sortBy = "name", sortOrder = "asc" } = query;

      const where = low_stock === "true" ? { quantity: { lte: 10 } } : {};

      const products = await prisma.product.findMany({
        where,
        orderBy: {
          [sortBy]: sortOrder,
        },
      });

      return products;
    },
    {
      query: t.Object({
        // TODO: กำหนด schema สำหรับ low_stock, sortBy, sortOrder
        low_stock: t.Optional(
          t.Union([t.Literal("all"), t.Literal("true"), t.Literal("false")]),
        ),
        sortBy: t.Optional(
          t.Union([
            t.Literal("createdAt"),
            t.Literal("name"),
            t.Literal("quantity"),
          ]),
        ),
        sortOrder: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
      }),
    },
  )

  // TODO: Lab 2 - POST /inventory — เพิ่มเข้าสินค้าใหม่เข้าสู่ระบบ
  // body: { name: string, sku: string, quantity?: number, zone: string }
  // Logic: name, sku, zone ต้องเป็น String ที่ห้ามเป็นค่าว่าง และ quantity ต้องเป็น Numeric (default 0)
  .post(
    "/",
    async ({ body, set }) => {
      // TODO: implement
      const { name, sku, quantity = 0, zone } = body;

      // ตรวจสอบ SKU ซ้ำ
      const existingProduct = await prisma.product.findUnique({
        where: { sku },
      });

      if (existingProduct) {
        set.status = 400;
        return { message: "SKU is already in use" };
      }

      const newProduct = await prisma.product.create({
        data: {
          name,
          sku,
          quantity,
          zone,
        },
      });

      return newProduct;
    },
    {
      body: t.Object({
        // TODO: กำหนด schema สำหรับ name, sku, quantity, zone
        name: t.String({ minLength: 1 }),
        sku: t.String({ minLength: 1 }),
        quantity: t.Optional(t.Numeric({ minimum: 0 })),
        zone: t.String({ minLength: 1 }),
      }),
    },
  )

  // TODO: Lab 3 - PATCH /inventory/:id/adjust — อัปเดตจำนวนสต็อก
  // params: id (string), body: { change: number }
  // Logic: รับข้อมูลจาก Body เป็น "change" (+/-) นำมาคำนวณกับสต็อกเดิมในฐานข้อมูล
  // ตรวจสอบว่าสินค้ามีอยู่ก่อน ถ้าไม่เจอ return 404
  .patch(
    "/:id/adjust",
    async ({ params, body, set }) => {
      // TODO: implement
      const { id } = params;

      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        set.status = 404;
        return { message: "Product not found" };
      }

      const { change } = body;
      const newQuantity = existingProduct.quantity + change;

      // ตรวจสอบสต็อกไม่ติดลบ
      if (newQuantity < 0) {
        set.status = 400;
        return { message: "Insufficient stock" };
      }

      const updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          quantity: newQuantity,
        },
      });

      return updatedProduct;
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Object({
        // TODO: กำหนด schema สำหรับ change
        change: t.Numeric(),
      }),
    },
  )

  // TODO: Lab 4 - DELETE /inventory/:id — ลบรายการสินค้าที่ยกเลิกการจำหน่าย
  // params: id (string)
  // ตรวจสอบสินค้าคงคลัง (quantity) ต้องเป็น 0 เท่านั้นถึงจะลบได้
  // ถ้าไม่เจอสินค้า: return 404. ถ้ายังมีของเหลือ (quantity > 0): return 400
  .delete(
    "/:id",
    async ({ params, set }) => {
      // TODO: implement
      const { id } = params;

      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        set.status = 404;
        return { message: "Product not found" };
      }

      // ตรวจสอบหน่วยสินค้าคงเหลือ
      if (existingProduct.quantity > 0) {
        set.status = 400;
        return { message: "Cannot delete product with remaining stock" };
      }

      await prisma.product.delete({
        where: { id },
      });

      return { message: "Deleted successfully" };
    },
    { params: t.Object({ id: t.String() }) },
  );
