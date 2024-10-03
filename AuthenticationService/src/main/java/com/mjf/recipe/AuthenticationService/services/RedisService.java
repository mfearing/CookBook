package com.mjf.recipe.AuthenticationService.services;

import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@AllArgsConstructor
public class RedisService {

    private RedisTemplate<String, Object> redisTemplate;

    // blacklisted tokens saved with a time to live (TTL) setting; redis will remove automatically when time is up
    public void blacklistToken(String token, long expirationInMillis){
        redisTemplate.opsForValue().set(token, "blacklisted", Duration.ofMillis(expirationInMillis));
    }

    public boolean isBlacklisted(String token){
        return Boolean.TRUE.equals(redisTemplate.hasKey(token));
    }

    //Manual deletion, though TTL should handle tokens before this is needed
    public void removeBlacklistedToken(String token){
        redisTemplate.delete(token);
    }




}
