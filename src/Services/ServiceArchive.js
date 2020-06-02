import axios from "axios";
import Cookies from 'js-cookie';

// const URI = "https://jordan-eval-test.apigee.net/txaas-archive/v2/"
// const URI = "https://jordan-eval-test.apigee.net/txaas-archive/"
const URI = "http://192.168.197.146/trusted-archive/archive/"
const safe = 'safelayer'
const uid = '3d14af56-ffd7-4e10-bc62-9c8b4f524d4b'
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
    }
    // let data = {"dateStart": body.dataStart, "dateEnd": body.dataEnd, "value": body.value}
    // return await axios.post(URI + "objects/search", data, requestOptions)
    //     .then(handleResponse)

    // let url = new URL(URI+ "objects/search")
    // if (body.dataStart !== undefined) url.searchParams.append('dateStart', body.dataStart)
    // if (body.dataEnd !== undefined) url.searchParams.append('dateEnd', body.dataEnd)
    // if (body.value !== undefined) url.searchParams.append('value', body.value)
    // return await axios.get(url, requestOptions)
    //     .then(handleResponse)
    let url = new URL(URI+ "objects/search")
    url.searchParams.append('tenant', safe)
    url.searchParams.append('uuid', uid)
    if (body.dataStart !== undefined) url.searchParams.append('dateStart', body.dataStart)
    if (body.dataEnd !== undefined) url.searchParams.append('dateEnd', body.dataEnd)
    if (body.value !== undefined) url.searchParams.append('value', body.value)
    return await axios.get(url, requestOptions)
        .then(handleResponse)
}

async function informationObject(keyObject) {
    let requestOptions = {
        headers: {
            "Authorization": "Bearer "+ Cookies.get('access_token'),
            "Content-Type": "application/json"
        }
    }
    // let data = {"keyObject": keyObject}
    // return await axios.post(URI + "objects/information", data, requestOptions)
    //     .then(handleResponse)
    
    // let url = new URL (URI + "objects/information")
    // url.searchParams.set('keyObject', keyObject)
    // return await axios.get(url, requestOptions)
    //     .then(handleResponse)

    let url = new URL (URI + "objects/information")
    url.searchParams.append('tenant', safe)
    url.searchParams.append('uuid', uid)
    url.searchParams.set('keyObject', keyObject)
    return await axios.get(url, requestOptions)
        .then(handleResponse)
}

async function notarize(keyObject) {
    let requestOptions = {
        headers: {
            "Authorization": "Bearer "+ Cookies.get('access_token'),
            "Content-Type": "application/json"
        }
    }
    // let data = {"keyObject": keyObject }
    // // return await axios.post(URI + "objects/notarize", data, requestOptions)
    // //     .then(handleResponse)
        
    // return await axios.put(URI + "objects/notarize", data, requestOptions)
    //     .then(handleResponse)

    let data = {"tenant":safe,"uuid":uid, 
    "addresses": {"eth":"0x045e57f8d00753ef812bef0bdbfffea1a6f42013",
    "miota":"GNUGJJYREFUEZXPSQIUYTHEWGGICSQDNUASCKJDVGFESMVMFYL9BIBZVAVPIBGXTJR9QU9TNA9YUQXMYAQACJGXYMA"
    },"keyObject": keyObject,
    "networks":["miota","eth"] }
    return await axios.put(URI + "objects/notarize", data, requestOptions)
        .then(handleResponse)

}

async function generateUrlUpload(body) {
    let requestOptions = {
        headers: {
            "Authorization": "Bearer "+ Cookies.get('access_token'),
            "Content-Type": "application/json"
        }
    }
    // let data = {"filename": body.filename, "filetype": body.filetype, "hash_alg": body.hash_alg,
    //     "hash_value": body.hash_value, "signed": body.signed}
    // // return await axios.post(URI + "upload-url", data, requestOptions)
    // //     .then(handleResponse)

    // return await axios.post(URI + "objects/upload-url", data, requestOptions)
    // .then(handleResponse)

    let data = {"tenant": safe, "uuid": uid, "filename": body.filename, "filetype": body.filetype, "hash_alg": body.hash_alg,
    "hash_value": body.hash_value}

    return await axios.post(URI + "objects/url-presigned/upload", data, requestOptions)
    .then(handleResponse)
}

async function verifySign(keyObject) {
    let requestOptions = {
        headers: {
            "Authorization": "Bearer "+ Cookies.get('access_token'),
            "Content-Type": "application/json"
        }
    }
    // let data = {"keyObject": keyObject}
    // return await axios.post(URI + "objects/verifySign", data, requestOptions)
    //     .then(handleResponse);
    let data = {
        "keyObject": keyObject,
        "tenant": "safelayer",
        "uuid": "3d14af56-ffd7-4e10-bc62-9c8b4f524d4b"
    }
    let test = "http://192.168.197.146/trusted-archive/archive/object/checkSign"
    return await axios.put(test, data, requestOptions)
        .then(handleResponse)
}

async function aboutMe() {
    let requestOptions = {
        headers: {
            "Authorization": "Bearer "+ Cookies.get('access_token'),
            "Content-Type": "application/json"
        }
    }
    return await axios.get("https://jordan-eval-test.apigee.net/txaas-openid/users/me", requestOptions)
        .then(handleResponse)
}

async function logout() {
    let requestOptions = {
        headers: {
            "Authorization": "Bearer "+ Cookies.get('access_token'),
            "Content-Type": "application/json"
        }
    }
    return await axios.get("https://jordan-eval-test.apigee.net/txaas-eauth/"
        + Cookies.get('tenant') + "/logout?redirect_uri=https://trusted-archive.herokuapp.com/logout", requestOptions)
        .then(handleResponse)
}


export const ServiceArchive = {
    search,
    informationObject,
    notarize,
    generateUrlUpload,
    verifySign,
    aboutMe,
    logout
}