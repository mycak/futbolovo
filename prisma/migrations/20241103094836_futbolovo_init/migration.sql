-- CreateEnum
CREATE TYPE "EventCategoryEnum" AS ENUM ('TOURNAMENT', 'SCHOOL', 'CAMP', 'SPORT_FIELD', 'LEAGUE', 'SERVICE', 'MATCH');

-- CreateEnum
CREATE TYPE "AgeCategoryCategoryEnum" AS ENUM ('OPEN', 'OLDBOYS', 'VETERAN', 'U21', 'U20', 'U19', 'U18', 'U17', 'U16', 'U15', 'U14', 'U13', 'U12', 'U11', 'U10', 'U9', 'U8', 'U7', 'U6');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "category" "EventCategoryEnum" NOT NULL,
    "ageCategories" "AgeCategoryCategoryEnum"[],
    "location" JSONB,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "date" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
