-- 1. Insert Courses
INSERT IGNORE INTO course (course_id, course_name, description) VALUES
('DBMS101', 'database management and system', 'Relational databases and SQL.'),
('DM101', 'discrete mathematics', 'Logic, sets, and graph theory.'),
('DLCA101', 'digital logic and computer architecture', 'Boolean algebra and system architecture.'),
('FCS101', 'fundamentals of cyber security and tools', 'Network security and cryptography.'),
('DAA101', 'design analysis and algorithms', 'Algorithmic complexity and optimization.'),
('JAVA101', 'java programming', 'Object-oriented programming in Java.');

-- 2. Insert Peers
INSERT IGNORE INTO user (id, name, email, password, role) VALUES
(101, 'Muzzamil Khan', 'muzzamil@studysync.com', 'dummy_hash', 1),
(102, 'Priya Patel', 'priya@studysync.com', 'dummy_hash', 1),
(103, 'Arjun Reddy', 'arjun@studysync.com', 'dummy_hash', 1);

-- 3. Insert Study Groups (Updated to match Group.java)
INSERT IGNORE INTO study_group (group_id, name, description, associated_course_id, created_by_userid, privacy, passkey, member_limit) VALUES
(101, 'DSA Problem Solvers', 'Daily algorithmic practice and graph review.', 'CS201', 101, 'PUBLIC', NULL, 50),
(102, 'SQL Masters', 'Database normalization and query optimization.', 'CS301', 102, 'PUBLIC', NULL, 30);

-- 4. Insert Upcoming Calendar Events 
INSERT IGNORE INTO calendar_events (id, topic, start_time, end_time, group_id, organizer_name) VALUES
(101, 'Graph Algorithms Review', '2026-10-31 18:00:00', '2026-10-31 20:00:00', 101, 'Muzzamil Khan'),
(102, 'Normalization Quiz Prep', '2026-11-02 15:00:00', '2026-11-02 16:30:00', 102, 'Priya Patel');

-- 5. Insert Notifications for your logged-in user (Assumes your ID is 1)
INSERT IGNORE INTO notifications (id, user_id, message, is_read, created_at, type) VALUES
(101, 1, 'Muzzamil invited you to join DSA Problem Solvers.', false, '2026-10-29 10:00:00', 'Alert'),
(102, 1, 'New syllabus uploaded for Computer Graphics.', false, '2026-10-28 14:00:00', 'Alert');

-- 6. Enroll your logged-in user (Assumes your ID is 1) into the groups
INSERT IGNORE INTO group_member (group_id, user_id, role) VALUES
(101, 1, 'MEMBER'),
(102, 1, 'MEMBER');