package com.mjf.cloud.Gateway.config;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Configuration
public class RoutesConfig {

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder builder){
        return builder.routes()
                .route(p -> p
                        .path("/v1/auth/**")
                        .filters(f -> f
                                .requestRateLimiter(c -> c
                                        .setRateLimiter(redisRateLimiter())
                                        .setKeyResolver(ipKeyResolver())
                                )
                        )
                        .uri("http://authenticationservice:8080") // the authentication service port
                )
                .route(p -> p
                        .path("/v1/rcp/**")
                        .filters(f -> f
                                .requestRateLimiter(c -> c
                                        .setRateLimiter(redisRateLimiter())
                                        .setKeyResolver(ipKeyResolver())
                                )
                        )
                        .uri("http://recipeservice:8080") // the recipe service port
                )
                .route(p -> p
                        .path("/v1/cb/**")
                        .filters(f -> f
                                .requestRateLimiter(c -> c
                                        .setRateLimiter(redisRateLimiter())
                                        .setKeyResolver(ipKeyResolver())
                                )
                        )
                        .uri("http://cookbookapplication:8383") // the cookbook service port
                )

                .build();
    }

    @Bean
    public KeyResolver ipKeyResolver(){
        return exchange -> Mono.just(Objects.requireNonNull(exchange.getRequest().getRemoteAddress()).getAddress().getHostAddress());
    }

    @Bean
    public RedisRateLimiter redisRateLimiter() {
        //allow 10 requests per second per ip with a burst capacity of 20...should never need this.
        return new RedisRateLimiter(10, 20);
    }

}
