-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "code_verification_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" INTEGER NOT NULL,
    "expiration" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "code_verification_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'CLIENT'
);

-- CreateTable
CREATE TABLE "refresh" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiration" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "refresh_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_user_role" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_user_role_A_fkey" FOREIGN KEY ("A") REFERENCES "role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_user_role_B_fkey" FOREIGN KEY ("B") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "role_value_key" ON "role"("value");

-- CreateIndex
CREATE UNIQUE INDEX "role_label_key" ON "role"("label");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_expiration_key" ON "refresh"("expiration");

-- CreateIndex
CREATE UNIQUE INDEX "_user_role_AB_unique" ON "_user_role"("A", "B");

-- CreateIndex
CREATE INDEX "_user_role_B_index" ON "_user_role"("B");
