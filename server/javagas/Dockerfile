FROM gcr.io/distroless/java21-debian12
LABEL authors="Állan"

EXPOSE 8080
COPY target/javagas-server.jar javagas-server.jar

ENTRYPOINT ["java", "-jar", "/javagas-server.jar"]