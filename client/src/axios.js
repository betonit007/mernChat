import axios from 'axios'

const instance = axios.create(
{ baseURL: "http://localhost:5000" }
    
//{ baseURL: "https://mernpusherchat.uk.r.appspot.com/" } //for production purposes.
)

export default instance;