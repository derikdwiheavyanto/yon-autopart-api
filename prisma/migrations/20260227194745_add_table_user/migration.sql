-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "age" INTEGER NOT NULL,
    "address" VARCHAR(100),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
