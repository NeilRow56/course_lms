import { relations } from 'drizzle-orm'
import { pgTable, text, integer, pgEnum } from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../schema-helpers'
import { CourseProductTable } from './course_product'

// enum
export const productStatuses = ['public', 'private'] as const
export type ProductStatus = (typeof productStatuses)[number]
export const productStatusEnum = pgEnum('product_status', productStatuses)

export const ProductTable = pgTable('products', {
  id,
  name: text().notNull(),
  description: text().notNull(),
  imageUrl: text().notNull(),
  priceInDollars: integer().notNull(),
  status: productStatusEnum().notNull().default('private'),
  createdAt,
  updatedAt
})

export const ProductRelationships = relations(ProductTable, ({ many }) => ({
  courseProducts: many(CourseProductTable)
}))
