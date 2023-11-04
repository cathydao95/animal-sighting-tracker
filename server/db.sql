--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: individuals; Type: TABLE; Schema: public; Owner: tpl1122_1
--

CREATE TABLE public.individuals (
    id integer NOT NULL,
    nickname character varying(255) NOT NULL,
    scientist_name character varying(255),
    scientist_email character varying(255),
    species_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.individuals OWNER TO tpl1122_1;

--
-- Name: individuals_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_1
--

CREATE SEQUENCE public.individuals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.individuals_id_seq OWNER TO tpl1122_1;

--
-- Name: individuals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1122_1
--

ALTER SEQUENCE public.individuals_id_seq OWNED BY public.individuals.id;


--
-- Name: sightings; Type: TABLE; Schema: public; Owner: tpl1122_1
--

CREATE TABLE public.sightings (
    id integer NOT NULL,
    sighting_datetime timestamp without time zone NOT NULL,
    individual_id integer NOT NULL,
    sighting_location character varying(255) NOT NULL,
    is_healthy boolean NOT NULL,
    scientist_name character varying(255),
    scientist_email character varying(255),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.sightings OWNER TO tpl1122_1;

--
-- Name: sightings_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_1
--

CREATE SEQUENCE public.sightings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sightings_id_seq OWNER TO tpl1122_1;

--
-- Name: sightings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1122_1
--

ALTER SEQUENCE public.sightings_id_seq OWNED BY public.sightings.id;


--
-- Name: species; Type: TABLE; Schema: public; Owner: tpl1122_1
--

CREATE TABLE public.species (
    id integer NOT NULL,
    common_name character varying(255) NOT NULL,
    scientific_name character varying(255) NOT NULL,
    estimated_population integer NOT NULL,
    conservation_status_code character varying(2) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.species OWNER TO tpl1122_1;

--
-- Name: species_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1122_1
--

CREATE SEQUENCE public.species_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.species_id_seq OWNER TO tpl1122_1;

--
-- Name: species_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1122_1
--

ALTER SEQUENCE public.species_id_seq OWNED BY public.species.id;


--
-- Name: individuals id; Type: DEFAULT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.individuals ALTER COLUMN id SET DEFAULT nextval('public.individuals_id_seq'::regclass);


--
-- Name: sightings id; Type: DEFAULT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.sightings ALTER COLUMN id SET DEFAULT nextval('public.sightings_id_seq'::regclass);


--
-- Name: species id; Type: DEFAULT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.species ALTER COLUMN id SET DEFAULT nextval('public.species_id_seq'::regclass);


--
-- Data for Name: individuals; Type: TABLE DATA; Schema: public; Owner: tpl1122_1
--

COPY public.individuals (id, nickname, scientist_name, scientist_email, species_id, created_at) FROM stdin;
1	Simba	Dr. John Smith	john.smith@example.com	1	2023-09-20 20:28:26.436685
2	Nala	Dr. Mary Johnson	mary.johnson@example.com	1	2023-09-20 20:28:26.436685
3	Dumbo	Dr. Emily Davis	emily.davis@example.com	2	2023-09-20 20:28:26.436685
4	Babar	Dr. Michael Wilson	michael.wilson@example.com	2	2023-09-20 20:28:26.436685
5	Shere Khan	Dr. Lisa Anderson	lisa.anderson@example.com	3	2023-09-20 20:28:26.436685
6	Bagheera	Dr. David Miller	david.miller@example.com	3	2023-09-20 20:28:26.436685
7	Long Neck	Dr. Sarah Brown	sarah.brown@example.com	4	2023-09-20 20:28:26.436685
8	Spots	Dr. Daniel Wilson	daniel.wilson@example.com	4	2023-09-20 20:28:26.436685
9	Snowball	Dr. Rachel Lee	rachel.lee@example.com	5	2023-09-20 20:28:26.436685
10	Iceberg	Dr. Robert Clark	robert.clark@example.com	5	2023-09-20 20:28:26.436685
11	Bamboo	Dr. Jessica Taylor	jessica.taylor@example.com	6	2023-09-20 20:28:26.436685
12	Panda Jr.	Dr. Matthew Green	matthew.green@example.com	6	2023-09-20 20:28:26.436685
16	Leo	Dr Dao	drdao@gmail.com	1	2023-09-22 15:13:48.742064
17	Cow	Cathy	\N	2	2023-09-25 15:52:24.599857
18	Cow	Cathy	\N	2	2023-09-25 15:52:59.19844
19	Cow	Cathy	\N	2	2023-09-25 15:53:19.374226
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: tpl1122_1
--

COPY public.sightings (id, sighting_datetime, individual_id, sighting_location, is_healthy, scientist_name, scientist_email, created_at) FROM stdin;
1	2023-09-10 08:00:00	1	Savannah	t	Dr. Sarah Johnson	sarah.johnson@example.com	2023-09-20 20:28:40.587487
2	2023-09-12 14:30:00	1	Savannah	f	Dr. David Wilson	david.wilson@example.com	2023-09-20 20:28:40.587487
3	2023-09-11 10:15:00	2	Savannah	t	Dr. Lisa Anderson	lisa.anderson@example.com	2023-09-20 20:28:40.587487
4	2023-09-13 16:45:00	2	Savannah	f	Dr. Michael Wilson	michael.wilson@example.com	2023-09-20 20:28:40.587487
5	2023-09-10 09:30:00	3	Jungle	t	Dr. Emily Davis	emily.davis@example.com	2023-09-20 20:28:40.587487
6	2023-09-12 11:45:00	3	Jungle	f	Dr. John Smith	john.smith@example.com	2023-09-20 20:28:40.587487
7	2023-09-11 08:45:00	4	Jungle	t	Dr. Jessica Taylor	jessica.taylor@example.com	2023-09-20 20:28:40.587487
8	2023-09-13 12:00:00	4	Jungle	f	Dr. Mary Johnson	mary.johnson@example.com	2023-09-20 20:28:40.587487
9	2023-09-10 15:20:00	5	Arctic	t	Dr. Daniel Wilson	daniel.wilson@example.com	2023-09-20 20:28:40.587487
10	2023-09-12 09:30:00	5	Arctic	f	Dr. Robert Clark	robert.clark@example.com	2023-09-20 20:28:40.587487
11	2023-09-11 13:40:00	6	Arctic	t	Dr. Rachel Lee	rachel.lee@example.com	2023-09-20 20:28:40.587487
12	2023-09-13 17:15:00	6	Arctic	f	Dr. Matthew Green	matthew.green@example.com	2023-09-20 20:28:40.587487
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: tpl1122_1
--

COPY public.species (id, common_name, scientific_name, estimated_population, conservation_status_code, created_at) FROM stdin;
1	Lion	Panthera leo	20000	EN	2023-09-20 20:28:11.297703
2	Elephant	Loxodonta africana	415000	VU	2023-09-20 20:28:11.297703
3	Tiger	Panthera tigris	3900	EN	2023-09-20 20:28:11.297703
4	Giraffe	Giraffa camelopardalis	111000	VU	2023-09-20 20:28:11.297703
5	Polar Bear	Ursus maritimus	22000	VU	2023-09-20 20:28:11.297703
6	Panda	Ailuropoda melanoleuca	1800	EN	2023-09-20 20:28:11.297703
\.


--
-- Name: individuals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.individuals_id_seq', 19, true);


--
-- Name: sightings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.sightings_id_seq', 16, true);


--
-- Name: species_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1122_1
--

SELECT pg_catalog.setval('public.species_id_seq', 9, true);


--
-- Name: individuals individuals_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_pkey PRIMARY KEY (id);


--
-- Name: sightings sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: individuals individuals_species_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_species_id_fkey FOREIGN KEY (species_id) REFERENCES public.species(id) ON DELETE CASCADE;


--
-- Name: sightings sightings_individual_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1122_1
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.individuals(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

