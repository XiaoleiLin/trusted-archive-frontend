import axios from "axios";
import Cookies from 'js-cookie';

const URI = "https://jordan-eval-test.apigee.net/txaas-archive/"

// const requestOptions = {
//     headers: {
//         "Authorization": "Bearer "+ Cookies.get('access_token'),
//         "Content-Type": "application/json"
//     }
// };

function handleResponse(response) {

    const data = response.data;
    if (!(response.status===200 || response.status===201)) {
        if (response.status === 401) {
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error)
    }
    return data
}

async function search(body) {
    let requestOptions = {
        headers: {
            "Authorization": "Bearer "+ Cookies.get('access_token'),
            "Content-Type": "application/json"
        }
    };
    let data = {"dateStart": body.dataStart, "dateEnd": body.dataEnd, "value": body.value}
    return await axios.post(URI + "objects/search", data, requestOptions)
        .then(handleResponse)
}

async function informationObject(keyObject) {
    let requestOptions = {
        headers: {
            "Authorization": "Bearer "+ Cookies.get('access_token'),
            "Content-Type": "application/json"
        }
    };
    let data = {"keyObject": keyObject}
    return await axios.post(URI + "objects/information", data, requestOptions)
        .then(handleResponse)
}

async function notarize(keyObject) {
    let requestOptions = {
        headers: {
            "Authorization": "Bearer "+ Cookies.get('access_token'),
            "Content-Type": "application/json"
        }
    };
    let data = {"keyObject": keyObject }
    return await axios.post(URI + "objects/notarize", data, requestOptions)
        .then(handleResponse)
}

async function generateUrlUpload(body) {
    let requestOptions = {
        headers: {
            "Authorization": "Bearer "+ Cookies.get('access_token'),
            "Content-Type": "application/json"
        }
    };
    let data = {"filename": body.filename, "filetype": body.filetype, "hash_alg": body.hash_alg,
        "hash_value": body.hash_value, "signed": body.signed}
    return await axios.post(URI + "upload-url", data, requestOptions)
        .then(handleResponse)
}

async function verifySign(keyObject) {
    let requestOptions = {
        headers: {
            "Authorization": "Bearer "+ Cookies.get('access_token'),
            "Content-Type": "application/json"
        }
    };
    // let data = {"keyObject": keyObject}
    // return await axios.post(URI + "objects/verifySign", data, requestOptions)
    //     .then(handleResponse);
    let data = {
        "keyObject": keyObject,
        "tenant": "safelayer",
        "uuid": "3d14af56-ffd7-4e10-bc62-9c8b4f524d4b"
    }
    let test = "http://192.168.197.146/trusted-archive/archive/object/verifySign"
    return await axios.post(test, data, requestOptions)
        .then(handleResponse)
}


export const ServiceArchive = {
    search,
    informationObject,
    notarize,
    generateUrlUpload,
    verifySign
}