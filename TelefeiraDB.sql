-- Table: public.cliente

-- DROP TABLE public.cliente;

CREATE TABLE IF NOT EXISTS public.cliente
(
    nome character varying(100) COLLATE pg_catalog."default" NOT NULL,
    idade integer,
    cidade character varying(100) COLLATE pg_catalog."default",
    pontos double precision DEFAULT 0,
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    CONSTRAINT cliente_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.cliente
    OWNER to postgres;
	
	
-- Table: public.compra

-- DROP TABLE public.compra;

CREATE TABLE IF NOT EXISTS public.compra
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    id_produto integer NOT NULL,
    id_cliente integer NOT NULL,
    id_compra integer NOT NULL,
    data timestamp(6) with time zone,
    CONSTRAINT compra_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.compra
    OWNER to postgres;
	
-- Table: public.produto

-- DROP TABLE public.produto;

CREATE TABLE IF NOT EXISTS public.produto
(
    nome character varying(150) COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    preco money NOT NULL,
    peso double precision,
    img_url character varying(150) COLLATE pg_catalog."default",
    CONSTRAINT produto_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.produto
    OWNER to postgres;