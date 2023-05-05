import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useTheme } from "@mui/styles";
import {Sidebar} from "..";

const NavBar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const isAuthenticated = true;

  const [mobileOpen, setMobileOpen] = useState(false);



  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen(prevState => !prevState)}
              className={classes.menuButton}
            >
              <Menu/>
            </IconButton>
          )}

          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && "Search ..."}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle></AccountCircle>
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={"/profile/:id"}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp; </>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                  }
                ></Avatar>
              </Button>
            )}
          </div>
          {isMobile && "Search ..."}
        </Toolbar>
      </AppBar>

      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(prevState => !prevState)}
              classes = { {paper: classes.drawPaper }}
              ModalProps={{keepMonted: true}}
            >
              <Sidebar setMobileOpen={setMobileOpen}>

              </Sidebar>

            </Drawer>
          ) : (
            <Drawer classes = { {paper: classes.drawPaper }} variant='permanent' open>

            
             <Sidebar setMobileOpen={setMobileOpen} />

            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};
export default NavBar;
