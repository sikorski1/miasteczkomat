CREATE TYPE "public"."action_type_enum" AS ENUM('sprzedaż', 'wymiana', 'pożyczę');--> statement-breakpoint
CREATE TYPE "public"."category_enum" AS ENUM('INNE', 'ELEKTRONIKA', 'UBRANIA', 'ZYWNOŚĆ', 'KUCHNIA', 'SPRZĄTANIE');--> statement-breakpoint
CREATE TYPE "public"."currency_enum" AS ENUM('PLN', 'EUR', 'Waluta Studencka');--> statement-breakpoint
CREATE TYPE "public"."dormitory_enum" AS ENUM('DS18 Odyseja', 'DS19 Apollo', 'DS15 Maraton', 'DS16 Itaka', 'DS17 Arkadia', 'DS4 Filutek', 'DS5 Strumyk', 'DS6 Bratek', 'DS7 Zaścianek', 'DS8 Stokrotka', 'DS9 Omega', 'DS10 Hajduczek', 'DS11 Bonus', 'DS12 Promyk', 'DS13 Straszny Dwór', 'DS1 Olimp', 'DS2 Babilon', 'DS3 Akropol', 'DS14 Kapitol', 'DS Alfa');--> statement-breakpoint
CREATE TABLE "dormitories" (
	"name" "dormitory_enum" PRIMARY KEY NOT NULL,
	"address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "persons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"surname" text,
	"phone_number" text NOT NULL,
	"insta_url" text,
	"fb_url" text,
	"dormitory" "dormitory_enum" NOT NULL,
	"number" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"photo_url" text,
	"price" integer NOT NULL,
	"currency" "currency_enum" NOT NULL,
	"description" text,
	"category" "category_enum" NOT NULL,
	"person_id" integer NOT NULL,
	"action_type" "action_type_enum" NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"number" integer NOT NULL,
	"dormitory" "dormitory_enum" NOT NULL,
	CONSTRAINT "rooms_number_dormitory_pk" PRIMARY KEY("number","dormitory")
);
--> statement-breakpoint
ALTER TABLE "persons" ADD CONSTRAINT "persons_dormitory_number_rooms_dormitory_number_fk" FOREIGN KEY ("dormitory","number") REFERENCES "public"."rooms"("dormitory","number") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_dormitory_dormitories_name_fk" FOREIGN KEY ("dormitory") REFERENCES "public"."dormitories"("name") ON DELETE cascade ON UPDATE no action;