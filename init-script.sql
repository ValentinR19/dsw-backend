ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
CREATE USER 'dsw-backend'@'%' IDENTIFIED WITH mysql_native_password BY 'root'
GRANT ALL PRIVILEGES ON dsw.* TO 'dsw-backend'@'%';

FLUSH privileges;
CREATE DATABASE dsw;
