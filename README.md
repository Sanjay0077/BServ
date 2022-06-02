# BServ
BIKE SERVICE APPLICAION

DESCRIPTION:

	This application is for owners of Bike service stations. It helps the owners to list all the services . Customers can choose services to book

It provides the following services:

		• General service check-up
		• Oil change
		• Water wash
		
Bike station owner:

	• Can able to create / edit / delete all his services and their details
	• View a list of all bookings ( pending, ready for delivery and completed)
	• View details of each booking
	• Mark a booking as ready for delivery
	• Mark a booking as completed
Customers:

	• Can able to register for an account with his email address and password
	• Date automatically taken when user Book a service 
	• Receive an email as soon as his booking is ready for delivery

LANGUAGES USED

	Frontend:
		HTML,CSS,Bootstrap
	Backend:
		Nodejs
	Framework :    Express 
	Database  :    Mysql

LIBRARIES USED:

	• Express - generator
	• Express-session
	• Body-parser
	• Express-flash
	• Nodemailer
	• Express-handlebars
	• Mysql
	• Express Validator
SOFTWARES USED:

	• Visual studio code
	• Browser : Google chrome
	• XAMPP
STEPS TO RUN PROJECT

	Download project from repository
	Enter into the directory 
Step-1

	Install nodejs in system
	Install libraries ,
	Install libraries by using given command below
    		 npm install express express-session body-parser nodemailer express-handlebars mysql nodemon
step-2

	DATABASE:
	Create Database name  as: tws
	Create Table 
	Table name : admin
		CREATE TABLE `admin` (`id` int(11) UNSIGNED NOT NULL, `email` varchar(50) NOT NULL,`password` varchar(255) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
		
		INSERT INTO `admin` (`id`, `email`, `password`) VALUES(1, 'sanjay@gmail.com', '$2a$12$xK4oYmkUVQs3PGCPFpEK8ud/3CUqr1L/.k9ol2ROX6pNJ/K4Nzu7W');

AdminUsername  : 	sanjay@gmail.com
Admin password  : 	1234567890

Table name : users

		CREATE TABLE `users` ( `id` int(10) UNSIGNED NOT NULL, `name` varchar(50) NOT NULL, `email` varchar(50) NOT NULL, `password` varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

Table name : u_details

		CREATE TABLE `u_details` ( `id` int(11) NOT NULL,`name` varchar(30) NOT NULL,  `email` varchar(30) NOT NULL,  `contact_no` bigint(20) NOT NULL,  `gender` varchar(30) NOT NULL,  `v_model` varchar(30) NOT NULL,  `v_no` varchar(30) NOT NULL,  `license_no` varchar(30) NOT NULL,  `service_type` varchar(30) NOT NULL,  `registered_date` datetime NOT NULL DEFAULT current_timestamp(),  `delivery_date` date DEFAULT NULL,  `status` varchar(30) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


Step-3

	Run the terminal    `node index.js`
Step-4

	Open the browser and Run the host
		http://localhost:4000
                  


