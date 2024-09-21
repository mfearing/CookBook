# CookBook
This web application uses microservices to build recipes.  Java 17, Spring Framework/Spring Boot, PostgreSQL, React,
Docker, and Kafka Message Broker were used to build this.

## AuthenticationService
AuthenticationService application is based on Sergio Lema's authentication backend, with minor changes.  
This application performs user logins, registration, and creation of JWT tokens.  You can
view Sergio's code here:

https://github.com/serlesen/fullstack-jwt/tree/chapter_3

## RecipeApplication 
This application models ingredients, units of measurement, and recipes.  It allows users to create
all three of these and tie them together to make a full cooking recipe.  Recipes are tied to user
accounts and are not publicly available unless a user publishes their recipe to the CookBook.

## CookBookApplication
This application holds published recipes.  It does not model the recipes.  Anyone can view published
recipes without logging in.  A user that is logged in will be able to clone a recipe into their account
in the recipe application.  Users may not directly modify any recipe that's been published, but a user can
re-publish a recipe to the CookBook to update it.

## Generating RSA256 public and private keys
I used git bash for the following commands.  Both keys go into the resources/keys directory of the AuthenticationService.

openssl genrsa -out keypair.pem 2048

openssl rsa -in keypair.pem -pubout -out publicKey.pem

openssl pkcs8 -in keypair.pem -topk8 -nocrypt -inform PEM -outform PEM -out privateKey.pem


¯\_(ツ)_/¯

