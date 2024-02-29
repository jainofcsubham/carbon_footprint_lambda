CREATE TABLE IF NOT EXISTS public."Estimation_Session"
(
    session_id uuid NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    CONSTRAINT "Estimation_Session_pkey" PRIMARY KEY (session_id)
);

ALTER TABLE IF EXISTS public."Estimation_Session"
    ALTER COLUMN session_id SET DEFAULT uuid_generate_v4();

ALTER TABLE IF EXISTS public."Estimation_Session"
    ADD COLUMN IF NOT EXISTS created_on timestamp without time zone NOT NULL;