CREATE DATABASE db_activity3D;
USE db_activity3D;

CREATE TABLE tbl_users (
    fld_recno     INT AUTO_INCREMENT PRIMARY KEY,
    fld_lname     VARCHAR(100),
    fld_mname     VARCHAR(100),
    fld_fname     VARCHAR(100),
    fld_extname   VARCHAR(5),
    fld_username  VARCHAR(25) UNIQUE,
    fld_email     VARCHAR(100) UNIQUE
);

CREATE TABLE tbl_messages (
    fld_recno     INT AUTO_INCREMENT PRIMARY KEY,
    fld_username  VARCHAR(25),
    fld_messages  TEXT,