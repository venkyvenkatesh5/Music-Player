DROP DATABASE IF EXISTS music_db;
CREATE DATABASE music_db;
USE music_db;

CREATE TABLE songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  path VARCHAR(255),
  displayName VARCHAR(255),
  cover VARCHAR(255),
  artist VARCHAR(255)
);

INSERT INTO songs (path, displayName, cover, artist) VALUES
('media/song1.mp3', 'BGM Of Premalu', 'media/image-1.jpg', 'Vishnu Vijay | Shakthisree Gopalan | Kapil Kapilan'),
('media/song2.mp3', 'Suttamla Soosi', 'media/image-2.jpg', 'VishwakSen, Neha Shetty | Yuvan Shankar Raja'),
('media/song3.mp3', 'Chaleya', 'media/image-3.jpg', 'Arijit Singh, Shilpa Rao'),
('media/song4.mp3', 'Nadaniya', 'media/image-4.jpg', 'Akshath'),
('media/song5.mp3', 'O-Sajni-Re', 'media/image-5.jpg', 'Arijit Singh, Ram Sampath | Laapataa Ladies | Aamir Khan Productions');
