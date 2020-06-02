import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

import { ServiceArchive } from "../../Services/ServiceArchive";
import CardInfoFile from "./MoreInfoCards/CardFile";
import CardBlockchain from "./MoreInfoCards/CardBlockchain";


const useStyles = theme => ({
    root: {
        flexGrow: 1,
        height: '10vw',
        color: 'white',
    },
    appBarSpacer: theme.mixins.toolbar,
    paper: {
      paddingBottom: theme.spacing(2),
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
  }

  async getData () {
    this.setState({ isLoading: true });
    let data = await ServiceArchive.informationObject(this.props.keyObject)
    this.setState({ data: data, isLoading: false });
  }

  callbackCardBlockchain = (newdata) => {
    this.setState({data: newdata})
  }
  
  render() {
    // const classes = useStyles();
    const { classes} = this.props;
    return (
      <div >
        <Grid
          container 
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
                iota = {this.state.data.object.miota !== "none"? this.state.data.miota: null}
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
