import React, { useEffect } from 'react';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
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
    const menuIsOpen = Boolean(anchorElMenu);
    const menuItemList = [
        {label: 'Home', path: "/"}, 
        {label: 'Search Recipes', path: ""}, 
        {label: 'Create Recipes', path: ""}
    ];

    const handleLoginBtnClick = () => {
        if(userLogin !== null){
            logUserOut();
        } 
        navigate(`/login`);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElMenu(event.currentTarget); //places the menu items below the menu element
    }

    const handleMenuItemClick = (path: string) => {
        setAnchorElMenu(null);
        navigate(path);
    }

    const renderedMenuItems = menuItemList.map(({label, path}) => {
        return (<MenuItem key={label} onClick={() => handleMenuItemClick(path)}>{label}</MenuItem>);
    });

    let loginContent;
    if(!userLogin){
        loginContent = <Button color="inherit" onClick={handleLoginBtnClick}>Login</Button>;
    } else {
        loginContent = <Button color="inherit" onClick={handleLoginBtnClick}>Logout</Button>;
    }
    
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}} onClick={handleMenuClick}>
                    <MenuIcon />
                </IconButton>
                <Menu id="main-menu" open={menuIsOpen} anchorEl={anchorElMenu} onClose={() => setAnchorElMenu(null)}
                    MenuListProps={{'aria-labelledby': 'basic-button'}}
                >
                    {renderedMenuItems}
                </Menu>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}> CookBook </Typography>
                {loginContent}
            </Toolbar>            
        </AppBar>
    );
}