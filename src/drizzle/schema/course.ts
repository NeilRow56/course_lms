import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { createdAt, id, updatedAt } from '../schema-helpers'
import { CourseProductTable } from './course_product'

export const CourseTable = pgTable('courses', {
  id,
  name: text().notNull(),
  description: text().notNull(),
  createdAt,
  updatedAt
})

export const CourseRelationships = relations(CourseTable, ({ many }) => ({
  courseProducts: many(CourseProductTable)
}))
