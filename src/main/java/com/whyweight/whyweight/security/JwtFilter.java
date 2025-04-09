package com.whyweight.whyweight.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;


@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Integer userId = jwtUtil.validateToken(token);
            if (userId != null) {
                // Set the userId in the request attribute
                request.setAttribute("userId", userId);

                // Set the user in the SecurityContext
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userId, null, Collections.singletonList(new SimpleGrantedAuthority("USER")));
                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println("Token valid. User ID: " + userId);
            } else {
                System.out.println("Invalid token.");
            }
        } else {
            System.out.println("Authorization header missing or invalid.");
        }
        filterChain.doFilter(request, response);
    }
}