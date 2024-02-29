-- User table

CREATE TABLE public."User"
(
    user_id uuid NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    gender text NOT NULL,
    email text NOT NULL,
    date_of_birth date NOT NULL,
    CONSTRAINT user_id PRIMARY KEY (user_id)
);

ALTER TABLE IF EXISTS public."User"
    OWNER to postgres;

-- Category Table

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


-- Category_Question table

CREATE TABLE public."Category_Question"
(
    question_id uuid NOT NULL,
    category_id uuid NOT NULL,
    question text NOT NULL,
    is_required boolean NOT NULL DEFAULT false,
    factor double precision NOT NULL DEFAULT 0,
    PRIMARY KEY (question_id),
    CONSTRAINT category_id FOREIGN KEY (category_id)
        REFERENCES public."Category" (category_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Category_Question"
    ADD COLUMN IF NOT EXISTS answer_type text NOT NULL DEFAULT 'number';

ALTER TABLE IF EXISTS public."Category_Question"
    ALTER COLUMN question_id SET DEFAULT uuid_generate_v4();

-- Category_Question_Option table

CREATE TABLE public."Category_Question_Option"
(
    option_id uuid NOT NULL,
    question_id uuid NOT NULL,
    value text NOT NULL,
    factor double precision NOT NULL DEFAULT 0,
    PRIMARY KEY (option_id),
    CONSTRAINT question_id FOREIGN KEY (question_id)
        REFERENCES public."Category_Question" (question_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Category_Question_Option"
    ALTER COLUMN option_id SET DEFAULT uuid_generate_v4();

-- Estimation_Session Table

CREATE TABLE IF NOT EXISTS public."Estimation_Session"
(
    session_id uuid NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    CONSTRAINT "Estimation_Session_pkey" PRIMARY KEY (session_id)
);

ALTER TABLE IF EXISTS public."Estimation_Session"
    ALTER COLUMN session_id SET DEFAULT uuid_generate_v4();

-- Estimation_Session_Detail Table

CREATE TABLE public."Estimation_Session_Detail"
(
    session_id uuid NOT NULL,
    question_id uuid NOT NULL,
    value text NOT NULL,
    CONSTRAINT session_id FOREIGN KEY (session_id)
        REFERENCES public."Estimation_Session" (session_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT question_id FOREIGN KEY (question_id)
        REFERENCES public."Category_Question" (question_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

-- Insert data into Category Table
INSERT INTO public."Category"("category_name","ordering") VALUES ('Fuel Consumption',1);
INSERT INTO public."Category"("category_name","ordering") VALUES ('Energy Consumption',2);
INSERT INTO public."Category"("category_name","ordering") VALUES ('Travel',3);
INSERT INTO public."Category"("category_name","ordering") VALUES ('Food Habits',4);

-- Insert Question into Category_Question

INSERT INTO "Category_Question"
("category_id","question","is_required","factor","answer_type") 
VALUES 
('6af3228a-c094-4934-a2ce-dc34bb9dc979','Enter the amount of petrol consumed(litre)',false,2.34,'number'),
('6af3228a-c094-4934-a2ce-dc34bb9dc979','Enter the amount of diesel consumed(litre)',false,2.71,'number'),
('6af3228a-c094-4934-a2ce-dc34bb9dc979','Enter the amount of LPG/CNG consumed(kg/litre)',false,2.07,'number'),
('6af3228a-c094-4934-a2ce-dc34bb9dc979','Enter the amount of Coal consumed(kg)',false,2.50,'number'),
('3408601f-d38e-491a-9d28-621cfa7997b7','Enter the amount of electricity consumed from non-renewable resources(kwh)',false,0.708,'number'),
('627db795-c84e-433b-8d2f-1a69a02a170f','Enter the distance traveled in Flights(km)',false,0.121,'number'),
('627db795-c84e-433b-8d2f-1a69a02a170f','Enter the distance traveled in Trains(km)',false, 0.0078,'number'),
('627db795-c84e-433b-8d2f-1a69a02a170f','Enter the distance traveled in Metro(km)',false,0.0139,'number'),
('627db795-c84e-433b-8d2f-1a69a02a170f','Enter the distance traveled in Bus(km)',false,0.054,'number'),
('627db795-c84e-433b-8d2f-1a69a02a170f','Enter the distance traveled in Electric Bus(km)',false,0.03782,'number'),
('627db795-c84e-433b-8d2f-1a69a02a170f','Enter the distance traveled in Car(km)',false,0.1431,'number'),
('627db795-c84e-433b-8d2f-1a69a02a170f','Enter the distance traveled in Electric Car(km)',false,0.1035,'number'),
('ba8440b0-8054-4ae8-b176-b52c74f47320','Please choose your meal preference',false,0,'text');

-- Insert into Category_Question_Option

INSERT INTO "Category_Question_Option" ("question_id","value","factor") VALUES
	('59f2e3e7-72ba-4bbd-9bc7-e555cead228b','Vegan Diet',5.53),
	('59f2e3e7-72ba-4bbd-9bc7-e555cead228b','Vegetarian Diet',5.96),
	('59f2e3e7-72ba-4bbd-9bc7-e555cead228b','Non-Vegetarian Diet - Rarely',6.6),
	('59f2e3e7-72ba-4bbd-9bc7-e555cead228b','Non-Vegetarian Diet - Sometimes',8.26),
	('59f2e3e7-72ba-4bbd-9bc7-e555cead228b','Non-Vegetarian Diet - Regularly',10.36);

-- Alter Estimation_session table

ALTER TABLE IF EXISTS public."Estimation_Session"
    ADD COLUMN IF NOT EXISTS created_on timestamp without time zone NOT NULL;

ALTER TABLE IF EXISTS public."Estimation_Session"
    ADD COLUMN IF NOT EXISTS user_id uuid NOT NULL;
ALTER TABLE IF EXISTS public."Estimation_Session"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id)
    REFERENCES public."User" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;