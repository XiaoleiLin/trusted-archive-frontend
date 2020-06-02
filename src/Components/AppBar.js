import React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle } from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Cookies from 'js-cookie';

import { ServiceArchive } from "../Services/ServiceArchive";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 'flex',
        paddingBottom:  70
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBarSpacer: theme.mixins.toolbar,
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
}),
);

function ButtonAppBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
  }

  const closeSession = () => {
      logout();
      setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const logout =  async () => {
    // let res = await ServiceArchive.aboutMe()
    // if(res.authn_details.directSso === "false") await ServiceArchive.logout()
    if(props.canLogout) await ServiceArchive.logout()
    Cookies.remove('access_token')
    Cookies.remove('expires_token')
    Cookies.remove('tenant')
    props.history.push("/logout")
  }

  return (

    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Typography button='true' variant="h6" className={classes.title}>
                Trusted Archive
            </Typography>

            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <ExitToAppIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={closeSession}>
                    Exit
                </MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withRouter(ButtonAppBar);