/*
  Warnings:

  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updatedAt` on the `room` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_joined_room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "socketId" TEXT NOT NULL,
    CONSTRAINT "joined_room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "joined_room_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_joined_room" ("id", "roomId", "socketId", "userId") SELECT "id", "roomId", "socketId", "userId" FROM "joined_room";
DROP TABLE "joined_room";
ALTER TABLE "new_joined_room" RENAME TO "joined_room";
CREATE TABLE "new_room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_room" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "room";
DROP TABLE "room";
ALTER TABLE "new_room" RENAME TO "room";
CREATE UNIQUE INDEX "room_name_key" ON "room"("name");
CREATE TABLE "new_message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_message" ("createdAt", "id", "roomId", "updatedAt", "userId") SELECT "createdAt", "id", "roomId", "updatedAt", "userId" FROM "message";
DROP TABLE "message";
ALTER TABLE "new_message" RENAME TO "message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
