import React, { useEffect } from 'react';
import { AppBar, Button, Container, Box, IconButton, 
        Menu, Toolbar, Tooltip, Avatar, MenuItem,
        Typography} from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/use-auth-context';
import type { AuthContextType } from '../context/auth';

export default function Header(){
    const {userLogin, logUserOut} = useAuthContext() as AuthContextType;

    useEffect(() => {
        //just need the app to render when userLogin is updated
    }, [userLogin]);

    const navigate = useNavigate();
    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);

    const handleLoginBtnClick = () => {
        if(userLogin !== null){
            logUserOut();
        } 
        navigate(`/login`);
        setAnchorElMenu(null);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    }

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElMenu(event.currentTarget); //places the menu items below the menu element
    }

    const handleMenuItemClick = (path: string) => {
        navigate(path);
    }

    const menuItems = [
        {label: 'Log Out', action: handleLoginBtnClick}
    ];
    const navigationList = [
        {label: 'Home', path: "/", toolTip: "Home Page"},  
        {label: 'My Recipes', path: "/myRecipes", toolTip: "Create Your Own Recipes"},
        {label: 'CookBook', path: "/cookBook", toolTip: "View Published Recipes"}
    ];

    const renderedButtons = navigationList.map(({label, path, toolTip}) => {
        return (
            <Tooltip title = {toolTip} arrow>
                <Button 
                    key={label} 
                    onClick={() => handleMenuItemClick(path)}
                    sx={{my: 2, color: 'white', display: 'block'}}
                >
                    {label}
                </Button>
            </Tooltip>
        );
    });

    let userMenuItems;
    if(userLogin){
        userMenuItems = menuItems.map((item) => {
            return (
                <MenuItem key={item.label} onClick={item.action}>
                    <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
            );
        });
    } else {
        userMenuItems = (
            <MenuItem key={'login'} onClick={handleLoginBtnClick}>
                <Typography textAlign="center">Log in</Typography>
            </MenuItem>
        );
    }
    
    
    return (
        <AppBar position="static" style={{ top: 0 }} sx={{mx: "auto"}} >
            <Container >
                <Toolbar disableGutters >
                    <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {renderedButtons}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
                                <Avatar alt="user" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElMenu}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElMenu)}
                            onClose={handleCloseMenu}
                        >
                            {userMenuItems}
                        </Menu>
                        

                    </Box>




                </Toolbar>            
            </Container>
        </AppBar>
    );
}