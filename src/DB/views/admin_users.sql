DROP VIEW IF EXISTS admin_users;
CREATE VIEW admin_users AS
SELECT  a.admin_id
       ,a.user_id
       ,u.name
       ,u.email
FROM admins a
JOIN users u
WHERE a.user_id = u.id 