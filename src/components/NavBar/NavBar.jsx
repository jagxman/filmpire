import React, { useState, useEffect } from "react";
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
import {Sidebar, Search} from "..";
import {fetchToken, moviesApi, createSessionID} from "../../utils";

import { useDispatch, useSelector } from "react-redux";

import { setUser, userSelector } from "../../features/auth";

const NavBar = () => {

  const { isAuthenticated, user} = useSelector(userSelector);
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const dispatch = useDispatch();




  const token = localStorage.getItem('request_token');
  const session_id = localStorage.getItem('session_id');

  useEffect(() => {

    const loginUser = async () => {
      if (token) {
        if (session_id){
          const { data: userData } = await moviesApi.get(`/account?session_id=${session_id}`);

          dispatch(setUser(userData));


        } else{
          const new_session = await createSessionID();

          const { data: userData } = await moviesApi.get(`/account?session_id=${new_session}`);

          dispatch(setUser(userData));
        }
      }
    };

    loginUser();
  }, [token]);

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
          {!isMobile && <Search></Search>}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle></AccountCircle>
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
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
          {isMobile && <Search></Search>}
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
