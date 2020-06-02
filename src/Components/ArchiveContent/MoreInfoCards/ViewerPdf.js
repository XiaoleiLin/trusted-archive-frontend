import React, { Component }from 'react';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';

class ViewerPdf extends Component {
    constructor(props) {
        super(props);
        this.state = { ready: false };
    }
    
    loadDoc(url) {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
            }
        };
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
            if (this.status === 200) {
            var type = xhr.getResponseHeader('Content-Type');
            var blob = new Blob([this.response], { type: type });
            var URL = window.URL || window.webkitURL;
            var downloadUrl = URL.createObjectURL(blob);
            window.open(downloadUrl)
            setTimeout(function () { 
                URL.revokeObjectURL(downloadUrl); }, 100);
            }
        };
        xhr.send();
    }

    render(){
        return (
            <div className="ViewPdf">
                <Button 
                variant="contained" 
                color="primary" 
                startIcon={<VisibilityIcon />}
                onClick={()=>{this.loadDoc(this.props.url)}}>
                View
                </Button>
            </div>
        );

    }
}

export default ViewerPdf;