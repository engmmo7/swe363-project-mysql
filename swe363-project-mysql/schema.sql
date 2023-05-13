CREATE DATABASE dammam_sport_center_app;
USE dammam_sport_center_app;


CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  type VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users (type, name, email, password) VALUES
('admin','Ahmad Mohammed', 'ahmad@example.com', 'mypassword1'),
('user','Mohammed Ali', 'mohammed@example.com', 'mypassword2'),
('user','Ali Hussein', 'ali@example.com', 'mypassword3'),
('user','Noura Salem', 'noura@example.com', 'mypassword4'),
('user','Sara Omar', 'sara@example.com', 'mypassword5'),
('user','Maryam Abdullah', 'maryam@example.com', 'mypassword6'),
('user','Omar Abdulrahman', 'omar@example.com', 'mypassword7'),
('user','Fatima Saeed', 'fatima@example.com', 'mypassword8'),
('user','Abdullah Khaled', 'abdullah@example.com', 'mypassword9'),
('user','Hassan Abdullah', 'hassan@example.com', 'mypassword10');

CREATE TABLE Tournaments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  type VARCHAR(255) NOT NULL,
  tournament_name VARCHAR(255) NOT NULL,
  stadium_id INT(11) NOT NULL,
  image_id INT(11) NOT NULL,
  time TIME NOT NULL,
  day VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_stadiumId FOREIGN KEY (stadium_id) REFERENCES Stadiums(id),
  CONSTRAINT fk_imageId FOREIGN KEY (image_id) REFERENCES Images(id)
);



INSERT INTO Tournaments (type, tournament_name, stadium_id, image_id, time, day, price) VALUES
('FOOTBALL', 'Football League Final' , 1 , 1, '21:00:00', 'Saturday', 20.00),
('TENNIS' ,'Tennis Tournament', 2 , 2, '18:00:00', 'Saturday', 40.00),
('BASKETBALL', 'Basketball League',3, 3, '18:00:00', 'Monday', 15.00),
('VARSITY', 'Varsity Championship',2, 4, '18:00:00', 'Saturday', 40.00),
('HANDBALL','Handball Championship',3, 5, '19:00:00', 'Friday', 15.00),
('VOLLEY BALL', 'Volleyball Championship',3, 6, '21:00:00', 'Monday', 25.00);


CREATE TABLE Academics (
  id INT(11) NOT NULL AUTO_INCREMENT,
  type VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO Academics (type, price, image_id) VALUES
('FOOTBALL', 400.00, 1),
('TENNIS', 250.00, 2),
('BASKETBALL', 400.00, 3),
('VARSITY', 250.00, 4),
('HANDBALL', 450.00, 5),
('VOLLEY BALL', 250.00, 6);

CREATE TABLE Matches (
  id INT(11) NOT NULL AUTO_INCREMENT,
  match_date DATE NOT NULL,
  match_time TIME NOT NULL,
  tournament_id INT(11) NOT NULL,
  team1_name VARCHAR(255) NOT NULL,
  team2_name VARCHAR(255) NOT NULL,
  score VARCHAR(10) DEFAULT NULL,
  image_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_tournament FOREIGN KEY (tournament_id) REFERENCES Tournaments(id),
  CONSTRAINT fk_image_id FOREIGN KEY (image_id) REFERENCES Images(id)
);

INSERT INTO Matches (match_date, match_time, tournament_id, team1_name, team2_name, score, image_id) VALUES
('2023-05-12', '14:00:00', 1, 'Al-Raed', 'Al-Qadisiyah', NULL, 1),
('2023-05-12', '16:00:00', 1, 'Al-Ittifaq', 'Al-Hazm', NULL, 1),
('2023-05-12', '18:00:00', 2, 'Al-Ettifaq','Al-Qadsiah' , NULL, 2),
('2023-05-12', '19:00:00', 3, 'Al-Fateh', 'Al-Ittihad', NULL, 3),
('2023-05-12', '20:00:00', 4, 'Al-Ittihad', 'Al-Fateh', NULL, 4),
('2023-05-12', '20:00:00', 5, 'Al-Hilal', 'Al-Ittihad', NULL, 5),
('2023-05-12', '19:00:00', 5, 'Al-Ahli', 'Al-Shabab', NULL, 6),
('2023-05-12', '17:00:00', 6, 'Al-Nassr', 'Al-Hilal', NULL, 6);

CREATE TABLE Images (
  id INT(11) NOT NULL AUTO_INCREMENT,
  imageUrl VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO Images (imageUrl) VALUES
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjVEmV3KilkKElo7y0Q7K_VpW-GwM1XJxHuA&usqp=CAU'),
('https://thumbs.dreamstime.com/z/%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C-tennis-logo-design-icon-two-crossed-rackets-ball-vector-illustration-209805642.jpg'),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaef0eFRUWRwr6jsc9mpsaMbYpxHbjnh3DPg&usqp=CAU'),
('https://www.soccer-field.net/images/service/squash.png'),
('https://www.soccer-field.net/images/service/handball.png'),
('https://media.istockphoto.com/id/1305166860/vector/volleyball-sports-glyph-icon.jpg?s=170667a&w=0&k=20&c=7vywTrz7MtunkHxWcWFnPmPaxl0xaFhyNPYvIYkw4kY='),
('https://wyndhamgardendammam.com/wp-content/uploads/2018/09/stadium-683x655.jpg'),
('https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2021/11/15/2915601-1327954342.png?itok=VttSMmNt'),
('https://www.arabnews.com/sites/default/files/styles/n_670_395/public/media/24/11/2012/dammam_fahd-AN.jpg?itok=MvGVVu0I'),
('https://i.goalzz.com/?i=katkotati%2Fstade%2Fksa%2Fprince+saud+bin+jalawi.jpg'),
('https://i.goalzz.com/?i=ronny%2funtitled-122.gif');

CREATE TABLE Stadiums (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  image_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_imageIId FOREIGN KEY (image_id) REFERENCES Images(id)
);

INSERT INTO Stadiums (name , image_id) VALUES
('PRINCE MOHAMMAD BIN FAHD STADIUM' , 7),
('King Fahd International Stadium' ,8),
('Ministry of Sports Hall stadium' ,9),
('Dammam Uni stadium' ,10),
('Prince Saud Bin Jalawi Stadium' ,11);
