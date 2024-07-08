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
                        

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque velit risus, sed suscipit enim malesuada non. Sed hendrerit tellus eu turpis blandit pulvinar. Duis aliquam euismod tortor, id feugiat justo placerat quis. Mauris ut varius nulla. Proin efficitur est egestas libero semper, imperdiet placerat lectus venenatis. Pellentesque quis mi cursus, ullamcorper tellus ac, pharetra diam. Phasellus mollis porttitor nisl, vel congue enim aliquam id. Sed ut mauris mattis, eleifend erat ac, viverra ex. Quisque fringilla lectus ac semper faucibus.

Nulla ut gravida leo. Morbi hendrerit metus et mauris bibendum maximus. Quisque et tellus posuere, efficitur lectus ac, mattis orci. Aenean commodo interdum eleifend. Quisque et iaculis purus. Etiam volutpat tristique enim, nec varius lacus posuere vel. Sed risus diam, bibendum et pellentesque vel, porttitor quis lectus. Nulla faucibus pharetra sapien, vitae volutpat urna fringilla vitae. Sed facilisis elementum turpis non consequat. Donec pharetra tristique eros, a ultricies mi eleifend eget. Nullam venenatis condimentum iaculis. Vestibulum cursus et orci finibus tempus.

Aliquam ac tellus placerat, tristique arcu in, blandit velit. Nulla consequat ligula est, in pharetra ante efficitur eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisis metus ut magna dictum vestibulum. Nulla blandit nibh vel ligula elementum, vitae aliquam sapien interdum. In et diam accumsan, porta nunc id, sodales elit. Proin consectetur diam diam, nec tincidunt lacus pellentesque at. Ut at lorem id metus mollis feugiat.

Ut sed tempor velit, eu iaculis magna. Vestibulum vitae nisi velit. Proin porta ex tellus, sit amet tristique purus cursus sit amet. Ut mattis mi ut risus accumsan, sit amet sagittis enim elementum. Aenean consequat a sem ac commodo. Nunc suscipit mi et dolor tempor, in aliquam turpis porttitor. Donec a dui viverra, blandit mauris non, volutpat nunc. Suspendisse pellentesque efficitur erat, ut rutrum elit ultricies sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent commodo, sem ac tincidunt condimentum, quam magna bibendum elit, id maximus erat sapien non sapien. Curabitur consectetur lacus ut finibus porta. In viverra, urna vel vestibulum tincidunt, ante purus suscipit sapien, sed aliquam erat quam a quam.

Ut ut vestibulum sapien, id finibus dolor. Nunc consequat nibh sed velit laoreet, quis luctus ligula dictum. Integer posuere ligula at pellentesque facilisis. In vel fringilla quam. Nulla ultrices vehicula odio nec volutpat. Integer lacinia lectus non efficitur ullamcorper. Proin nec semper quam. Etiam interdum nisl blandit fermentum sagittis. Quisque laoreet lobortis rhoncus. Vivamus in placerat massa. 
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