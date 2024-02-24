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