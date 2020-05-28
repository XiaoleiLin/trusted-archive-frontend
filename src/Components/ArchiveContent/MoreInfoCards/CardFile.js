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
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'; //firmar si es pdf
import GifIcon from '@material-ui/icons/Gif';
import Button from '@material-ui/core/Button';
import ViewPdf from './ViewerPdf'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#0091ea',
    height: '10vw',
    color: 'white',

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
}));



function CardInfoFile(props) {
  const classes = useStyles();
  return (
    <Card >
      <CardContent>
        <Grid container spacing ={2}>
          <Grid item xs={12} sm container>
            <Grid item xs={9} container direction="column" spacing={2}>
              <Grid item>
                <Typography gutterBottom variant="subtitle1" style={{ cursor: 'pointer' }}>
                  {props.data.format === "pdf"? <PictureAsPdfIcon/> : <GifIcon/>}  {props.title} 
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  Name: {props.data.name}
                </Typography>
                <Typography variant="body2" gutterBottom color="textPrimary">
                  {/* Hash512: el Hash512 */}
                  Hash 512: {props.data.hash512}
                </Typography>
                <Typography variant="body2" gutterBottom color="textPrimary">
                  Signature: {props.data.signature === "none"? "Unsigned": "Signed"}
                </Typography>
              </Grid>
            </Grid>
            {/* <Grid item xs={3} container direction="row" spacing={2}> */}
            
          </Grid>
          <Grid>
              <ViewPdf url = {props.data.url} />
              <Button
                variant="contained"
                color="default"
                // href={props.data.url}
                // download="sothing.pdf" 
                className={classes.button}
                startIcon={<CloudDownloadIcon/>}
                onClick= {() => window.open(props.data.url)}
              >
                Download
              </Button>
              {props.data.format === "pdf"? 
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<PictureAsPdfIcon />}
                >
                  Sign
                </Button>
                : null
              }
            </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default withRouter(CardInfoFile);
