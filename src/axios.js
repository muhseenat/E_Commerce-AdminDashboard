import axios from 'axios'

const serverApi=axios.create({
    baseURL:'http://localhost:8080/api/'
})

export default serverApi