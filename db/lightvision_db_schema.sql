-- =========================================
-- LIGHTVISION_DB SCHEMA
-- =========================================

CREATE DATABASE IF NOT EXISTS lightvision_db;
USE lightvision_db;

-- =========================================
-- USERS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','agent','client','legal_advisor') DEFAULT 'client',
    profile_image VARCHAR(255),
    status ENUM('active','inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- AGENTS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS agents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    bio TEXT,
    position VARCHAR(100),
    facebook_link VARCHAR(255),
    instagram_link VARCHAR(255),
    linkedin_link VARCHAR(255),
    listings_count INT DEFAULT 0,
    experience_years INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =========================================
-- LEGAL ADVISORS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS legal_advisors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    specialization VARCHAR(150),
    office_name VARCHAR(150),
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =========================================
-- NEIGHBORHOODS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS neighborhoods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150),
    city VARCHAR(100),
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- PROPERTY TYPES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS property_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(100)
);

-- =========================================
-- PROPERTIES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS properties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    agent_id INT,
    neighborhood_id INT,
    property_type_id INT,
    title VARCHAR(255),
    slug VARCHAR(255),
    description TEXT,
    purpose ENUM('sale','rent') NOT NULL,
    price DECIMAL(15,2),
    bedrooms INT,
    bathrooms INT,
    garages INT,
    kitchens INT,
    lounges INT,
    property_size VARCHAR(100),
    land_size VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(20),
    latitude VARCHAR(100),
    longitude VARCHAR(100),
    featured ENUM('yes','no') DEFAULT 'no',
    status ENUM('available','sold','rented','pending') DEFAULT 'available',
    main_image VARCHAR(255),
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agents(id),
    FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods(id),
    FOREIGN KEY (property_type_id) REFERENCES property_types(id)
);

-- =========================================
-- PROPERTY IMAGES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS property_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- =========================================
-- PROPERTY FEATURES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS property_features (
    id INT PRIMARY KEY AUTO_INCREMENT,
    feature_name VARCHAR(150)
);

-- =========================================
-- PROPERTY FEATURE LINK TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS property_feature_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT,
    feature_id INT,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (feature_id) REFERENCES property_features(id)
);

-- =========================================
-- PROPERTY VIDEOS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS property_videos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT,
    video_url VARCHAR(255),
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- =========================================
-- PROPERTY DOCUMENTS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS property_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT,
    document_name VARCHAR(150),
    document_file VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- =========================================
-- FAVORITES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    property_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- =========================================
-- PROPERTY INQUIRIES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS property_inquiries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT,
    full_name VARCHAR(150),
    email VARCHAR(150),
    phone VARCHAR(20),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- =========================================
-- SELL PROPERTY REQUEST TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS sell_property_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(150),
    email VARCHAR(150),
    phone VARCHAR(20),
    property_title VARCHAR(255),
    property_type VARCHAR(100),
    location VARCHAR(255),
    expected_price DECIMAL(15,2),
    description TEXT,
    status ENUM('pending','reviewed','approved','rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- SELL PROPERTY IMAGES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS sell_property_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_id INT,
    image VARCHAR(255),
    FOREIGN KEY (request_id) REFERENCES sell_property_requests(id)
);

-- =========================================
-- SERVICES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150),
    description TEXT,
    icon VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- BLOG CATEGORIES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS blog_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(150)
);

-- =========================================
-- BLOG POSTS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_id INT,
    category_id INT,
    title VARCHAR(255),
    slug VARCHAR(255),
    featured_image VARCHAR(255),
    content LONGTEXT,
    status ENUM('draft','published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES blog_categories(id)
);

-- =========================================
-- TESTIMONIALS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(150),
    client_image VARCHAR(255),
    message TEXT,
    rating INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- CAREERS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS careers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    position VARCHAR(150),
    description TEXT,
    requirements TEXT,
    location VARCHAR(150),
    status ENUM('open','closed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- JOB APPLICATIONS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS job_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    career_id INT,
    full_name VARCHAR(150),
    email VARCHAR(150),
    phone VARCHAR(20),
    cv_file VARCHAR(255),
    status ENUM('pending','reviewed','accepted','rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (career_id) REFERENCES careers(id)
);

-- =========================================
-- VALUATION REQUESTS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS valuation_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(150),
    email VARCHAR(150),
    phone VARCHAR(20),
    property_address VARCHAR(255),
    property_type VARCHAR(100),
    estimated_size VARCHAR(100),
    notes TEXT,
    status ENUM('pending','contacted','completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- COMPLIANCE CERTIFICATES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS compliance_certificates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    certificate_name VARCHAR(150),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- OFFER TO PURCHASE TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS offers_to_purchase (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT,
    buyer_name VARCHAR(150),
    buyer_email VARCHAR(150),
    buyer_phone VARCHAR(20),
    offer_amount DECIMAL(15,2),
    additional_notes TEXT,
    status ENUM('pending','accepted','rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- =========================================
-- CONTACT MESSAGES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(150),
    email VARCHAR(150),
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- SITE SETTINGS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS site_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    site_name VARCHAR(150),
    logo VARCHAR(255),
    contact_email VARCHAR(150),
    contact_phone VARCHAR(20),
    address VARCHAR(255),
    facebook_link VARCHAR(255),
    instagram_link VARCHAR(255),
    linkedin_link VARCHAR(255),
    whatsapp_number VARCHAR(20)
);

-- =========================================
-- ADMINS ACTIVITY LOG TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    activity TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
