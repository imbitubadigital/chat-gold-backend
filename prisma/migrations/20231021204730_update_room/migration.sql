-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_room" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "room";
DROP TABLE "room";
ALTER TABLE "new_room" RENAME TO "room";
CREATE UNIQUE INDEX "room_name_key" ON "room"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
