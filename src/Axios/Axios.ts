import instanceAxios from 'axios';


export const axios = instanceAxios.create({
    baseURL: 'https://notes-listing-backend.onrender.com/',
    //baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
})
export default axios;
