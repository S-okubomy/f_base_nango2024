import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { Link } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const pages = [
  <Link to="/"><span style={{ fontSize: "10px", color: "black" }}>トップページ</span></Link>,
  <Link to="/nango/rt/info_nango_temp"><span style={{ fontSize: "10px", color: "black" }}>お店のご案内</span></Link>,
  <Link to="/nango/rt/youtube_info_nango_temp"><span style={{ fontSize: "10px", color: "black" }}>配信&amp;収録</span></Link>,
  <Link to="/nango/rt/system_nango_temp"><span style={{ fontSize: "10px", color: "black" }}>ご利用方法</span></Link>,
  <Link to="/nango/rt/party_nango_temp"><span style={{ fontSize: "10px", color: "black" }}>宴会プラン</span></Link>,
  <Link to="/nango/rt/drink_nango_temp"><span style={{ fontSize: "10px", color: "black" }}>飲み物</span></Link>,
  <Link to="/nango/rt/food_nango_temp"><span style={{ fontSize: "10px", color: "black" }}>お食事</span></Link>,
  <Link to="/nango/rt/event_nango_temp"><span style={{ fontSize: "10px", color: "black" }}>イベントカレンダー</span></Link>,
  <Link to="/nango/rt/qa_by_ai_temp"><span style={{ fontSize: "10px", color: "black" }}>AI南郷君</span></Link>,
  <Link to="/nango/rt/regdb_top_info"><span style={{ fontSize: "10px", color: "black" }}>管理用</span></Link>,
];

function HeaderAppbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = createTheme({
    palette: {
      primary: blue,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <AudiotrackIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                <span style={{ fontSize: "12px", color: "inherit" }}>メニュー</span>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page, ind) => (
                    <MenuItem key={ind} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <AudiotrackIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                <span style={{ fontSize: "12px", color: "inherit" }}>メニュー</span>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page, ind) => (
                <Button
                    key={ind}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page}
                </Button>
                ))}
            </Box>
            </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default HeaderAppbar;