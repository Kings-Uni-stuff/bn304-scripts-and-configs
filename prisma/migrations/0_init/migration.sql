-- CreateTable
CREATE TABLE "security" (
    "id" SERIAL NOT NULL,
    "camera" INTEGER NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "file_type" INTEGER NOT NULL,
    "time_stamp" TIMESTAMP(6) NOT NULL,
    "frame" INTEGER,
    "movie_end" TIMESTAMP(6),

    CONSTRAINT "security_pkey" PRIMARY KEY ("id")
);

