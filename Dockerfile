FROM maven:3.8-openjdk-17 as builder

COPY . /usr/app

RUN mvn -f /usr/app/pom.xml package

FROM openjdk:17-alpine AS authenticationservice
COPY --from=builder /usr/app/AuthenticationService/target/*.jar /usr/app/app.jar
EXPOSE 8181
ENTRYPOINT ["java", "-jar", "/usr/app/app.jar"]

FROM openjdk:17-alpine AS gateway
COPY --from=builder /usr/app/Gateway/target/*.jar /usr/app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/usr/app/app.jar"]

FROM openjdk:17-alpine AS recipeapplication
COPY --from=builder /usr/app/RecipeApplication/target/*.jar /usr/app/app.jar
EXPOSE 8282
ENTRYPOINT ["java", "-jar", "/usr/app/app.jar"]

FROM openjdk:17-alpine AS cookbookapplication
COPY --from=builder /usr/app/CookBookApplication/target/*.jar /usr/app/app.jar
EXPOSE 8383
ENTRYPOINT ["java", "-jar", "/usr/app/app.jar"]


