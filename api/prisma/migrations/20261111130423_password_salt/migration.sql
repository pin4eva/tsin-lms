/*
  Warnings:

  - Added the required column `password` to the `auths` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `auths` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_auths" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "auths_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_auths" ("createdAt", "id", "token", "userId") SELECT "createdAt", "id", "token", "userId" FROM "auths";
DROP TABLE "auths";
ALTER TABLE "new_auths" RENAME TO "auths";
CREATE UNIQUE INDEX "auths_userId_key" ON "auths"("userId");
CREATE UNIQUE INDEX "auths_token_key" ON "auths"("token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
