I have used Frontend as React JS and backend as Laravel 9 with Laravel sanctum for authentication.
I have used Frontend as React JS and backend as Laravel 9 with Laravel sanctum for authentication.
1.	Create project named ‘Packt+Assessment’ using command Composer –prefer-dist create-project laravel/laravel Packt+Assessment
2.	Manually Created database in mysql as pack-assessment
3.	Created a model called Book as php artisan make:model Books –mcr -mcr this argument will create Model, Migration, and Controller in Single Command.
4.	Now open migration file 2023_02_10_200108_create_books_table.php and created schema for books.
5.	Ran command php artisan migrate, it will create database table books to database pack-assessment with books of schema written in above migration file.
6.	Now seeding data from https://fakerapi.it/api/v1/books?_quantity=100 New API for books is as follows:- In above api images were not have correct url to show. So searched another api and in which all information like title, author, isbn etc. downloaded in csv format converted to json and inserted to book table and did follow your requirements.
a) Taken records from above my url and make a JSON file and put it under database->data->bookdata.json
b) Created a seeder class BookSeeder and done some changes to BookSeeder.php file and run php artisan db:seed. It inserts all 150 records to newly created table books.
7.	For segregation between admin and customers we have created two tables admins and customers. Also two separate REST API’s implemented for admin and customer and two separate controllers is used. I am using Laravel sanctum token for authentication, since jwt token is not compatible with Laravel9. Also I have created two separate controllers as
a) php artisan make:model AdminAuthController --resource
b) php artisan make:model UserAuthController --resource
8.	I have segregated users as admin and customers. All admin users files under admin folder with REST API’s is in routes folder. Similarly all customer users files under customer folder with REST API’s is in routes folder
9.	For Admin users login Go to admin folder first run “npm install” then run “npm start”. It will take to you to admin users where admin user add/edit/delete books.
10.	For Customers login Go to customer folder first run “npm install” then and run “npm start”. It will take you to customers where after login customer can search books according to title, author, publication date, isbn, genre. Also on each book clicks it will take you yo a new page where all of the description about selected book will be shown with nice fronend using React JS.
11.	For Laravel got to folder “Laravel-9-REST-API-using-Sanctum” and run Composer update. After completion of composer update following commands will be used
a) Run “php artisan key:generate”. It will generate a new key.
b) Run “php artisan migrate”. First open xampp or wamp server and open phpmyadmin there and create a database packt-assessment. It will ship all schema to create tables physically into your local database.
c) Now run “php artisan serv”. It will run Laravel9 server for your backend.
d) For frontend of admins and customers do above 9 and 10 points.
12.	Applied functionality of add/edit/delete books from admin panel.
13.	From customer panel search books with title, author etc.
14.	For laravel9 sanctum integration add following in .env file of laravel root path SESSION_DRIVER=cookie SESSION_DOMAIN=localhost SANCTUM_STATEFUL_DOMAINS=localhost 16.Paging is also apllied as directed to do so.

