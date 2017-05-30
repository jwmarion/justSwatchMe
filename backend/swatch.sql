PGDMP     0    &                u           justswatchme    9.6.2    9.6.2     q	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            r	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            s	           1262    25702    justswatchme    DATABASE     ~   CREATE DATABASE justswatchme WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE justswatchme;
             james    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            t	           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12655    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            u	           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    25740    favorite    TABLE     ]   CREATE TABLE favorite (
    id integer NOT NULL,
    userid integer,
    swatchid integer
);
    DROP TABLE public.favorite;
       public         james    false    3            �            1259    25738    favorite_id_seq    SEQUENCE     q   CREATE SEQUENCE favorite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.favorite_id_seq;
       public       james    false    190    3            v	           0    0    favorite_id_seq    SEQUENCE OWNED BY     5   ALTER SEQUENCE favorite_id_seq OWNED BY favorite.id;
            public       james    false    189            �            1259    25716    swatch    TABLE     x   CREATE TABLE swatch (
    id integer NOT NULL,
    userid integer,
    colors text,
    votes text DEFAULT '0'::text
);
    DROP TABLE public.swatch;
       public         james    false    3            �            1259    25714    swatch_id_seq    SEQUENCE     o   CREATE SEQUENCE swatch_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.swatch_id_seq;
       public       james    false    188    3            w	           0    0    swatch_id_seq    SEQUENCE OWNED BY     1   ALTER SEQUENCE swatch_id_seq OWNED BY swatch.id;
            public       james    false    187            �            1259    25705    user    TABLE     W   CREATE TABLE "user" (
    id integer NOT NULL,
    username text,
    password text
);
    DROP TABLE public."user";
       public         james    false    3            �            1259    25703    user_id_seq    SEQUENCE     m   CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public       james    false    186    3            x	           0    0    user_id_seq    SEQUENCE OWNED BY     /   ALTER SEQUENCE user_id_seq OWNED BY "user".id;
            public       james    false    185            �           2604    25743    favorite id    DEFAULT     \   ALTER TABLE ONLY favorite ALTER COLUMN id SET DEFAULT nextval('favorite_id_seq'::regclass);
 :   ALTER TABLE public.favorite ALTER COLUMN id DROP DEFAULT;
       public       james    false    189    190    190            �           2604    25719 	   swatch id    DEFAULT     X   ALTER TABLE ONLY swatch ALTER COLUMN id SET DEFAULT nextval('swatch_id_seq'::regclass);
 8   ALTER TABLE public.swatch ALTER COLUMN id DROP DEFAULT;
       public       james    false    188    187    188            �           2604    25708    user id    DEFAULT     V   ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public       james    false    185    186    186            n	          0    25740    favorite 
   TABLE DATA               1   COPY favorite (id, userid, swatchid) FROM stdin;
    public       james    false    190   w       y	           0    0    favorite_id_seq    SEQUENCE SET     7   SELECT pg_catalog.setval('favorite_id_seq', 37, true);
            public       james    false    189            l	          0    25716    swatch 
   TABLE DATA               4   COPY swatch (id, userid, colors, votes) FROM stdin;
    public       james    false    188   �       z	           0    0    swatch_id_seq    SEQUENCE SET     5   SELECT pg_catalog.setval('swatch_id_seq', 41, true);
            public       james    false    187            j	          0    25705    user 
   TABLE DATA               1   COPY "user" (id, username, password) FROM stdin;
    public       james    false    186   %       {	           0    0    user_id_seq    SEQUENCE SET     2   SELECT pg_catalog.setval('user_id_seq', 2, true);
            public       james    false    185            �           2606    25745    favorite favorite_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY favorite
    ADD CONSTRAINT favorite_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.favorite DROP CONSTRAINT favorite_pkey;
       public         james    false    190    190            �           2606    25725    swatch swatch_pkey 
   CONSTRAINT     I   ALTER TABLE ONLY swatch
    ADD CONSTRAINT swatch_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.swatch DROP CONSTRAINT swatch_pkey;
       public         james    false    188    188            �           2606    25713    user user_pkey 
   CONSTRAINT     G   ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public         james    false    186    186            �           2606    25726    swatch swatch_userid_fkey    FK CONSTRAINT     j   ALTER TABLE ONLY swatch
    ADD CONSTRAINT swatch_userid_fkey FOREIGN KEY (userid) REFERENCES "user"(id);
 C   ALTER TABLE ONLY public.swatch DROP CONSTRAINT swatch_userid_fkey;
       public       james    false    186    2286    188            n	   3   x���  �7[�	�����IFnn1Q��M��g[h=�����l      l	   [  x��M�#7���1����U��f`�l��{(��]*oD�$��F�Z�Kz"i�[����������o���Jo��r��=��!z�{HN��[���f*�+����W)�A���66��� S��y�2O��d�yrKS�#>nxZu{���_߁ׇ�n�QY�t-C*��<�h4V�j�����;� q��B�-�L!4EL��2�%���R#荑��J�6���EF=% ���䨅r�B
�ZHQ{�ǭ�V�(�gaPg�^j�������5:��Ww����}�e���2A�[a��� �M:�	��Q�=W��&˅R
���$C�Ue~�n����n1�ƪ&����~�Cƣ<�g�~ȋ0]�Q��o{������7�a�]{���)�}'��!k����T�ޞ��>�j��ȫ!�#�y��l�D�v1!�::6BRi��#�O�����D�s���j���$d)�"SHduK!E�E��x�� *�/�&�Z�fWw�����I��Hg;A�:Z��ll)d�詓A"�:Ҫ#Ub��?�l�ni>h���2�y�ED�_���C?�_��/��Y��̑��*�
��,ٻb��	$$���R�n��C�-"ԓU=�N�wnD@��Ш^Þ�]x��k�چ}��ꁪ�ɥ��SHx �����������h�^"UH�	�xSƘ��!��iO�I���_��=��e�)$�PS��QRDȸ��㢢[�!�f��'x7��"}�������p�ٖ�n�B�9�&zzp�����{���/!���ҥ����g�����P��OI<|n,�> �=bmזA�v�B�v�B�]���q��2�Q�����      j	   �   x�3��J�M-�T1JT14P�1�0	�4��+�
O4I�3.IK�s.��0wI�tI
���00�s���H1�2�L�O�Q^l`��X`�X�Vihd��]ZP��SU��X�c��i^������Q������ �b*#     