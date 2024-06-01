/*
  Warnings:

  - You are about to drop the `Assignor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Assignor_login_key";

-- DropIndex
DROP INDEX "Assignor_email_key";

-- DropIndex
DROP INDEX "Assignor_document_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Assignor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Payable";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignorId" TEXT NOT NULL,
    CONSTRAINT "payable_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_refresh_token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expires_in" INTEGER NOT NULL,
    "assignor_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "refresh_token_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "assignor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_refresh_token" ("assignor_id", "createdAt", "expires_in", "id") SELECT "assignor_id", "createdAt", "expires_in", "id" FROM "refresh_token";
DROP TABLE "refresh_token";
ALTER TABLE "new_refresh_token" RENAME TO "refresh_token";
CREATE UNIQUE INDEX "refresh_token_assignor_id_key" ON "refresh_token"("assignor_id");
PRAGMA foreign_key_check("refresh_token");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "assignor_document_key" ON "assignor"("document");

-- CreateIndex
CREATE UNIQUE INDEX "assignor_email_key" ON "assignor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "assignor_login_key" ON "assignor"("login");
