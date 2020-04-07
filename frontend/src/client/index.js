import axios from 'axios'

export default() =>{
    const _url_ = 'http://127.0.0.1:8000/'
    return axios.create({baseURL: _url_ })
}