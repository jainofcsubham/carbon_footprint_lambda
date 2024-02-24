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