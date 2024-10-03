package com.mjf.cloud.Gateway.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.mjf.cloud.Gateway.services.RedisService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@AllArgsConstructor
public class JwtAuthFilter implements WebFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthFilter.class);

    private final UserAuthenticationProvider userAuthenticationProvider;
    private final RedisService redisService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String authorizationHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authorizationHeader != null) {
            String[] authElements = authorizationHeader.split(" ");
            if (authElements.length == 2 && "Bearer".equals(authElements[0])) {
                try {
                    // Validate the token and set the authentication in the SecurityContext
                    if( !redisService.isBlacklisted(authElements[1]) && //if token is not blacklisted because user logged out
                            userAuthenticationProvider.validateToken(authElements[1])){ //if token is valid
                        DecodedJWT decodedJWT = JWT.decode(authElements[1]);
                        String username = decodedJWT.getSubject(); //username from subject
                        String role = decodedJWT.getClaim("role").asString();

                        //adding user and roles headers to request if token is validated
                        exchange.getRequest().mutate()
                                .header("X-User-Name", username)
                                .header("X-User-Role", role)
                                .build();
                    }
                } catch (RuntimeException e) {
                    logger.debug("token invalid at gateway");
                    //return Mono.error(new AppException(e.getMessage(), HttpStatus.UNAUTHORIZED));
                }
            }
        }

        // Continue the filter chain
        return chain.filter(exchange);
    }
}
