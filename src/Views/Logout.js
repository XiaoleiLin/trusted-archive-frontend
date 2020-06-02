import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
    root: {
        backgroundColor: '#ebeeef',
        height: '100vh',
        minHeight : '100vh',
    },
})

class Logout extends Component {
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
            style={{padding:'25vh'}}
            >
                <Card style={{ height: '50vh', minHeight : '50vh', width:'50vw', minWidth : '50vw'}}>
                    <CardContent style={{padding:'10vh'}}>
                            <Typography align= "center" gutterBottom variant="h5" component="h5">
                                You closed your account session
                            </Typography>
                            <Typography align= "center" gutterBottom variant="subtitle1">
                                Close all browser windows to complete the process.
                            </Typography>
                    </CardContent>
                </Card>
            </Grid> 
        </div>
    )
  }

}

export default withStyles(useStyles, {withTheme: true}) (withRouter(Logout));


