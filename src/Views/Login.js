import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
    root: {
        backgroundColor: '#ebeeef',
        height: '100vh',
        minHeight : '100vh',
    },
})

class Login extends Component {
  render(){
    const { classes } = this.props;
    return (
        <div className={classes.root}>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{      position: "relative",padding:'25vh'}}
            >
                <Card style={{ height: '50vh', minHeight : '50vh', width:'50vw', minWidth : '50vw'}}>
                    <CardContent style={{padding:'10vh'}}>
                      <Typography align= "center" gutterBottom variant="h3" component="h3">
                        Login
                      </Typography>
                      <div align= "center" style={{margin:'5vh'}}>
                        <Button 
                        margin="20"
                        variant="contained" 
                        color="primary" 
                        href="https://trusted-archive.herokuapp.com/safelayer/login">
                          Safelayer
                        </Button>
                      </div>
                      <div align= "center" >
                        <Button 
                        margin= "2"
                        variant="contained" 
                        color="primary" 
                        href="https://trusted-archive.herokuapp.com/entrustdatacard/login">
                          Entrust Datacard
                        </Button>
                      </div>
                    </CardContent>
                </Card>
            </Grid> 
        </div>
    )
  }

}

export default withStyles(useStyles, {withTheme: true}) (withRouter(Login));
