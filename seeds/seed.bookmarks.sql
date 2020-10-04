BEGIN; 

INSERT INTO bookmarks (id, title, url, rating, description)
VALUES
(1, 'Google', 'http://www.google.com', '3', 'Internet-related services and products.'),
(2, 'Thinkful', 'http://www.thinkful.com', '5', '1-on-1 learning to accelerate your way to a new high-growth tech career!'),
(3, 'Github', 'http://www.github.com', '4', 'brings together the world''s largest community of developers.');

COMMIT;