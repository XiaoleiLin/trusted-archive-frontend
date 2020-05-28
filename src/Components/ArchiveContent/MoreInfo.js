import React from "react";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';

import { toDataTable } from './Utils';
import { ServiceArchive } from "../../Services/ServiceArchive";

import { RepeatOneSharp, ThreeSixty } from "@material-ui/icons";
import clsx from 'clsx';
import CardInfoFile from "./MoreInfoCards/CardFile";
import CardBlockchain from "./MoreInfoCards/CardBlockchain";


const useStyles = theme => ({
    root: {
        flexGrow: 1,
        background: '#0091ea',
        height: '10vw',
        color: 'white',
    },
    appBarSpacer: theme.mixins.toolbar,
    paper: {
      padding: theme.spacing(1.5),
      color: theme.palette.text.secondary,
      // textAlign: 'center',
    },
  });

class MoreInfo extends React.Component {
  constructor( props ) {
      super( props )
      this.state = {
          isLoading: false,
          data: null,
      }
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
      // if(this.props.dateStart !== prevProps.dateStart || this.props.dateEnd !== prevProps.dateEnd)
      //     this.getData();
      
      // if (this.state.selected !== prevState.selected && this.state.selected !== null)
      //     this.props.parentCallback (this.state.selected)
      // if (this.state.notarize === false) this.notarize()
  }

  // get data
  async getData () {
    this.setState({ isLoading: true });

    let data = await ServiceArchive.informationObject(this.props.keyObject)
    // let data = moreInfoMockup

    this.setState({ data: data, isLoading: false });

  }

  callbackCardBlockchain = (newdata) => {
    this.setState({data: newdata})
  }
  
  render() {
    // const classes = useStyles();
    const { classes, className } = this.props;
    return (
      <div>
        <Grid
          container spacing={3}
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          {this.state.data == null ? 
          <Grid item>
              <Skeleton animation="wave" variant="rect" height={250} />
              <Skeleton animation="wave" variant="text" height={30}/>
              <Skeleton animation="wave" variant="rect" height={250} />
          </Grid>
          :
          <div>
            <Grid className={classes.paper}>
              <CardInfoFile 
                title = "File Information" 
                data = {this.state.data.object}
              />
            </Grid>
            <Grid item className={classes.paper}>
              <CardBlockchain
                title = "Blockchain Notary" 
                keyObject = {this.props.keyObject}
                eth = {this.state.data.object.eth !== "none"? this.state.data.eth: null}
                iota = {this.state.data.object.iota !== "none"? this.state.data.iota: null}
                parentCallback = {this.callbackCardBlockchain}
              />
            </Grid>
          </div>
          }
        </Grid>

      </div>
    );
  }
}

export default withStyles(useStyles, {withTheme: true}) (withRouter(MoreInfo));
