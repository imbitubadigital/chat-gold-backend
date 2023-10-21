/*
  Warnings:

  - You are about to drop the `_user_room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_user_room";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "joined_room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "socketId" TEXT NOT NULL,
    CONSTRAINT "joined_room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "joined_room_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
