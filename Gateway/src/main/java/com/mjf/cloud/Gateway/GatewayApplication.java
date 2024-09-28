package com.mjf.cloud.Gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GatewayApplication {

	@Bean
	public RouteLocator routeLocator(RouteLocatorBuilder builder){
		return builder.routes()
				.route(p -> p
						.path("/v1/auth/**")
						.filters(f -> f.addRequestHeader("Hello", "Auth"))
						.uri("http://10.0.4.58:8181") // the authentication service port
				)
				.route(p -> p
						.path("/v1/rcp/**")
						.filters(f -> f.addRequestHeader("Hello", "Rcp"))
						.uri("http://10.0.4.58:8282") // the authentication service port
				)
				.route(p -> p
						.path("/v1/cb/**")
						.filters(f -> f.addRequestHeader("Hello", "Cb"))
						.uri("http://10.0.4.58:8383") // the authentication service port
				)

				.build();
	}

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

}
