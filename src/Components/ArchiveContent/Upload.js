import React, { Component } from 'react'
import jsSHA from 'jssha'
import axios from 'axios'
import { DropzoneDialog } from "material-ui-dropzone"
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { ServiceArchive } from "../../Services/ServiceArchive"
import UploadProgress from "./UploadProgress"
import { Chip } from '@material-ui/core'


class Upload extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            open: false,
            metadata: {},
            progress: {},
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot){
    }

    onChange (loadedFiles) {
        this.getUrlWithMeta(loadedFiles)
    }

    onDelete (deletedFile) {
    }

    callbackFinish = (finish) => {
        if (finish){
            this.setState({progress: {}, metadata: {}})
        }
    }

    getUrlWithMeta (loadedFiles) {
        loadedFiles.forEach(file => {
            var reader = new FileReader();
            let parent = this
            reader.onload = () => {
                var content = reader.result.slice(reader.result.indexOf(',') + 1);
                var sha = new jsSHA("SHA-512", "B64");
                sha.update(content)
                let object = {
                    "filename": file.name,
                    "filetype": file.type.split('/')[1],
                    "hash_alg": "sha512",
                    "hash_value": sha.getHash("HEX"),
                    "signed": false
                }
                let meta = parent.state.metadata
                meta[file.name] = object
                parent.setState({metadata: meta})
            }
            reader.readAsDataURL(file)
        })
    }

    async uploadFile(file){
        let response = await ServiceArchive.generateUrlUpload(this.state.metadata[file.name])
        let parent = this
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let splits = new URL(response.url).pathname.split("/")
                let keyObject = splits[3] + "/" + splits[4] + "/" + splits[5]
                let verify = ServiceArchive.verifySign(keyObject)
            }
        }
        xhr.upload.onprogress = function (progressEvent) {
            var completed = Math.round((progressEvent.loaded*100)/progressEvent.total)
            let progress = parent.state.progress
            progress[file.name] = completed
            parent.setState({progress: progress})
        }
        xhr.open("PUT", response.url, true)
        xhr.setRequestHeader( 'Content-Type', 'application/pdf')
        let data = new FormData()
        data.append('file', file)

        xhr.send(data);
    }

    render(){
        return (
            <div>

                <Button
                    variant="contained" 
                    color="primary" 
                    onClick={() => this.setState({open: true})}
                    startIcon={<CloudUploadIcon/>}
                >
                    Upload
                </Button>
                <DropzoneDialog
                    acceptedFiles={['image/gif', 'application/pdf']}
                    cancelButtonText={"cancel"}
                    submitButtonText={"submit"}
                    maxFileSize={50000000}
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    onSave={(files) => {
                        files.forEach(element => this.uploadFile(element))
                        this.setState({open: false})
                    }}
                    showPreviews={true}
                    showFileNamesInPreview={true}
                    showAlerts = {false}
                    onChange={ (loadedFiles) => this.onChange(loadedFiles)}
                    onDelete= { (deletedFile) => this.onDelete(deletedFile)}

                />
                {
                Object.keys(this.state.progress).length !== 0? 
                <UploadProgress 
                    parentCallback = {this.callbackFinish}
                    progress = {this.state.progress}
                />
                : null
                }

            </div>
        );
    }
}

export default Upload;
