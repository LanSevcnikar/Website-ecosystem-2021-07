drop table colleges;

create table colleges (
  id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	location VARCHAR(50) NOT NULL,
	rating DECIMAL(2,1) NOT NULL
);
insert into colleges (name, location, rating) values ('Innotype', 'Huddinge', 1.1);
insert into colleges (name, location, rating) values ('Browseblab', 'Lajedo', 4.7);
insert into colleges (name, location, rating) values ('Livepath', 'Gajrug', 3.5);
insert into colleges (name, location, rating) values ('Jaxworks', 'Beitou', 4.7);
insert into colleges (name, location, rating) values ('Skilith', 'Alexandria', 3.6);
insert into colleges (name, location, rating) values ('Shufflebeat', 'San Diego', 1.1);
insert into colleges (name, location, rating) values ('Youspan', 'Pagarbatu', 2.8);
insert into colleges (name, location, rating) values ('Rhynyx', 'Murmansk', 1.3);
insert into colleges (name, location, rating) values ('Wikizz', 'Caen', 3.3);