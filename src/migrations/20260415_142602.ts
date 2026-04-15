import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage" CASCADE;
  DROP TYPE "public"."enum_homepage_featured_event_mode";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_featured_event_mode" AS ENUM('auto', 'manual');
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Musikverein Müsen 1919 e.V.',
  	"hero_headline" varchar DEFAULT 'Musik, Gemeinschaft und Heimatgefühl.' NOT NULL,
  	"hero_text" varchar,
  	"hero_primary_button_label" varchar DEFAULT 'Zu den Terminen',
  	"hero_primary_button_link" varchar DEFAULT '/termine',
  	"hero_secondary_button_label" varchar DEFAULT 'Vereinschronik',
  	"hero_secondary_button_link" varchar DEFAULT '/verein/chronik',
  	"hero_show_logo" boolean DEFAULT true,
  	"featured_event_section_title" varchar DEFAULT 'Nächste Veranstaltung',
  	"featured_event_mode" "enum_homepage_featured_event_mode" DEFAULT 'auto',
  	"featured_event_manual_title" varchar,
  	"featured_event_manual_date_text" varchar,
  	"featured_event_manual_location" varchar,
  	"featured_event_manual_link" varchar,
  	"about_section_title" varchar DEFAULT 'Wer wir sind',
  	"about_section_text" jsonb,
  	"about_section_image_id" integer,
  	"about_section_link_label" varchar DEFAULT 'Mehr über den Verein',
  	"about_section_link_href" varchar DEFAULT '/ueber-uns',
  	"youth_section_title" varchar DEFAULT 'Jugendarbeit',
  	"youth_section_text" jsonb,
  	"youth_section_link_label" varchar DEFAULT 'Mehr zur Jugendarbeit',
  	"youth_section_link_href" varchar DEFAULT '/jugendarbeit',
  	"contact_section_title" varchar DEFAULT 'Kontakt und Mitmachen',
  	"contact_section_text" varchar,
  	"contact_section_link_label" varchar DEFAULT 'Kontakt aufnehmen',
  	"contact_section_link_href" varchar DEFAULT '/kontakt',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_about_section_image_id_media_id_fk" FOREIGN KEY ("about_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "homepage_about_section_about_section_image_idx" ON "homepage" USING btree ("about_section_image_id");`)
}
