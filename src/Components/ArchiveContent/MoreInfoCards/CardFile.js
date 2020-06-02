import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'; //firmar si es pdf
import GifIcon from '@material-ui/icons/Gif';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import GestureIcon from '@material-ui/icons/Gesture';
import ButtonBase from '@material-ui/core/ButtonBase';

import ViewPdf from './ViewerPdf'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  image: {
    width: 144,
    height: 144,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function ContentGif(props) {
  const classes = useStyles()
  return (
    <Grid item xs={12} sm container direction="column" spacing={2}>
      <Grid item container direction="row">
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <GifIcon fontSize="large"/>
          </Grid>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              {props.title}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid item container direction="row">
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={props.data.url} />
              </ButtonBase>
            </Grid>
          <Grid item xs>
            <Typography variant="body2" gutterBottom>
              Name: {props.data.filename.substring(0, props.data.filename.length-4)}
            </Typography>
            <Typography variant="body2" gutterBottom color="textPrimary" style={{ wordWrap: "break-word" }}>
              Hash: {props.data.hash_value}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
function ContentPDF(props) {
  return (
    <Grid item xs={12} container direction="column" spacing={2}>
      <Grid item container direction="row">
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            {props.data.filetype === "pdf"? 
            <PictureAsPdfIcon/>
            :
            <GifIcon fontSize="large"/>}
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="subtitle1">
              {props.title} 
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid container wrap item direction="row">
        <Grid item xs  style={{ wordWrap: "break-word" }} spacing={2}>
          <Typography variant="body2" gutterBottom>
            Name: {props.data.filename.substring(0, props.data.filename.length-4)}
          </Typography>
          <Typography variant="body2" gutterBottom color="textPrimary" >
            Hash: {props.data.hash_value}
          </Typography>
          {
          props.data.filetype === "pdf"? 
          <Typography variant="body2" gutterBottom color="textPrimary">
            Signature: {props.data.signature === "none"? "Unsigned": "Signed"}
          </Typography>
          : null
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

function CardInfoFile(props) {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Grid container spacing ={2}>
          {props.data.filetype === "pdf"?
          ContentPDF(props)
          :
          ContentGif(props)
          }

          <Grid item container direction="row" spacing={2}>
            {props.data.filetype === "pdf"?
            <Grid item>
              <ViewPdf url = {props.data.url} />
            </Grid>
            : null
            }
            <Grid item>
              <Button
                variant="contained"
                color="default"
                href={props.data.url}
                // download="sothing.pdf" 
                className={classes.button}
                startIcon={<CloudDownloadIcon/>}
                // onClick= {() => window.open(props.data.url)}
              >
                Download
              </Button>
            </Grid>
            <Grid item>
              {props.data.filetype === "pdf"? 
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<CreateIcon/>}
                disabled= {props.data.signature !== "none"? true: false}
              >
                {props.data.signature !== "none"? "Signed" : "Sign"}
              </Button>
              : null
              }
            </Grid>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}

export default withRouter(CardInfoFile);
