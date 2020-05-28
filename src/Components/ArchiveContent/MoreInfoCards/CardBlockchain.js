import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from "@material-ui/core/Container";
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom'
import red from '@material-ui/core/colors/red';
import grey from "@material-ui/core/colors/grey";
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { ServiceArchive } from "../../../Services/ServiceArchive";
import CircularIntegration from "./Notarize"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // background: '#0091ea',
    // height: '10vw',
    // color: 'white',

  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 48,
    height: 48,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  paper2: {
    padding: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function NetworksExpansionPanel(eth, iota, classes) {
  return (
    <div className={classes.root}>
      {eth? ethereum (eth, classes):<div></div>}
      {iota? iotaFunction (iota, classes) : <div></div>}
    </div>
  );
}

function ethereum (eth, classes) {
  return (
    <div>
      {eth.blockNumber !== -1 && eth.timestamp !== "-1"?
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Ethereum network
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs={11} container direction="column" spacing={2}>
                  <Typography variant="body2" gutterBottom color="textPrimary">
                    Transaction: {eth.txHash}
                  </Typography>
                  <Typography variant="body2" gutterBottom color="textPrimary">
                    From: {eth.from}
                  </Typography>
                  <Typography variant="body2" gutterBottom color="textPrimary">
                    Notarized on the block: {eth.blockNumber}
                  </Typography>
                  <Typography variant="body2" gutterBottom color="textPrimary">
                    Timestamp: {new Date(+eth.timestamp*1000).toLocaleString()}
                  </Typography>
                </Grid>
                {/* <Grid item xs={1}>
                  <OpenInNewIcon className={classes.image}/> */}
                <Grid>
                  <Button
                    variant="contained"
                    color="primary" 
                    size="small"
                    className={classes.button}
                    startIcon={<OpenInNewIcon />}
                    onClick= {() => {window.open("https://ropsten.etherscan.io/tx/" + eth.txHash)}}
                  >
                    Open in external explore
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        :
        <ExpansionPanel>
          <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Ethereum network
              </Typography>
              <Typography className={classes.secondaryHeading}>
                No confirmado
              </Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      }
    </div>
  )
}

function iotaFunction (iota, classes) {
  return (
    <div>
      {
        // iota.confirmed?
        iota?
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>IOTA network</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs={11} container direction="column" spacing={2}>
                  <Typography>
                    <Typography variant="body2" gutterBottom color="textPrimary">
                      Transaction: {iota.txHash}
                    </Typography>
                    <Typography variant="body2" gutterBottom color="textPrimary">
                      Timestamp: {new Date(+iota.timestamp*1000).toLocaleString()}
                    </Typography>
                  </Typography>
                </Grid>
                {/* <Grid item xs={1}> 
                  <OpenInNewIcon className={classes.image}/> */}
                <Grid>
                  <Button
                    variant="contained"
                    color="primary" 
                    size="small"
                    className={classes.button}
                    startIcon={<OpenInNewIcon />}
                    onClick= {() => {window.open("https://thetangle.org/transaction/" + iota.txHash)}}
                  >
                    Open in external explore
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        :
        <ExpansionPanel>
          <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                IOTA network
              </Typography>
              <Typography className={classes.secondaryHeading}>
                No confirmado
              </Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      }
    </div>
  )
}

function CardBlockchain(props) {
  const classes = useStyles();

  return (
    <Card >
      <CardContent>
        <Grid container spacing ={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography gutterBottom variant="subtitle1" style={{ cursor: 'pointer' }}>
                  {props.title} 
                  <Divider/> 
                  {props.eth || props.iota ? "This file is notarized in 2 networks": null}
                </Typography>
              </Grid>
              {(props.eth || props.iota) ?
                NetworksExpansionPanel(props.eth, props.iota, classes)
                :
                <Grid item >
                  <CircularIntegration 
                  parentCallback= {props.parentCallback}
                  keyObject = {props.keyObject}
                  />
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default withRouter(CardBlockchain);
