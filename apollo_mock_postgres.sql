DROP TABLE IF EXISTS "patient";
CREATE TABLE "patient" (
  "id" SERIAL,
  "name" text COLLATE "cs_CZ" NOT NULL,
  PRIMARY KEY ("id")
); 

INSERT INTO "patient" ("id", "name") VALUES
(3,	'Pacient1'),
(4,	'Pacient2');

DROP TABLE IF EXISTS "procedure";
CREATE TABLE "procedure" (
  "id" SERIAL,
  "status" text COLLATE "cs_CZ" NOT NULL,
  "treatment_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "patient_id" integer NOT NULL,
  "date" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

INSERT INTO "procedure" ("id", "status", "treatment_id", "user_id", "patient_id", "date") VALUES
(1,	'waiting',	3,	1,	4,	'2017-12-01 00:00:00'),
(2,	'waiting',	3,	1,	4,	'2017-12-02 23:00:00'),
(3,	'waiting',	3,	1,	4,	'2017-12-01 23:00:00'),
(4,	'waiting',	3,	1,	4,	'2017-11-30 23:00:00');

DROP TABLE IF EXISTS "treatment";
CREATE TABLE "treatment" (
  "id" SERIAL,
  "name" varchar(255) COLLATE "cs_CZ" NOT NULL,
  "user_id" integer NOT NULL,
  PRIMARY KEY ("id")
); 

INSERT INTO "treatment" ("id", "name", "user_id") VALUES
(1,	'Abdominoplastika',	1),
(3,	'Rhinoplastika',	2),
(4,	'Obnova vlasů',	2);

DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
  "id" SERIAL,
  "username" varchar(255) COLLATE "cs_CZ" NOT NULL,
  "name" varchar(255) COLLATE "cs_CZ" NOT NULL,
  PRIMARY KEY ("id")
); 

INSERT INTO "user" ("id", "username", "name") VALUES
(1,	'tester',	'Tonda Tester'),
(2,	'zkousec',	'Jakub Zkousec');

-- 2017-11-30 04:24:11