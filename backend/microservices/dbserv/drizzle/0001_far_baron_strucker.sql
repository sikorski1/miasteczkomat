ALTER TABLE "public"."products" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."category_enum";--> statement-breakpoint
CREATE TYPE "public"."category_enum" AS ENUM('UBRANIA', 'INNE', 'ŻYWNOŚĆ', 'ŚRODKI CZYSTOŚCI', 'AKCESORIA KUCHENNE', 'RTV');--> statement-breakpoint
ALTER TABLE "public"."products" ALTER COLUMN "category" SET DATA TYPE "public"."category_enum" USING "category"::"public"."category_enum";