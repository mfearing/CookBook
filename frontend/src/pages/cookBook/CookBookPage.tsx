
import { Typography, Box, Container, Stack } from "@mui/material";

export default function CookBookPage() {
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
                        Coming Soon!
                    </Typography>
                    <Typography sx={{ display: 'flex', alignSelf: 'center', textAlign: 'center',}}>
                        Here, you will be able to search for published recipes, as well as save them to your account and modify them
                        as you see fit!  Cooking builds communities, and CookBook wants to promote that!
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