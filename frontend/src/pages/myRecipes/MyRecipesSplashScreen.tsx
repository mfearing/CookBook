import { Box, Container, Stack, Typography } from "@mui/material"


export default function MyRecipesSplashScreen() {


    const hero = (
        <Box id="hero" >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 5, sm: 5 },
                    pb: { xs: 5, sm: 5 }
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: {xs: '100%', sm: '70%'} }}>
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                        }}
                    >
                        Welcome to My Recipes
                    </Typography>
                    <Typography sx={{ display: 'flex', alignSelf: 'center', textAlign: 'center',}}>
                        Log in, or register, to begin making your very own recipes.
                    </Typography>
                    <Typography>
                        Here, you can create your very own recipes.  Missing an ingredient?  You can add one!  Need to use the metric system instead
                        of the imperal units of measurement?  We support that as well!  Here, you can concoct your own recipes, complete with ingredients,
                        units of measurement, and quantity, then save them to your very own account.
                    </Typography>
                    <Typography>
                        Interested in sharing your recipes with the world?  Coming soon is the ability to publish your recipe to the CookBook!  Published
                        recipes will be visible to anyone.  And more than that, you will be able to pull published recipes down into your account so that
                        you can add or remove ingredients and instructions, giving the recipe your own personal touch!  Cooking is a social experience,
                        and here at CookBook, we absolutely want to encourage that!
                    </Typography>

                </Stack>
            </Container>
        </Box>
    );


    return (
        <div>
            {hero}
        </div>
    );
}