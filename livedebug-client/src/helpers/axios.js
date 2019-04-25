import axios from 'axios'

export default()=>{
  return axios.create({
    baseURL: 'http://35.198.245.210/'
  })
}
