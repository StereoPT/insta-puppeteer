/*
  Warnings:

  - Added the required column `priority` to the `Hashtag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hashtag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Hashtag" ("createdAt", "id", "tag", "updatedAt") SELECT "createdAt", "id", "tag", "updatedAt" FROM "Hashtag";
DROP TABLE "Hashtag";
ALTER TABLE "new_Hashtag" RENAME TO "Hashtag";
CREATE UNIQUE INDEX "Hashtag_tag_key" ON "Hashtag"("tag");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
