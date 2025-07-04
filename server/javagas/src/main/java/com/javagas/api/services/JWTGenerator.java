package com.javagas.api.services;

import com.javagas.api.utils.SecurityConstants;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.stereotype.Component;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.security.auth.login.CredentialException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;

/**
 * The service that generate and validate Json Web Tokens.
 *
 * @version 0.2.4
 * @since 0.2 As part of Security package.
 */
@Getter
@Component
public class JWTGenerator {
    /**
     * The Secret Key used to Sign In the token.
     * It is generated in server up.
     *
     * @since 0.2
     */
    private final String secretKey;

    /**
     * Constructor that generate a Secret Key.
     *
     * @since 0.2
     */
    public JWTGenerator() {
        secretKey = generateSecretKey();
    }

    /**
     * Method to generate a Secret Key.
     * Called in the constructor to assign.
     *
     * @return A String Secret Key.
     * @since 0.2
     */
    private String generateSecretKey() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey key = keyGen.generateKey();
            System.out.println("Secret Key : " + key.toString());
            return Base64.getEncoder().encodeToString(key.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating secret key", e);
        }
    }

    /**
     * Method to generate Json Web Tokens.
     *
     * @param username The Username Token Subject.
     * @return A Json Web Token String.
     * @since 0.2
     */
    public String generateToken(final String username) {
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime()
                + SecurityConstants.JWT_EXPIRATION);

        SecretKey key = getSecretKey();

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(expireDate)
                .signWith(key)
                .compact();
    }

    /**
     * Decode the Secret Key and return the bytes.
     *
     * @return A Secret Key used to Sign In.
     * @since 0.2
     */
    private SecretKey getSecretKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * A Getter to return the Json Web Token Subject.
     *
     * @param token JWT Encoded String.
     * @return The Username from Token Owner.
     * @since 0.2
     */
    public String getUsernameFromJWT(final String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }

    /**
     * A Method to Validate the token.
     *
     * @param token Jason Web Token Encrypted.
     * @throws CredentialException When invalid or expired.
     * @since 0.2
     */
    public void validateToken(final String token)
            throws CredentialException {
        try {
            SecretKey key = getSecretKey();
            Jwts.parser().verifyWith(key).build().parse(token);
        } catch (SecurityException
                 | MalformedJwtException
                 | IllegalArgumentException
                 | ExpiredJwtException
                 | UnsupportedJwtException e) {
            throw new CredentialException(e.getMessage());
        }
    }
}


