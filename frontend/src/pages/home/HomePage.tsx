import { AuthContextType } from "../../context/auth";
import useAuthContext from "../../hooks/use-auth-context";
import { Box, Container, Stack, Typography } from "@mui/material";


export default function HomePage(){
    const {userLogin} = useAuthContext() as AuthContextType;

    let content;
    if(!userLogin){
        content = "Cook Book Home Page";
    } else {
        content = `Welcome, ${userLogin.firstName}!`;
    }

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
                        {content}
                    </Typography>
                    <Typography sx={{ display: 'flex', alignSelf: 'center', textAlign: 'center',}}>
                        Here, you may search, create, and share your own recipes!
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