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