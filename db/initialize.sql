create table if not EXISTS users (
    id integer primary key autoincrement,
    username text not null,
    password text not null,
    email text not NULL
);