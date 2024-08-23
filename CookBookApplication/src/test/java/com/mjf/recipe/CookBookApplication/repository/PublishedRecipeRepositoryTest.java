package com.mjf.recipe.CookBookApplication.repository;

import com.mjf.recipe.CookBookApplication.entities.PublishedRecipe;
import com.mjf.recipe.CookBookApplication.repositories.PublishedRecipeRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test") //uses application-test.yml instead of production application.yml
@TestInstance(TestInstance.Lifecycle.PER_CLASS) //allows @BeforeAll to be non-static
public class PublishedRecipeRepositoryTest {

    final static long RECIPE_ID1 = 1L;
    final static long RECIPE_ID2 = 2L;
    final static long RECIPE_ID3 = 3L;
    final static long RECIPE_ID4 = 4L;

    final static String RECIPE_AUTHOR1 = "mfearing1";
    final static String RECIPE_AUTHOR2 = "mfearing2";
    final static String RECIPE_AUTHOR3 = "mfearing3";
    final static String RECIPE_AUTHOR4 = "mfearing4";

    final static String RECIPE_NAME1 = "Apple Pie1";
    final static String RECIPE_NAME2 = "Apple Pie2";
    final static String RECIPE_NAME3 = "Apple Pie3";
    final static String RECIPE_NAME4 = "Apple Pie4";

    final static String RECIPE_DATA1 = "";


    @Autowired
    protected PublishedRecipeRepository publishedRecipeRepository;

    @BeforeAll
    @Transactional
    public void init(){

        PublishedRecipe publishedRecipe1 = new PublishedRecipe(null, RECIPE_ID1, RECIPE_NAME1, RECIPE_AUTHOR1, RECIPE_DATA1);
        PublishedRecipe publishedRecipe2 = new PublishedRecipe(null, RECIPE_ID2, RECIPE_NAME2, RECIPE_AUTHOR2, RECIPE_DATA1);
        PublishedRecipe publishedRecipe3 = new PublishedRecipe(null, RECIPE_ID3, RECIPE_NAME3, RECIPE_AUTHOR1, RECIPE_DATA1);
        PublishedRecipe publishedRecipe4 = new PublishedRecipe(null, RECIPE_ID4, RECIPE_NAME4, RECIPE_AUTHOR4, RECIPE_DATA1);

        publishedRecipeRepository.save(publishedRecipe1);
        publishedRecipeRepository.save(publishedRecipe2);
        publishedRecipeRepository.save(publishedRecipe3);
        publishedRecipeRepository.save(publishedRecipe4);
        publishedRecipeRepository.flush();
    }

    @Test
    public void givenRecipeInDB_WhenFindByRecipeId_PublishRecipeIDIsAssigned(){
        Optional<PublishedRecipe> savedRecipe = publishedRecipeRepository.findByRecipeId(RECIPE_ID1);
        assertTrue(savedRecipe.isPresent());
        assertNotNull(savedRecipe.get().getRecipeId());
    }

    @Test
    public void givenRecipeInDB_WhenFindAllRecipeByAuthor_ThenReturnRecipesByAuthor(){
        List<PublishedRecipe> recipes = publishedRecipeRepository.findByAuthorIgnoreCase(RECIPE_AUTHOR1);
        assertEquals(2, recipes.size());

        recipes = publishedRecipeRepository.findByAuthorIgnoreCase(RECIPE_AUTHOR2);
        assertEquals(1, recipes.size());

        recipes = publishedRecipeRepository.findByAuthorIgnoreCase(RECIPE_AUTHOR3);
        assertEquals(0, recipes.size());
    }





}
