-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations

-- CREATE TABLE CourseProgress (
-- 	id int AUTO_INCREMENT NOT NULL,
-- 	user_id int,
-- 	course_id int,
-- 	progress float DEFAULT 0,
-- 	CONSTRAINT CourseProgress_id PRIMARY KEY(id)
-- );

-- CREATE TABLE ModuleCompletion (
-- 	id int AUTO_INCREMENT NOT NULL,
-- 	user_id int,
-- 	course_id int,
-- 	section_id int,
-- 	module_id int,
-- 	complete tinyint DEFAULT 0,
-- 	CONSTRAINT ModuleCompletion_id PRIMARY KEY(id)
-- );

-- CREATE TABLE SectionProgress (
-- 	id int AUTO_INCREMENT NOT NULL,
-- 	user_id int,
-- 	section_id int,
-- 	course_id int,
-- 	progress float DEFAULT 0,
-- 	CONSTRAINT SectionProgress_id PRIMARY KEY(id)
-- );

-- CREATE INDEX user_id ON CourseProgress (user_id);
-- CREATE INDEX course_id ON CourseProgress (course_id);
-- CREATE INDEX user_id ON ModuleCompletion (user_id);
-- CREATE INDEX course_id ON ModuleCompletion (course_id);
-- CREATE INDEX section_id ON ModuleCompletion (section_id);
-- CREATE INDEX module_id ON ModuleCompletion (module_id);
-- CREATE INDEX user_id ON SectionProgress (user_id);
-- CREATE INDEX section_id ON SectionProgress (section_id);
-- CREATE INDEX course_id ON SectionProgress (course_id);

CREATE TABLE `Users` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50),
  `username` varchar(50),
  `verified` boolean DEFAULT false,
  PRIMARY KEY (`id`)
);

 CREATE TABLE `Sessions` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `token` varchar(50) NOT NULL,
  `user_id` varchar(50),
  `expires` datetime NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `sessions__sessionToken__idx` (`token`)
 );

 CREATE TABLE `SectionProgress` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50),
  `section_id` varchar(50),
  `course_id` varchar(50),
  `progress` tinyint DEFAULT '0',
  KEY `course_id` (`course_id`),
  PRIMARY KEY (`id`)
);
