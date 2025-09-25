/*
  Warnings:

  - The values [Admin,Moderator,User] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The `role` column on the `Participant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[slug]` on the table `Space` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ParticipantRole" AS ENUM ('OWNER', 'MODERATOR', 'MEMBER', 'GUEST');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('ADMIN', 'MODERATOR', 'USER');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."User" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Channel" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "attachments" JSONB,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "editedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Participant" DROP COLUMN "role",
ADD COLUMN     "role" "public"."ParticipantRole" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "public"."Space" ADD COLUMN     "maxParticipants" INTEGER,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Space_slug_key" ON "public"."Space"("slug");
