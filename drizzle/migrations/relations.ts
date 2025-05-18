import { relations } from "drizzle-orm/relations";
import { users, sessions, verificationTokens } from "@/db/schema";

// One-to-many: users -> sessions
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));

// Many-to-one: sessions -> users
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

