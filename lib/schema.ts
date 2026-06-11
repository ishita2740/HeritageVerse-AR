import { sql } from 'drizzle-orm';
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, json, serial, real, index } from 'drizzle-orm/pg-core';

// Monuments Table
export const monuments = pgTable(
  'monuments',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    city: varchar('city', { length: 100 }).notNull(), // 'Kolkata'
    location: varchar('location', { length: 255 }).notNull(),
    builtYear: integer('built_year'),
    architect: varchar('architect', { length: 255 }),
    architecturalStyle: varchar('architectural_style', { length: 255 }),
    riskLevel: varchar('risk_level', { length: 50 }).default('low'), // low, medium, high
    latitude: real('latitude').notNull(),
    longitude: real('longitude').notNull(),
    imageUrl: varchar('image_url', { length: 500 }),
    historicalImageUrl: varchar('historical_image_url', { length: 500 }),
    presentImageUrl: varchar('present_image_url', { length: 500 }),
    model3dUrl: varchar('model_3d_url', { length: 500 }), // GLB file URL
    tags: json('tags').default(sql`'[]'::json`), // Array of tags
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    cityIdx: index('monuments_city_idx').on(table.city),
    riskIdx: index('monuments_risk_idx').on(table.riskLevel),
  })
);

// Tram Stops Table
export const tramStops = pgTable(
  'tram_stops',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    storyYear: integer('story_year'),
    storyContent: text('story_content').notNull(),
    historicalImage: varchar('historical_image', { length: 500 }),
    audioUrl: varchar('audio_url', { length: 500 }),
    latitude: real('latitude'),
    longitude: real('longitude'),
    createdAt: timestamp('created_at').defaultNow(),
  }
);

// Quiz Questions Table
export const quizQuestions = pgTable(
  'quiz_questions',
  {
    id: serial('id').primaryKey(),
    monumentId: integer('monument_id').references(() => monuments.id),
    question: text('question').notNull(),
    optionA: varchar('option_a', { length: 255 }).notNull(),
    optionB: varchar('option_b', { length: 255 }).notNull(),
    optionC: varchar('option_c', { length: 255 }).notNull(),
    optionD: varchar('option_d', { length: 255 }).notNull(),
    correctOption: varchar('correct_option', { length: 1 }).notNull(), // A, B, C, D
    explanation: text('explanation'),
    difficulty: varchar('difficulty', { length: 50 }).notNull(), // Tourist, Explorer, Guardian
    points: integer('points').default(10),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    monumentIdx: index('quiz_monument_idx').on(table.monumentId),
    difficultyIdx: index('quiz_difficulty_idx').on(table.difficulty),
  })
);

// Risk Reports Table
export const riskReports = pgTable(
  'risk_reports',
  {
    id: serial('id').primaryKey(),
    monumentId: integer('monument_id').references(() => monuments.id).notNull(),
    threatType: varchar('threat_type', { length: 100 }).notNull(), // pollution, vandalism, structural, overcrowding, waterlogging, encroachment
    severity: varchar('severity', { length: 50 }).notNull(), // low, medium, high
    description: text('description'),
    photoUrl: varchar('photo_url', { length: 500 }),
    reportedBy: varchar('reported_by', { length: 255 }),
    reportedEmail: varchar('reported_email', { length: 255 }),
    isVerified: boolean('is_verified').default(false),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    monumentIdx: index('reports_monument_idx').on(table.monumentId),
    severityIdx: index('reports_severity_idx').on(table.severity),
    createdIdx: index('reports_created_idx').on(table.createdAt),
  })
);

// Community Stories Table
export const communityStories = pgTable(
  'community_stories',
  {
    id: serial('id').primaryKey(),
    monumentId: integer('monument_id').references(() => monuments.id),
    title: varchar('title', { length: 255 }).notNull(),
    storyType: varchar('story_type', { length: 100 }).notNull(), // Folk Tale, Oral History, Legend, Personal Memory
    content: text('content').notNull(),
    language: varchar('language', { length: 50 }).default('English'),
    audioUrl: varchar('audio_url', { length: 500 }),
    contributorName: varchar('contributor_name', { length: 255 }),
    contributorCity: varchar('contributor_city', { length: 255 }),
    isApproved: boolean('is_approved').default(false),
    upvotes: integer('upvotes').default(0),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    monumentIdx: index('stories_monument_idx').on(table.monumentId),
    approvedIdx: index('stories_approved_idx').on(table.isApproved),
  })
);

// Heritage Passports Table
export const heritagePassports = pgTable(
  'heritage_passports',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull().unique(),
    stampedMonuments: json('stamped_monuments').default(sql`'[]'::json`), // Array of monument IDs
    totalStamps: integer('total_stamps').default(0),
    level: integer('level').default(1),
    levelTitle: varchar('level_title', { length: 255 }).default('Curious Visitor'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    userIdx: index('passport_user_idx').on(table.userId),
  })
);

// Guardian Score Table
export const guardianScores = pgTable(
  'guardian_scores',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull().unique(),
    totalScore: integer('total_score').default(0),
    quizPoints: integer('quiz_points').default(0),
    stampPoints: integer('stamp_points').default(0),
    reportPoints: integer('report_points').default(0),
    storyPoints: integer('story_points').default(0),
    level: integer('level').default(1),
    levelTitle: varchar('level_title', { length: 255 }).default('Curious Visitor'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    userIdx: index('guardian_user_idx').on(table.userId),
    scoreIdx: index('guardian_score_idx').on(table.totalScore),
  })
);

// Monument Adoptions Table
export const adoptions = pgTable(
  'adoptions',
  {
    id: serial('id').primaryKey(),
    monumentId: integer('monument_id').references(() => monuments.id).notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    pledgeAmount: decimal('pledge_amount', { precision: 10, scale: 2 }).notNull(),
    pledgeCurrency: varchar('pledge_currency', { length: 10 }).default('INR'),
    adopterName: varchar('adopter_name', { length: 255 }),
    adopterEmail: varchar('adopter_email', { length: 255 }),
    message: text('message'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    monumentIdx: index('adoptions_monument_idx').on(table.monumentId),
    userIdx: index('adoptions_user_idx').on(table.userId),
  })
);

// Types for API responses
export type Monument = typeof monuments.$inferSelect;
export type TramStop = typeof tramStops.$inferSelect;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type RiskReport = typeof riskReports.$inferSelect;
export type CommunityStory = typeof communityStories.$inferSelect;
export type HeritagePassport = typeof heritagePassports.$inferSelect;
export type GuardianScore = typeof guardianScores.$inferSelect;
export type Adoption = typeof adoptions.$inferSelect;
