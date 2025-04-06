import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { CourseTable } from './course'
import { ProductTable } from './product'

import { relations } from 'drizzle-orm'
import { createdAt, updatedAt } from '../schema-helpers'

//join table

export const CourseProductTable = pgTable(
  'course_products',
  {
    //Forein Key for relationship
    courseId: uuid()
      .notNull()
      .references(() => CourseTable.id, { onDelete: 'restrict' }),
    productId: uuid()
      .notNull()
      .references(() => ProductTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt
  },
  // t for table. Creates a key made up of the course and product Id
  t => [primaryKey({ columns: [t.courseId, t.productId] })]
)

//Course products relationships

export const CourseProductRelationships = relations(
  CourseProductTable,
  ({ one }) => ({
    course: one(CourseTable, {
      fields: [CourseProductTable.courseId],
      references: [CourseTable.id]
    }),
    product: one(ProductTable, {
      fields: [CourseProductTable.productId],
      references: [ProductTable.id]
    })
  })
)
