create table school (
	schoolId int not null identity(1,1) primary key,
	schoolName varchar(250) not null,
	[UID] varchar(250) null,
	eMail varchar(250) null,
	active bit not null
)

create table teacher (
	teacherId int not null identity(1,1) primary key,
	schoolId int foreign key references school(schoolId),
	FirstName varchar(250) not null,
	LastName varchar(250) not null,
	userName varchar(250) not null,
	pin int not null
)

create table student (
	studentId int not null identity(1,1) primary key,
	schoolId int foreign key references school(schoolId),
	FirstName varchar(250) not null,
	LastName varchar(250) not null,
	Birthday date not null,
	gradeYear int not null,
	UserName varchar(250) not null,
	pin int not null
)

create table [subject] (
	subjectId int not null identity(1,1) primary key,
	subjectType varchar(250) not null
)

create table assignmentType (
	assignmentTypeId int not null identity(1,1) primary key,
	assignmentType varchar(250) not null
)

create table classSchedule (
	classId int not null identity(1,1) primary key,
	studentId int foreign key references student(studentId),
	subjectId int foreign key references [subject](subjectId),
	[DayOfWeek] varchar(250) not null,
	timeSlot time not null,
	classTitle varchar(250) null
)

create table assignment (
	assignmentId int not null identity(1,1) primary key,
	studentId int foreign key references student(studentId),
	classId int foreign key references classSchedule(classId),
	assignmentTypeId int foreign key references assignmentType(assignmentTypeId),
	subjectId int foreign key references [subject](subjectId),
	instructions varchar(1000) not null,
	completed bit not null,
	grade decimal null,
	dateAssigned date not null,
	dateDue date not null,
	dateComplete date not null
)

insert into school (schoolName, eMail, active)
values ('Home Base Education', 'cyberchyk@gmail.com', 1)

insert into teacher (schoolId, FirstName, LastName, userName, pin)
values (1, 'Betty', 'Boop', 'BettyBoop', 1234)

insert into student (schoolId, FirstName, LastName, Birthday, gradeYear, UserName, pin)
values (1, 'Bobby', 'Boop', '05/06/2010', 5, 'Bobster', 4321)

insert into [subject](subjectType)
values ('math'), ('science'), ('english'), ('reading'), ('spelling'), ('history'), ('art'), ('physical education'), ('home economics'), ('music')

insert into assignmentType(assignmentType)
values ('reading'), ('worksheet'), ('lecture'), ('movie'), ('test'), ('project')

ALTER TABLE assignment
ADD assignmentTitle varchar(255) not null

insert into classSchedule(studentId, subjectId, [DayOfWeek], timeSlot, classTitle)
values (1, 1, 'monday', '8:00 AM', 'Math 4')

insert into assignment(studentId, classId, assignmentTypeId, subjectId, instructions, completed, grade, dateAssigned, dateDue, dateComplete, assignmentTitle)
values (1, 1, 2, 1, 'Fill out worksheet on page 109.', 1, 3.2, '07/06/2020', '07/07/2020', '07/07/2020', 'Fun With Numbers')

select * from assignment

ALTER TABLE assignment
alter column grade decimal(18,2)


