-- CreateTable
CREATE TABLE "Catalog" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("id")
);
