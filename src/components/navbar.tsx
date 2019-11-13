import React from "react";
import { connect } from "react-redux";
import { AppState, initialState } from "../store";
import { Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import isTokenExpired from "../helpers/isTokenExpired";
import { IAuthenticatedDetails } from "../model/auth/auth";
import { logoutUser } from "../actions/auth/authActions";

// MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

interface Props {
  userInformation: IAuthenticatedDetails;
  logoutUser: Function;
}
interface State {}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    width: '100%',
    textAlign: 'left',
    // fontFamily: 'Press Start 2P',
  },
  authButton: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none"
    },
  },
  navButtonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export class Navbar extends React.Component<
  Props & RouteComponentProps,
  State
> {
  onLogout = async e => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    await this.props.logoutUser(initialState.userInformation);
    this.props.history.push("/login");
  };

  public render() {
    const NavBar = () => {
      const classes = useStyles({});
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title}>
                <h2 className={classes.title}>
                  A HERO'S BAG
                  </h2>
              </Typography>
              <div className={classes.navButtonWrapper}>
                {isTokenExpired() ? guestLinks(classes) : authLinks(classes)}
              </div>
              
            </Toolbar>
          </AppBar>
        </div>
      );
    };

    const authLinks = (classes) => {
      return (
        <Button
            className={classes.authButton}
            onClick={this.onLogout.bind(this)}
            variant="contained"
            color="primary"
          >
            Logout
      </Button>
      )
    }
      
    const guestLinks = classes => {
      return (
        <>
          <Button
            className={classes.authButton}
            component={Link}
            to={`/register`}
            variant="contained"
            color="primary"
          >
            Register
          </Button>

          <Button
            className={classes.authButton}
            component={Link}
            to={`/login`}
            variant="contained"
            color="primary"
          >
            Login
          </Button>

          {/* <Link className="nav-link" to="/register">
            <Button color="inherit">Register</Button>
          </Link>
          <Link className="nav-link" to="/login">
            Sign In
          </Link> */}
        </>
      );
    };

    return (
      <>
        <NavBar />
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  userInformation: state.userInformation
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
