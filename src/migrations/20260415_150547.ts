import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_upcoming_events_background_style" AS ENUM('light', 'blue', 'green');
  CREATE TYPE "public"."enum__pages_v_blocks_upcoming_events_background_style" AS ENUM('light', 'blue', 'green');
  CREATE TABLE "pages_blocks_upcoming_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Termine',
  	"title" varchar DEFAULT 'Die nächsten Veranstaltungen',
  	"text" varchar,
  	"count" numeric DEFAULT 3,
  	"show_location" boolean DEFAULT true,
  	"link_label" varchar DEFAULT 'Alle Termine ansehen',
  	"link_href" varchar DEFAULT '/termine',
  	"background_style" "enum_pages_blocks_upcoming_events_background_style" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_upcoming_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Termine',
  	"title" varchar DEFAULT 'Die nächsten Veranstaltungen',
  	"text" varchar,
  	"count" numeric DEFAULT 3,
  	"show_location" boolean DEFAULT true,
  	"link_label" varchar DEFAULT 'Alle Termine ansehen',
  	"link_href" varchar DEFAULT '/termine',
  	"background_style" "enum__pages_v_blocks_upcoming_events_background_style" DEFAULT 'light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_upcoming_events" ADD CONSTRAINT "pages_blocks_upcoming_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_upcoming_events" ADD CONSTRAINT "_pages_v_blocks_upcoming_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_upcoming_events_order_idx" ON "pages_blocks_upcoming_events" USING btree ("_order");
  CREATE INDEX "pages_blocks_upcoming_events_parent_id_idx" ON "pages_blocks_upcoming_events" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_upcoming_events_path_idx" ON "pages_blocks_upcoming_events" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_upcoming_events_order_idx" ON "_pages_v_blocks_upcoming_events" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_upcoming_events_parent_id_idx" ON "_pages_v_blocks_upcoming_events" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_upcoming_events_path_idx" ON "_pages_v_blocks_upcoming_events" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_upcoming_events" CASCADE;
  DROP TABLE "_pages_v_blocks_upcoming_events" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_upcoming_events_background_style";
  DROP TYPE "public"."enum__pages_v_blocks_upcoming_events_background_style";`)
}
