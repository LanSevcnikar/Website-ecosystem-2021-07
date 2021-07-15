drop table students;

create table students (
  id BIGSERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	role VARCHAR(50),
	college_id INT
);
insert into students (first_name, last_name, email, password, role, college_id) values ('Mable', 'Reynish', 'mreynish0@pinterest.com', 'y94K1ASVOD8D', 'Subcontractor', 6);
insert into students (first_name, last_name, email, password, role, college_id) values ('Cassandra', 'Slyvester', 'cslyvester1@google.ru', 'k4jWHPjMWI', 'Architect', 9);
insert into students (first_name, last_name, email, password, role, college_id) values ('Elayne', 'Lettley', 'elettley2@businesswire.com', 'TNdLtZOEUNGI', 'Subcontractor', 8);
insert into students (first_name, last_name, email, password, role, college_id) values ('Inigo', 'Kleinstein', 'ikleinstein3@hc360.com', '1tqcts4azq', 'Construction Manager', 2);
insert into students (first_name, last_name, email, password, role, college_id) values ('Shari', 'Manners', 'smanners4@blogs.com', 'p8tayu94d7o', 'Electrician', 7);
insert into students (first_name, last_name, email, password, role, college_id) values ('Benni', 'Gittoes', 'bgittoes5@fastcompany.com', '7M2dj93J', 'Project Manager', 8);
insert into students (first_name, last_name, email, password, role, college_id) values ('Tammie', 'Jeram', 'tjeram6@ucla.edu', 'LbwfwQq4', 'Project Manager', 2);
insert into students (first_name, last_name, email, password, role, college_id) values ('Amalee', 'Andrzejczak', 'aandrzejczak7@wordpress.com', 'QJEOqh8', 'Construction Foreman', 6);
insert into students (first_name, last_name, email, password, role, college_id) values ('Whit', 'Ritchley', 'writchley8@techcrunch.com', 'FYlGWLktU', 'Construction Worker', 4);
insert into students (first_name, last_name, email, password, role, college_id) values ('Guglielma', 'Fysh', 'gfysh9@delicious.com', 'a4SpKURxyS', 'Architect', 3);
insert into students (first_name, last_name, email, password, role, college_id) values ('Beckie', 'Ingree', 'bingreea@ustream.tv', 'zIGr32Y', 'Subcontractor', 4);
insert into students (first_name, last_name, email, password, role, college_id) values ('Curtis', 'Houlridge', 'choulridgeb@netvibes.com', 'M1r11D', 'Engineer', 5);
insert into students (first_name, last_name, email, password, role, college_id) values ('Ondrea', 'Mann', 'omannc@cbc.ca', 'By7GJLlLpG96', 'Construction Worker', 3);
insert into students (first_name, last_name, email, password, role, college_id) values ('Reg', 'Kermit', 'rkermitd@freewebs.com', 'nLAR6Iw', 'Electrician', 2);
insert into students (first_name, last_name, email, password, role, college_id) values ('Gray', 'Lombardo', 'glombardoe@bravesites.com', 'LqBTgjleIT', 'Engineer', 5);
insert into students (first_name, last_name, email, password, role, college_id) values ('Kylie', 'Grange', 'kgrangef@google.nl', 'i56ACQo', 'Electrician', 7);
insert into students (first_name, last_name, email, password, role, college_id) values ('Omar', 'Voice', 'ovoiceg@jimdo.com', 'gspwx9', 'Electrician', 5);
insert into students (first_name, last_name, email, password, role, college_id) values ('Arabel', 'Gullam', 'agullamh@chron.com', '396qfFZ217', 'Surveyor', 8);
insert into students (first_name, last_name, email, password, role, college_id) values ('Belinda', 'Barks', 'bbarksi@sakura.ne.jp', 'JOgo3Bi', 'Supervisor', 7);
insert into students (first_name, last_name, email, password, role, college_id) values ('Vidovik', 'Harriagn', 'vharriagnj@chicagotribune.com', 'oqWzLzLKhO', 'Electrician', 6);
insert into students (first_name, last_name, email, password, role, college_id) values ('Anthiathia', 'Biggen', 'abiggenk@google.fr', 'XDL2hs2bfAQU', 'Construction Manager', 4);
insert into students (first_name, last_name, email, password, role, college_id) values ('Corrie', 'Cornbell', 'ccornbelll@miibeian.gov.cn', '1K9OzmoOIpr', 'Surveyor', 5);
insert into students (first_name, last_name, email, password, role, college_id) values ('Donnie', 'Tampling', 'dtamplingm@businesswire.com', 'joibO9f', 'Project Manager', 4);
insert into students (first_name, last_name, email, password, role, college_id) values ('Lindsey', 'Duchatel', 'lduchateln@auda.org.au', 'JVKV5vZ', 'Estimator', 5);
insert into students (first_name, last_name, email, password, role, college_id) values ('Pia', 'Swindells', 'pswindellso@webeden.co.uk', 'TwsIt1LFwb20', 'Electrician', 7);
insert into students (first_name, last_name, email, password, role, college_id) values ('Immanuel', 'Cowely', 'icowelyp@bloglines.com', 'sTJ5BVaU', 'Surveyor', 4);
insert into students (first_name, last_name, email, password, role, college_id) values ('Pren', 'Chieze', 'pchiezeq@gov.uk', 'TL0ZKrl8JM3O', 'Subcontractor', 8);
insert into students (first_name, last_name, email, password, role, college_id) values ('Ailis', 'Witcherley', 'awitcherleyr@purevolume.com', 'SduAzVWugna9', 'Project Manager', 3);
insert into students (first_name, last_name, email, password, role, college_id) values ('Giovanni', 'Matyukon', 'gmatyukons@npr.org', 'pZPWmfMUro', 'Construction Foreman', 2);
insert into students (first_name, last_name, email, password, role, college_id) values ('Nanon', 'Donovin', 'ndonovint@sphinn.com', 'Dmt6HI6cP', 'Electrician', 9);