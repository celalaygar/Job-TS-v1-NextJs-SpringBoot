package com.app.jobTS.sign.auth.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private  JwtProvider jwtService;
    @Autowired
    private  UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String email;

        try {
            if (authHeader != null && !"".equals(authHeader)) {
                email = jwtService.getEmailFromToken(authHeader);

                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);

                    if (jwtService.validateToken(authHeader, userDetails)) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                }
            }

        } catch (IllegalArgumentException e) {
            System.out.println("An error occurred while getting username from token: " + e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid token");
            return; // Kontrol burada sonlandırılır
        } catch (ExpiredJwtException e) {
            System.out.println("The token is expired and not valid anymore: " + e);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "The token is expired and not valid anymore");
            return;
        } catch (SignatureException e) {
            System.out.println("Authentication Failed. Username or Password not valid.");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed. Username or Password not valid.");
            return;
        } catch (MalformedJwtException exception) {
            System.out.println("Request to parse invalid JWT failed: " + exception.getMessage());
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Request to parse invalid JWT");
            return;
        } catch (Exception exception) {
            System.out.println("Exception occurred: " + exception.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Exception occurred during authentication");
            return;
        }

        // CORS ayarları
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "authorization, isrefreshtoken, content-type, xsrf-token");
        response.addHeader("Access-Control-Expose-Headers", "xsrf-token");

        // Eğer bir hata oluşmadıysa filtre zincirine devam et
        filterChain.doFilter(request, response);
    }

}