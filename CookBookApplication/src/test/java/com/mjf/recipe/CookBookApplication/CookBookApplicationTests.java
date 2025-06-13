package com.mjf.recipe.CookBookApplication;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest(classes = CookBookApplication.class)
class CookBookApplicationTests {

	@Test
	void contextLoads() {
	}

}
