ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

GRANT ALL PRIVILEGES ON dsw.* TO 'dsw-backend'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE dsw;

FLUSH privileges;


