package com.javagas.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The main application.
 */
@SpringBootApplication
public class JavagasApplication {

    protected JavagasApplication() {
        super();
    }

    /**
     * Where all start.
     * @param args The arguments passed in command prompt
     */
    public static void main(final String[] args) {
        SpringApplication.run(JavagasApplication.class, args);
    }

}
