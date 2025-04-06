import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'

import { createdAt, id, updatedAt } from '../schema-helpers'
import { UserCourseAccessTable } from './user_course_access'

export const userRoles = ['user', 'admin'] as const
export type UserRole = (typeof userRoles)[number]
export const userRoleEnum = pgEnum('user_role', userRoles)

export const UserTable = pgTable('users', {
  id,
  // The application should allow multiple users to be deleted without violating the UNIQUE constraint.
  //Suggested Fix
  //Use a UUID (probably more robust solution):
  // "clerkUserId: deleted-${crypto.randomUUID()}"

  clerkUserId: text().notNull().unique(),
  email: text().notNull(),
  name: text().notNull(),
  role: userRoleEnum().notNull().default('user'),
  imageUrl: text(),
  deletedAt: timestamp({ withTimezone: true }),
  createdAt,
  updatedAt
})

export const UserRelationships = relations(UserTable, ({ many }) => ({
  userCourseAccesses: many(UserCourseAccessTable)
}))
