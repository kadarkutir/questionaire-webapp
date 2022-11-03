create table if not EXISTS users (
    id integer primary key autoincrement,
    username text not null,
    password text not null,
    email text not NULL
);

create table if not exists questions (
    title text not null,
    createdBy text not NULL,
    question1 text not NULL,
    question2 text not NULL,
    question3 text not NULL,
    question4 text not NULL,
    question5 text not NULL,
    question6 text not NULL,
    question7 text not NULL,
    question8 text not NULL,
    question9 text not NULL,
    question10 text not NULL,
    createdAt datetime NOT NULL
);

CREATE table if not EXISTS answers (
    title text not null,
    answeredBy text not NULL,
    answer1 text not NULL,
    answer2 text not NULL,
    answer3 text not NULL,
    answer4 text not NULL,
    answer5 text not NULL,
    answer6 text not NULL,
    answer7 text not NULL,
    answer8 text not NULL,
    answer9 text not NULL,
    answer10 text not NULL,
    answeredAt datetime not NULL
);
