SELECT * FROM users;
SELECT * FROM bootcamp;
SELECT * FROM "UserBootcamp";

--Listar el usuario con el id 

SELECT * FROM users WHERE id = 'dea02b10-090a-4ff6-9575-96af63c0a501';

--Crear el usuario 

INSERT INTO users ("id", "firstName", "lastName", "email", "password", "createdAt", "updatedAt")
VALUES ('054f4986-53e0-451a-bafd-58bf3e17fa61', 'Osamu', 'Dazai', 'odazai@correo.com', 'Os@2025dev', NOW(), NOW());

--Actualizar el usuario según su id

UPDATE users
SET 
	"email" = 'osamudazaia@correo.com'
WHERE id = '054f4986-53e0-451a-bafd-58bf3e17fa61';

--Eliminar el usuario según su id

DELETE FROM users
WHERE id = '054f4986-53e0-451a-bafd-58bf3e17fa61';



--Consultando el bootcamp por id, incluyendo los usuarios registrados

SELECT b.id AS bootcamp_id, 
       b.title AS bootcamp_title, 
       u.id AS user_id, 
       u."firstName",  
       u."lastName"  
FROM bootcamp b
JOIN "UserBootcamp" ub ON b.id = ub."bootcampId"
JOIN users u ON ub."userId" = u.id 
WHERE b.id = 'fdec61e0-2e3f-408a-b75e-835d4b5ccb23'; 


--Listar todos los bootcamp con sus usuarios

SELECT 
    b.id AS bootcamp_id,
    b.title AS bootcamp_title,
    u.id AS user_id,
    u."firstName",  
    u."lastName",
    u.email
FROM 
    bootcamp b
JOIN 
    "UserBootcamp" ub ON b.id = ub."bootcampId"
JOIN 
    users u ON ub."userId" = u.id;

--Consultar un usuario por id incluyendo los bootcamp

SELECT 
    u.id AS user_id,
    u."firstName" AS name,  
    u."lastName" lastname ,
    b.id AS bootcamp_id,
    b.title AS bootcamp_title
FROM users u
JOIN "UserBootcamp" ub ON u.id = ub."userId"
JOIN bootcamp b ON ub."bootcampId" = b.id
WHERE u.id = 'dea02b10-090a-4ff6-9575-96af63c0a501';
