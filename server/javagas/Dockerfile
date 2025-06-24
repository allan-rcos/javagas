FROM openjdk:24-jdk
MAINTAINER "Ricardo Állan Costa"
LABEL authors="Állan"

ADD target/javagas-server.jar javagas-server.jar

ENTRYPOINT ["java", "-jar", "/javagas-server.jar"]