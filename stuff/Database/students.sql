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

insert into students (first_name, last_name, email, password, role) values ('admin', 'admin', 'admin@admin', 'jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=', 'admin');
insert into students (first_name, last_name, email, password, role, college_id) values ('Mable', 'Reynish', 'mreynish0@pinterest.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 6);
insert into students (first_name, last_name, email, password, role, college_id) values ('Cassandra', 'Slyvester', 'cslyvester1@google.ru', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 9);
insert into students (first_name, last_name, email, password, role, college_id) values ('Elayne', 'Lettley', 'elettley2@businesswire.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 8);
insert into students (first_name, last_name, email, password, role, college_id) values ('Inigo', 'Kleinstein', 'ikleinstein3@hc360.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 2);
insert into students (first_name, last_name, email, password, role, college_id) values ('Shari', 'Manners', 'smanners4@blogs.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 7);
insert into students (first_name, last_name, email, password, role, college_id) values ('Benni', 'Gittoes', 'bgittoes5@fastcompany.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 8);
insert into students (first_name, last_name, email, password, role, college_id) values ('Tammie', 'Jeram', 'tjeram6@ucla.edu', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 2);
insert into students (first_name, last_name, email, password, role, college_id) values ('Amalee', 'Andrzejczak', 'aandrzejczak7@wordpress.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 6);
insert into students (first_name, last_name, email, password, role, college_id) values ('Whit', 'Ritchley', 'writchley8@techcrunch.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 4);
insert into students (first_name, last_name, email, password, role, college_id) values ('Guglielma', 'Fysh', 'gfysh9@delicious.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 3);
insert into students (first_name, last_name, email, password, role, college_id) values ('Beckie', 'Ingree', 'bingreea@ustream.tv', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 4);
insert into students (first_name, last_name, email, password, role, college_id) values ('Curtis', 'Houlridge', 'choulridgeb@netvibes.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 5);
insert into students (first_name, last_name, email, password, role, college_id) values ('Ondrea', 'Mann', 'omannc@cbc.ca', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 3);
insert into students (first_name, last_name, email, password, role, college_id) values ('Reg', 'Kermit', 'rkermitd@freewebs.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 2);
insert into students (first_name, last_name, email, password, role, college_id) values ('Gray', 'Lombardo', 'glombardoe@bravesites.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 5);
insert into students (first_name, last_name, email, password, role, college_id) values ('Kylie', 'Grange', 'kgrangef@google.nl', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 7);
insert into students (first_name, last_name, email, password, role, college_id) values ('Omar', 'Voice', 'ovoiceg@jimdo.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 5);
insert into students (first_name, last_name, email, password, role, college_id) values ('Arabel', 'Gullam', 'agullamh@chron.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 8);
insert into students (first_name, last_name, email, password, role, college_id) values ('Belinda', 'Barks', 'bbarksi@sakura.ne.jp', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 7);
insert into students (first_name, last_name, email, password, role, college_id) values ('Vidovik', 'Harriagn', 'vharriagnj@chicagotribune.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 6);
insert into students (first_name, last_name, email, password, role, college_id) values ('Anthiathia', 'Biggen', 'abiggenk@google.fr', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 4);
insert into students (first_name, last_name, email, password, role, college_id) values ('Corrie', 'Cornbell', 'ccornbelll@miibeian.gov.cn', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 5);
insert into students (first_name, last_name, email, password, role, college_id) values ('Donnie', 'Tampling', 'dtamplingm@businesswire.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 4);
insert into students (first_name, last_name, email, password, role, college_id) values ('Lindsey', 'Duchatel', 'lduchateln@auda.org.au', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 5);
insert into students (first_name, last_name, email, password, role, college_id) values ('Pia', 'Swindells', 'pswindellso@webeden.co.uk', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 7);
insert into students (first_name, last_name, email, password, role, college_id) values ('Immanuel', 'Cowely', 'icowelyp@bloglines.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 4);
insert into students (first_name, last_name, email, password, role, college_id) values ('Pren', 'Chieze', 'pchiezeq@gov.uk', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 8);
insert into students (first_name, last_name, email, password, role, college_id) values ('Ailis', 'Witcherley', 'awitcherleyr@purevolume.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 3);
insert into students (first_name, last_name, email, password, role, college_id) values ('Giovanni', 'Matyukon', 'gmatyukons@npr.org', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 2);
insert into students (first_name, last_name, email, password, role, college_id) values ('Nanon', 'Donovin', 'ndonovint@sphinn.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'user', 9);