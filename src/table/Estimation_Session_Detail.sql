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
)
;