DROP TABLE IF EXISTS posts;

DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS users(
   id SERIAL PRIMARY KEY,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(100) NOT NULL
   );

CREATE TABLE IF NOT EXISTS posts(
     id SERIAL PRIMARY KEY,
     user_id INT NOT NULL,
     title VARCHAR(255) NOT NULL,
     content VARCHAR(1000) NOT NULL,
     created_at TIMESTAMPTZ NOT NULL DEFAULT 
     CURRENT_TIMESTAMP,
     CONSTRAINT fk_users
      FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE

);