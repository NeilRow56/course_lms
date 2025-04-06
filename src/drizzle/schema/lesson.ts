import { pgTable, text, uuid, integer, pgEnum } from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'

import { createdAt, id, updatedAt } from '../schema-helpers'
import { CourseSectionTable } from './course_section'
import { UserLessonCompleteTable } from './user_lesson_complete'

export const lessonStatuses = ['public', 'private', 'preview'] as const
export type LessonStatus = (typeof lessonStatuses)[number]
export const lessonStatusEnum = pgEnum('lesson_status', lessonStatuses)

export const LessonTable = pgTable('lessons', {
  id,
  name: text().notNull(),
  description: text(),
  youtubeVideoId: text().notNull(),
  order: integer().notNull(),
  status: lessonStatusEnum().notNull().default('private'),
  sectionId: uuid()
    .notNull()
    .references(() => CourseSectionTable.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt
})

export const LessonRelationships = relations(LessonTable, ({ one, many }) => ({
  section: one(CourseSectionTable, {
    fields: [LessonTable.sectionId],
    references: [CourseSectionTable.id]
  }),
  userLessonsComplete: many(UserLessonCompleteTable)
}))
