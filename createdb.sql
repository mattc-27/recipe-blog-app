-- Create the recipe_app database
CREATE DATABASE recipe_app;

-- Connect to the recipe_app database
\c recipe_app;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(255),
    location TEXT,
    user_recipes TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the recipes table
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Add foreign key constraint between recipes and users
ALTER TABLE recipes ADD CONSTRAINT fk_recipes_user FOREIGN KEY (created_by) REFERENCES users (id);
