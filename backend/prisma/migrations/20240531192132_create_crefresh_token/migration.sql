-- CreateTable
CREATE TABLE "refresh_token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expires_in" INTEGER NOT NULL,
    "assignor_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "refresh_token_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "Assignor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_assignor_id_key" ON "refresh_token"("assignor_id");
