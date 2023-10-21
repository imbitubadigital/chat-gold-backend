-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_role" ("id", "label", "type", "value") SELECT "id", "label", "type", "value" FROM "role";
DROP TABLE "role";
ALTER TABLE "new_role" RENAME TO "role";
CREATE UNIQUE INDEX "role_value_key" ON "role"("value");
CREATE UNIQUE INDEX "role_label_key" ON "role"("label");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
