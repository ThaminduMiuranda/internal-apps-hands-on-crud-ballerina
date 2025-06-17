CREATE DATABASE IF NOT EXISTS learning_portal_database;
USE learning_portal_database;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('student', 'instructor', 'admin') NOT NULL,
    phone VARCHAR(15)
);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    instructor_id INT NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES users(id)
);

CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(user_id, course_id)
);

-- Insert some sample users
INSERT INTO users (name, email, role, phone) VALUES
('Alice Perera', 'alice@example.com', 'student', '+94711234567'),
('Bob Silva', 'bob@example.com', 'instructor', '+94779876543'),
('Carol Fernando', 'carol@example.com', 'student', '+94754567890'),
('David Jayasuriya', 'david@example.com', 'student', '+94781122334'),
('Jayath Perera', 'jayath@example.com', 'admin', '+94763495928');