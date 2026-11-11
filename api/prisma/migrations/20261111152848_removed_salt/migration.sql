/*
  Warnings:

  - You are about to drop the column `salt` on the `auths` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `auths` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_auths" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "strategy" TEXT NOT NULL DEFAULT 'LOCAL',
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "auths_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_auths" ("createdAt", "id", "password", "userId") SELECT "createdAt", "id", "password", "userId" FROM "auths";
DROP TABLE "auths";
ALTER TABLE "new_auths" RENAME TO "auths";
CREATE UNIQUE INDEX "auths_userId_key" ON "auths"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
