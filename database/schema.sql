
CREATE DATABASE IF NOT EXISTS seesme_db;
USE seesme_db;

-- Publications Table
CREATE TABLE IF NOT EXISTS publications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    abstract TEXT,
    keywords JSON,
    type ENUM('Journal Article', 'Technical Report', 'Conference Proceeding', 'Geological Map') NOT NULL,
    doi VARCHAR(100),
    url VARCHAR(255),
    downloads INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('Admin', 'Editor', 'Member', 'Guest') DEFAULT 'Guest',
    joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login VARCHAR(100),
    password_hash VARCHAR(255)
);

-- SEO Settings Table
CREATE TABLE IF NOT EXISTS seo_settings (
    page VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    keywords TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- News Table
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category ENUM('Event', 'Achievement', 'Update') NOT NULL,
    date DATE NOT NULL,
    excerpt VARCHAR(500),
    content TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data for Testing
INSERT IGNORE INTO seo_settings (page, title, description, keywords) VALUES 
('home', 'SEESME | Eritrean Geoscience Hub', 'Official digital platform for the Society of Eritrean Earth Scientists and Mining Engineers.', 'Eritrea, Geology, Mining'),
('publications', 'Research Repository | SEESME', 'Access the most comprehensive geological research database in the Horn of Africa.', 'Geology research, technical reports');
