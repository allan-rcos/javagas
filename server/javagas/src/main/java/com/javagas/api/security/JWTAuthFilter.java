package com.javagas.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.security.auth.login.CredentialException;
import java.io.IOException;

/**
 * A Filter Component that will validate Bearer Tokens in Whole Application.
 *
 * @since 0.2
 */
@Component
@Log4j2
public class JWTAuthFilter extends OncePerRequestFilter {

    /**
     * A Service to Validate and Generate Tokens.
     *
     * @since 0.2
     */
    private final JWTGenerator service;

    /**
     * {@link SecurityUserService User Details Server} customized to our User.
     *
     * @see org.springframework.security.core.userdetails.UserDetailsService
     * SpringSecurity.UserDetailsService
     * @since 0.2
     */
    private final UserDetailsService detailsService;

    /**
     * The constructor that will AutoWire our dependencies.
     *
     * @param userDService The Service to User Details
     * @param jwtGenerator The Service to generate and validate Tokens.
     * @see org.springframework.security.core.userdetails.UserDetails
     * SpringSecurity.UserDetails
     * @see SecurityUser Javagas.UserDetails
     * @since 0.2
     */
    @Autowired
    public JWTAuthFilter(final UserDetailsService userDService,
                         final JWTGenerator jwtGenerator) {
        this.detailsService = userDService;
        this.service = jwtGenerator;
    }

    /**
     * {@inheritDoc}
     * Filter application method.
     * <p>
     * This method was called to filter JWT tokens and Authenticate the
     * User.
     * </p>
     *
     * @param request     The User Request.
     * @param response    Our Response.
     * @param filterChain A Filter Chain to call the next filter.
     */
    @Override
    protected void doFilterInternal(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final FilterChain filterChain)
            throws ServletException, IOException {
        String bearerToken = request.getHeader("Authorization");
        String token = null;
        if (StringUtils.hasText(bearerToken)
                && bearerToken.startsWith(SecurityConstants.TOKEN_TYPE)) {
            token = bearerToken.substring(
                    SecurityConstants.TOKEN_TYPE.length() + 1
            );
        }
        if (StringUtils.hasText(token)) {
            boolean tokenValid = false;
            try {
                service.validateToken(token);
                tokenValid = true;
            } catch (CredentialException e) {
                logger.warn(e.getMessage());
            }
            if (tokenValid) {
                String username = service.getUsernameFromJWT(token);

                UserDetails userDetails =
                        detailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request));
                SecurityContextHolder.getContext()
                        .setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
