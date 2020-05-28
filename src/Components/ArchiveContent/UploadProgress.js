import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

class UploadProgress extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            open: true,
            hideTime: null,
            allComplete: false,
        }
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        // console.log(this.state)
        // let complete = true
        // for (var [key,value] of Object.entries(this.props.progress)){
        //     if (value < 100) complete = false
        // }

        // if (complete === true && prevState.allComplete === false) 
        //     this.setState({allComplete: complete})

        // if (this.state.allComplete && this.state.hideTime === null)
        //     this.setState({hideTime:6000})
    }

    handleClose (event, reason) {
        if (reason === "clickaway") {
            return
        }
        this.setState({open: false})
        this.props.parentCallback (true)
    }

    handlerMessage = () => {
        let table = []
        let complete = true;
        for (var [key, value] of Object.entries(this.props.progress)) {
            if (value<100) complete = false
            table.push(
                <div>
                    <Typography>
                        {key}
                    </Typography>
                    <Box width="250px">
                        <LinearProgress variant="determinate" value={value} />
                    </Box>
                </div>
            )
        }
        if (this.state.allComplete !== complete) this.setState({allComplete: complete})
        return table
    }
    render() {
        let {progress} = this.props
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={this.state.hideTime}
                    onClose={(e, r) => this.handleClose(e, r)}
                    message={
                        this.handlerMessage()
                    }
                    action={
                        this.state.allComplete?
                        <IconButton size="small" aria-label="close" color="inherit" onClick={(e,r) => this.handleClose(e,r)}>
                            <DoneIcon fontSize="small" />
                        </IconButton>
                        : null
                    }
                />
            </div>
        )
    }
}

export default UploadProgress