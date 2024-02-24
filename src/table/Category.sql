CREATE TABLE public."Category"
(
    category_id uuid NOT NULL,
    category_name text NOT NULL,
    PRIMARY KEY (category_id)
);

ALTER TABLE IF EXISTS public."Category"
    ADD COLUMN IF NOT EXISTS ordering integer NOT NULL;

ALTER TABLE IF EXISTS public."Category"
    ALTER COLUMN category_id SET DEFAULT uuid_generate_v4();

INSERT INTO public."Category"("category_name","ordering") VALUES ('Fuel Consumption',1);
INSERT INTO public."Category"("category_name","ordering") VALUES ('Energy Consumption',2);
INSERT INTO public."Category"("category_name","ordering") VALUES ('Travel',3);
INSERT INTO public."Category"("category_name","ordering") VALUES ('Food Habits',4);