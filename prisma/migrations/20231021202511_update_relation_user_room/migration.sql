-- CreateTable
CREATE TABLE "_user_room" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_user_room_A_fkey" FOREIGN KEY ("A") REFERENCES "room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_user_room_B_fkey" FOREIGN KEY ("B") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_room_AB_unique" ON "_user_room"("A", "B");

-- CreateIndex
CREATE INDEX "_user_room_B_index" ON "_user_room"("B");
