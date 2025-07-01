package com.javagas.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The main application.
 *
 * @since 0.1
 */
@SpringBootApplication
public class JavagasApplication {

    protected JavagasApplication() {
        super();
    }

    /**
     * Where all start.
     *
     * @param args The arguments passed in command prompt
     * @since 0.1
     */
    public static void main(final String[] args) {
        SpringApplication.run(JavagasApplication.class, args);
    }

}
