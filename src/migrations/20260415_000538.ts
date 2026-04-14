import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_calendar_exclusion_rules_rule_type" AS ENUM('UID_EQUALS', 'TITLE_CONTAINS', 'LOCATION_CONTAINS', 'CATEGORY_EQUALS');
  CREATE TABLE "events_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"description" varchar,
  	"location" varchar,
  	"starts_at" timestamp(3) with time zone NOT NULL,
  	"ends_at" timestamp(3) with time zone,
  	"is_published" boolean DEFAULT true,
  	"is_hidden" boolean DEFAULT false,
  	"external_uid" varchar,
  	"exclusion_reason" varchar,
  	"last_imported_at" timestamp(3) with time zone,
  	"override_title" varchar,
  	"override_description" varchar,
  	"override_location" varchar,
  	"override_image_id" integer,
  	"source_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "calendar_sources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"ics_url" varchar NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"last_synced_at" timestamp(3) with time zone,
  	"last_sync_status" varchar,
  	"last_sync_message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "calendar_exclusion_rules" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_id" integer NOT NULL,
  	"rule_type" "enum_calendar_exclusion_rules_rule_type" NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "calendar_sources_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "calendar_exclusion_rules_id" integer;
  ALTER TABLE "events_categories" ADD CONSTRAINT "events_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_override_image_id_media_id_fk" FOREIGN KEY ("override_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_source_id_calendar_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."calendar_sources"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "calendar_exclusion_rules" ADD CONSTRAINT "calendar_exclusion_rules_source_id_calendar_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."calendar_sources"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "events_categories_order_idx" ON "events_categories" USING btree ("_order");
  CREATE INDEX "events_categories_parent_id_idx" ON "events_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE UNIQUE INDEX "events_external_uid_idx" ON "events" USING btree ("external_uid");
  CREATE INDEX "events_override_image_idx" ON "events" USING btree ("override_image_id");
  CREATE INDEX "events_source_idx" ON "events" USING btree ("source_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "calendar_sources_updated_at_idx" ON "calendar_sources" USING btree ("updated_at");
  CREATE INDEX "calendar_sources_created_at_idx" ON "calendar_sources" USING btree ("created_at");
  CREATE INDEX "calendar_exclusion_rules_source_idx" ON "calendar_exclusion_rules" USING btree ("source_id");
  CREATE INDEX "calendar_exclusion_rules_updated_at_idx" ON "calendar_exclusion_rules" USING btree ("updated_at");
  CREATE INDEX "calendar_exclusion_rules_created_at_idx" ON "calendar_exclusion_rules" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_calendar_sources_fk" FOREIGN KEY ("calendar_sources_id") REFERENCES "public"."calendar_sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_calendar_exclusion_rules_fk" FOREIGN KEY ("calendar_exclusion_rules_id") REFERENCES "public"."calendar_exclusion_rules"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_calendar_sources_id_idx" ON "payload_locked_documents_rels" USING btree ("calendar_sources_id");
  CREATE INDEX "payload_locked_documents_rels_calendar_exclusion_rules_i_idx" ON "payload_locked_documents_rels" USING btree ("calendar_exclusion_rules_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "calendar_sources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "calendar_exclusion_rules" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "events_categories" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "calendar_sources" CASCADE;
  DROP TABLE "calendar_exclusion_rules" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_calendar_sources_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_calendar_exclusion_rules_fk";
  
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_calendar_sources_id_idx";
  DROP INDEX "payload_locked_documents_rels_calendar_exclusion_rules_i_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "calendar_sources_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "calendar_exclusion_rules_id";
  DROP TYPE "public"."enum_calendar_exclusion_rules_rule_type";`)
}
