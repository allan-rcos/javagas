package com.javagas.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * A Configuration Class to Spring Security. Will define the filters chain.
 *
 * @since 0.2
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * A Service that will map the
     * {@link org.springframework.security.core.userdetails.UserDetails
     * SpringSecurity.UserDetails} to {@link com.javagas.api.models.User
     * Javagas.UserModel}.
     *
     * @since 0.2
     */
    private final SecurityUserService service;

    /**
     * Jason Web Token Filter that will Authenticate users with Bearer Tokens.
     *
     * @since 0.2
     */
    private final JWTAuthFilter filter;

    /**
     * Application Context, used to receive beans.
     *
     * @since 0.2
     */
    private final ApplicationContext context;

    /**
     * The constructor to inject the dependencies.
     *
     * @param detailsService A Service to map the Database Connection.
     * @param jwtFilter      The Filter that will Authenticate Users with JWT.
     * @param appContext     The context used to receive Beans.
     * @since 0.2
     */
    @Autowired
    public SecurityConfig(final SecurityUserService detailsService,
                          final JWTAuthFilter jwtFilter,
                          final ApplicationContext appContext) {
        this.service = detailsService;
        this.filter = jwtFilter;
        this.context = appContext;
    }

    /**
     * Create the AuthenticationProvider with our Custom
     * {@link SecurityUserService Service} and password encoder.
     *
     * @return The Authentication Provider
     * @since 0.2
     */
    @Bean
    public AuthenticationProvider authProvider() {
        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(service);
        provider.setPasswordEncoder(context.getBean("encoder",
                PasswordEncoder.class));
        return provider;
    }

    /**
     * Used to Authenticate Users without Token.
     *
     * @param configuration The Configuration that get the Manager.
     * @return An Authentication Manager
     */
    @Bean
    public AuthenticationManager authenticationManager(
            final AuthenticationConfiguration configuration)
            throws Exception {
        return configuration.getAuthenticationManager();
    }


    /**
     * The Bean that define the Security Filter Chain. Configurations:
     * <p>
     *     TODO: Implement CSRF Token.
     * </p>
     * <ul>
     *     <li><strong>CSRF token</strong> is disabled</li>
     *     <li><strong>Only Authorized</strong> Requests</li>
     *     <li><strong>Form Login</strong> is disabled.</li>
     *     <li><strong>Http Basic</strong> is the default</li>
     * </ul>
     *
     * @param http The security chain builder.
     * @return A Security Chain that allows only authorized http requests.
     * @throws Exception A Builder exception.
     * @hidden In future updates CSRF token will be enabled and new routes
     * @since 0.2
     */
    @Bean
    public SecurityFilterChain filterChain(final HttpSecurity http)
            throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize ->
                        authorize.requestMatchers(
                                        "/api/v1/auth/**",
                                        "/api/v1/greeting/**",
                                        "/api/v1/enums/**",
                                        "/actuator/**",
                                        "/swagger-ui/**",
                                        "/swagger-resources/*",
                                        "/api/docs/**",
                                        "/error").permitAll()
                                .anyRequest().authenticated())
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session
                        -> session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS
                ))
                .addFilterBefore(filter,
                        UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /**
     * Bean that will hash the password.
     *
     * @return A PasswordEncoder.
     * @since 0.2
     */
    @Bean(name = "encoder")
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
