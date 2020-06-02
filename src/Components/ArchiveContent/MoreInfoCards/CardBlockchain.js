import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      {eth? ethereum (eth, classes):null}
      {iota? iotaFunction (iota, classes):null}
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
              Ethereum Network
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Typography variant="body2" gutterBottom color="textPrimary">
                  Transaction: {eth.txHash}
                </Typography>
                {/* <Typography variant="body2" gutterBottom color="textPrimary">
                  From: {eth.from}
                </Typography> */}
                <Typography variant="body2" gutterBottom color="textPrimary">
                  Timestamp: {new Date(+eth.timestamp*1000).toLocaleString()}
                </Typography>
                <Typography variant="body2" gutterBottom color="textPrimary">
                  Block: {eth.blockNumber}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary" 
                  size="small"
                  className={classes.button}
                  startIcon={<OpenInNewIcon />}
                  style={{ textTransform: 'none' }}
                  onClick= {() => {window.open("https://ropsten.etherscan.io/tx/" + eth.txHash)}}
                >
                  Etherscan
                </Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        :
        <ExpansionPanel disabled>
          <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Ethereum Network
              </Typography>
              <Typography className={classes.secondaryHeading}>
                No confirmed
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
        iota.confirmed?
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>IOTA Network</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Typography>
                  <Typography variant="body2" gutterBottom color="textPrimary">
                    Transaction: {iota.txHash}
                  </Typography>
                  <Typography variant="body2" gutterBottom color="textPrimary">
                    Timestamp: {new Date(+iota.timestamp*1000).toLocaleString()}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary" 
                  size="small"
                  className={classes.button}
                  startIcon={<OpenInNewIcon />}
                  style={{ textTransform: 'none' }}
                  onClick= {() => {window.open("https://thetangle.org/transaction/" + iota.txHash)}}
                >
                  TheTangle
                </Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        :
        <ExpansionPanel disabled>
          <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                IOTA Network
              </Typography>
              <Typography className={classes.secondaryHeading}>
                No confirmed
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
                <Typography gutterBottom variant="subtitle1">
                  {props.title}
                </Typography>
              </Grid>
              {(props.eth || props.iota) ?
                NetworksExpansionPanel(props.eth, props.iota, classes)
                :
                <Grid item container justify="center" alignItems="center">
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
