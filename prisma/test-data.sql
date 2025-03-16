-- Boffin Institute Test Data SQL
-- This file contains INSERT statements for populating the Neon DB with test data
-- Created: 2025-03-16

-- Clean up existing data (if any)
-- Note: Use with caution in production environments
TRUNCATE TABLE "testimonials" CASCADE;
TRUNCATE TABLE "registrations" CASCADE;
TRUNCATE TABLE "course_reviews" CASCADE;
TRUNCATE TABLE "course_faqs" CASCADE;
TRUNCATE TABLE "learning_objectives" CASCADE;
TRUNCATE TABLE "module_topics" CASCADE;
TRUNCATE TABLE "course_modules" CASCADE;
TRUNCATE TABLE "course_discounts" CASCADE;
TRUNCATE TABLE "course_instructors" CASCADE;
TRUNCATE TABLE "courses" CASCADE;
TRUNCATE TABLE "course_categories" CASCADE;
TRUNCATE TABLE "instructors" CASCADE;
TRUNCATE TABLE "users" CASCADE;
TRUNCATE TABLE "media_placeholder_assignments" CASCADE;
TRUNCATE TABLE "media_placeholders" CASCADE;
TRUNCATE TABLE "media_assets" CASCADE;

-- Insert Users
INSERT INTO "users" (id, first_name, last_name, email, password, phone, address, city, state, zip_code, country, role, is_active, created_at, updated_at)
VALUES 
(1, 'Admin', 'User', 'admin@boffininstitute.com', '$2a$10$XFE0rDoJcQ.zfl3yFj8keuM.RNg4FgpOSGcTJebY3YZRbBMHqRyLG', '+94712345678', '123 Admin St', 'Colombo', 'Western', '10000', 'Sri Lanka', 'admin', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'John', 'Doe', 'john.doe@example.com', '$2a$10$XFE0rDoJcQ.zfl3yFj8keuM.RNg4FgpOSGcTJebY3YZRbBMHqRyLG', '+94723456789', '456 Student Ave', 'Colombo', 'Western', '10100', 'Sri Lanka', 'student', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Jane', 'Smith', 'jane.smith@example.com', '$2a$10$XFE0rDoJcQ.zfl3yFj8keuM.RNg4FgpOSGcTJebY3YZRbBMHqRyLG', '+94734567890', '789 Learner Blvd', 'Kandy', 'Central', '20000', 'Sri Lanka', 'student', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Sarah', 'Johnson', 'sarah.johnson@example.com', '$2a$10$XFE0rDoJcQ.zfl3yFj8keuM.RNg4FgpOSGcTJebY3YZRbBMHqRyLG', '+94745678901', '101 Education Rd', 'Galle', 'Southern', '80000', 'Sri Lanka', 'student', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Course Categories
INSERT INTO "course_categories" (id, name, description, slug, image_url, created_at, updated_at, is_active)
VALUES 
(1, 'DASACA', 'Data Science and Analytics Certification Academy', 'dasaca', '/images/categories/dasaca.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true),
(2, 'BootCamp', 'Intensive bootcamp programs for rapid skill development', 'bootcamp', '/images/categories/bootcamp.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true),
(3, 'Corporate', 'Customized training solutions for businesses', 'corporate', '/images/categories/corporate.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true);

-- Insert Instructors
INSERT INTO "instructors" (id, name, bio, profile_image_url, expertise, email, social_links, created_at, updated_at)
VALUES 
(1, 'Dr. Jane Smith', 'Expert in data science with over 10 years of industry experience', '/images/instructors/jane-smith.jpg', ARRAY['Data Science', 'Machine Learning', 'Python'], 'jane.smith@example.com', '{"linkedin": "https://linkedin.com/in/janesmith", "twitter": "https://twitter.com/janesmith"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Prof. Robert Johnson', 'Leading expert in artificial intelligence and deep learning', '/images/instructors/robert-johnson.jpg', ARRAY['Artificial Intelligence', 'Deep Learning', 'Neural Networks'], 'robert.johnson@example.com', '{"linkedin": "https://linkedin.com/in/robertjohnson", "github": "https://github.com/robertjohnson"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Dr. Samantha Lee', 'Specialist in big data analytics and cloud computing', '/images/instructors/samantha-lee.jpg', ARRAY['Big Data', 'Cloud Computing', 'Data Engineering'], 'samantha.lee@example.com', '{"linkedin": "https://linkedin.com/in/samanthalee", "website": "https://samanthalee.com"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Courses
INSERT INTO "courses" (id, category_id, title, short_description, long_description, learning_outcomes, prerequisites, target_audience, slug, featured_image_url, gallery_images, level, delivery_mode, language, duration_weeks, duration_hours, regular_price, sale_price, certification_included, status, created_at, updated_at, published_at)
VALUES 
(1, 1, 'Data Science Fundamentals', 'Master the core concepts of data science and analytics', 'This comprehensive course covers all the essential concepts of data science, from data collection and cleaning to advanced analytics and visualization techniques.', ARRAY['Understand the data science workflow', 'Master data cleaning and preprocessing techniques', 'Apply statistical methods to analyze data', 'Create compelling data visualizations', 'Build predictive models using machine learning'], ARRAY['Basic knowledge of mathematics', 'Familiarity with programming concepts'], 'Aspiring data scientists, analysts, and professionals looking to enhance their data skills', 'data-science-fundamentals', '/images/courses/data-science.jpg', ARRAY['/images/courses/data-science-1.jpg', '/images/courses/data-science-2.jpg'], 'Intermediate', 'Online', 'English', 12, 120, 1499.99, 1299.99, true, 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Full Stack Web Development', 'Become a proficient full stack developer in 16 weeks', 'Learn front-end and back-end development technologies to build complete web applications. This bootcamp covers HTML, CSS, JavaScript, React, Node.js, and database integration.', ARRAY['Build responsive and interactive web interfaces', 'Develop RESTful APIs using Node.js', 'Work with databases and data modeling', 'Deploy applications to cloud platforms', 'Implement authentication and authorization'], ARRAY['Basic computer literacy', 'Problem-solving aptitude'], 'Career changers, IT graduates, and coding enthusiasts', 'full-stack-web-development', '/images/courses/web-dev.jpg', ARRAY['/images/courses/web-dev-1.jpg', '/images/courses/web-dev-2.jpg'], 'Beginner', 'Hybrid', 'English', 16, 160, 1999.99, 1799.99, true, 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 'Data-Driven Decision Making for Executives', 'Empower your leadership with data-driven insights', 'This executive program teaches business leaders how to leverage data analytics for strategic decision-making, competitive advantage, and organizational transformation.', ARRAY['Interpret complex data analytics reports', 'Make strategic decisions based on data insights', 'Foster a data-driven culture in your organization', 'Evaluate and implement data solutions', 'Understand ethical implications of data usage'], ARRAY['Management experience', 'Basic business knowledge'], 'C-suite executives, directors, and senior managers', 'data-driven-decision-making', '/images/courses/executive.jpg', ARRAY['/images/courses/executive-1.jpg', '/images/courses/executive-2.jpg'], 'Advanced', 'In-person', 'English', 4, 32, 2999.99, 2799.99, true, 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Course Instructors
INSERT INTO "course_instructors" (course_id, instructor_id, created_at)
VALUES 
(1, 1, CURRENT_TIMESTAMP),
(1, 3, CURRENT_TIMESTAMP),
(2, 2, CURRENT_TIMESTAMP),
(3, 1, CURRENT_TIMESTAMP),
(3, 2, CURRENT_TIMESTAMP);

-- Insert Course Modules
INSERT INTO "course_modules" (id, course_id, title, description, order_index, duration_hours, is_free_preview, created_at, updated_at)
VALUES 
(1, 1, 'Introduction to Data Science', 'Learn the fundamentals of data science and its applications', 1, 10.5, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Data Collection and Preprocessing', 'Master techniques for gathering and cleaning data', 2, 15.0, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 1, 'Exploratory Data Analysis', 'Discover patterns and insights through data visualization', 3, 18.0, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 1, 'Machine Learning Fundamentals', 'Introduction to predictive modeling and algorithms', 4, 25.0, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 2, 'HTML & CSS Fundamentals', 'Build the foundation of web development', 1, 20.0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 2, 'JavaScript Programming', 'Add interactivity to your websites', 2, 30.0, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 2, 'React Framework', 'Build modern user interfaces with React', 3, 40.0, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 3, 'Data Analytics for Business', 'Understanding how data drives business decisions', 1, 8.0, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 3, 'Strategic Implementation', 'Applying data insights to business strategy', 2, 10.0, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Module Topics
INSERT INTO "module_topics" (id, module_id, title, description, content, order_index, duration_minutes, video_url, created_at, updated_at)
VALUES 
(1, 1, 'What is Data Science?', 'Understanding the field of data science and its importance', 'Detailed content about the definition and importance of data science', 1, 45, 'https://example.com/videos/intro-to-ds.mp4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'The Data Science Process', 'Overview of the end-to-end data science workflow', 'Content covering the steps in the data science process', 2, 60, 'https://example.com/videos/ds-process.mp4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 2, 'Data Collection Methods', 'Techniques for gathering data from various sources', 'Content about different data collection methods and sources', 1, 90, 'https://example.com/videos/data-collection.mp4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 5, 'HTML Document Structure', 'Understanding the basic structure of HTML documents', 'Content about HTML elements, tags, and document structure', 1, 60, 'https://example.com/videos/html-basics.mp4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 5, 'CSS Styling Fundamentals', 'Learn how to style HTML elements with CSS', 'Content covering CSS selectors, properties, and styling techniques', 2, 90, 'https://example.com/videos/css-basics.mp4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Learning Objectives
INSERT INTO "learning_objectives" (id, topic_id, description, order_index, created_at, updated_at)
VALUES 
(1, 1, 'Define data science and its key components', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Explain the role of a data scientist in organizations', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 2, 'Identify the stages of the data science lifecycle', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 'Compare different data collection techniques', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 4, 'Create a basic HTML document with proper structure', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 5, 'Apply CSS styles to HTML elements', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Course FAQs
INSERT INTO "course_faqs" (id, course_id, question, answer, order_index, created_at, updated_at)
VALUES 
(1, 1, 'Do I need programming experience for this course?', 'While some familiarity with programming concepts is helpful, we start with the basics and gradually build your skills throughout the course.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'What software will I need for this course?', 'You will need Python, Jupyter Notebook, and various data science libraries. We provide detailed setup instructions at the beginning of the course.', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 2, 'Is this bootcamp suitable for complete beginners?', 'Yes, this bootcamp is designed to take you from zero to full stack developer, with no prior coding experience required.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 'How much time should I allocate per week for this course?', 'We recommend allocating 8-10 hours per week to get the most out of this executive program.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Course Discounts
INSERT INTO "course_discounts" (id, course_id, discount_type, discount_value, start_date, end_date, is_active, created_at, updated_at)
VALUES 
(1, 1, 'percentage', 15.00, CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP + INTERVAL '20 days', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'fixed', 200.00, CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP + INTERVAL '25 days', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Registrations
INSERT INTO "registrations" (id, user_id, course_id, registration_date, status, final_price, education_level, work_experience, hear_about_us, created_at, updated_at)
VALUES 
(1, 2, 1, CURRENT_TIMESTAMP - INTERVAL '30 days', 'confirmed', 1104.99, 'Bachelor''s Degree', '2 years in IT industry', 'Social Media', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 2, CURRENT_TIMESTAMP - INTERVAL '15 days', 'confirmed', 1799.99, 'Master''s Degree', '5 years in software development', 'Friend Referral', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 1, CURRENT_TIMESTAMP - INTERVAL '10 days', 'pending', 1299.99, 'PhD', '3 years in research', 'Google Search', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 3, CURRENT_TIMESTAMP - INTERVAL '5 days', 'confirmed', 2799.99, 'Master''s Degree', '8 years in management', 'LinkedIn', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Course Reviews
INSERT INTO "course_reviews" (id, course_id, user_id, rating, review_text, is_approved, created_at, updated_at)
VALUES 
(1, 1, 2, 5, 'This course completely transformed my understanding of data science. The instructors are knowledgeable and the content is well-structured.', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 3, 4, 'Great bootcamp with hands-on projects. I was able to build a portfolio and land a job within a month of completion.', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 3, 5, 'As a senior manager, this course gave me the tools to make better data-driven decisions. Highly recommended for all executives.', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Testimonials
INSERT INTO "testimonials" (id, registration_id, content, rating, designation, workplace, university, profile_image_url, is_active, is_featured, created_at, updated_at)
VALUES 
('11111111-1111-1111-1111-111111111111', 1, 'The Data Science Fundamentals course at Boffin Institute provided me with practical skills that I immediately applied in my job. The instructors were excellent and the curriculum was comprehensive.', 5, 'Data Analyst', 'Tech Solutions Ltd', 'University of Colombo', '/images/testimonials/john-doe.jpg', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('22222222-2222-2222-2222-222222222222', 2, 'I enrolled in the Full Stack Web Development bootcamp with no prior coding experience, and now I''m working as a junior developer. The hands-on approach and project-based learning made all the difference.', 5, 'Junior Developer', 'WebTech Innovations', 'University of Peradeniya', '/images/testimonials/jane-smith.jpg', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('33333333-3333-3333-3333-333333333333', 4, 'The executive program on Data-Driven Decision Making has transformed how our company approaches strategic planning. The ROI on this course has been exceptional.', 5, 'COO', 'Global Enterprises', 'Harvard Business School', '/images/testimonials/sarah-johnson.jpg', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Media Placeholders
INSERT INTO "media_placeholders" (id, name, description, placeholder_type, context, created_at, updated_at)
VALUES 
(1, 'Site Logo', 'Main logo for the Boffin Institute website', 'LOGO', 'site', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Site Favicon', 'Favicon for the Boffin Institute website', 'FAVICON', 'site', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Homepage Hero', 'Hero image for the homepage', 'HERO_BACKGROUND', 'homepage', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Course Image - Data Science', 'Featured image for Data Science course', 'COURSE_IMAGE', 'course:1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Course Image - Web Development', 'Featured image for Web Development course', 'COURSE_IMAGE', 'course:2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Media Assets
INSERT INTO "media_assets" (id, file_name, original_file_name, file_size, media_type, mime_type, storage_path, public_url, alt_text, title, uploaded_by_id, created_at, updated_at)
VALUES 
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'logo.png', 'boffin_logo.png', 25600, 'IMAGE', 'image/png', 'media/image/logo.png', 'https://example.com/media/image/logo.png', 'Boffin Institute Logo', 'Boffin Logo', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'favicon.ico', 'boffin_favicon.ico', 4096, 'IMAGE', 'image/x-icon', 'media/image/favicon.ico', 'https://example.com/media/image/favicon.ico', 'Boffin Institute Favicon', 'Boffin Favicon', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'hero.jpg', 'homepage_hero.jpg', 1048576, 'IMAGE', 'image/jpeg', 'media/image/hero.jpg', 'https://example.com/media/image/hero.jpg', 'Boffin Institute Homepage Hero Image', 'Homepage Hero', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'data-science.jpg', 'data_science_course.jpg', 512000, 'IMAGE', 'image/jpeg', 'media/image/data-science.jpg', 'https://example.com/media/image/data-science.jpg', 'Data Science Course Image', 'Data Science Course', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'web-dev.jpg', 'web_development_course.jpg', 512000, 'IMAGE', 'image/jpeg', 'media/image/web-dev.jpg', 'https://example.com/media/image/web-dev.jpg', 'Web Development Course Image', 'Web Development Course', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Media Placeholder Assignments
INSERT INTO "media_placeholder_assignments" (placeholder_id, media_asset_id, is_active, order_index, created_at, updated_at)
VALUES 
(1, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'cccccccc-cccc-cccc-cccc-cccccccccccc', true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'dddddddd-dddd-dddd-dddd-dddddddddddd', true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Reset sequences to match the inserted IDs
SELECT setval('users_id_seq', (SELECT MAX(id) FROM "users"));
SELECT setval('course_categories_id_seq', (SELECT MAX(id) FROM "course_categories"));
SELECT setval('instructors_id_seq', (SELECT MAX(id) FROM "instructors"));
SELECT setval('courses_id_seq', (SELECT MAX(id) FROM "courses"));
SELECT setval('course_modules_id_seq', (SELECT MAX(id) FROM "course_modules"));
SELECT setval('module_topics_id_seq', (SELECT MAX(id) FROM "module_topics"));
SELECT setval('learning_objectives_id_seq', (SELECT MAX(id) FROM "learning_objectives"));
SELECT setval('course_faqs_id_seq', (SELECT MAX(id) FROM "course_faqs"));
SELECT setval('course_discounts_id_seq', (SELECT MAX(id) FROM "course_discounts"));
SELECT setval('registrations_id_seq', (SELECT MAX(id) FROM "registrations"));
SELECT setval('course_reviews_id_seq', (SELECT MAX(id) FROM "course_reviews"));
SELECT setval('media_placeholders_id_seq', (SELECT MAX(id) FROM "media_placeholders"));
