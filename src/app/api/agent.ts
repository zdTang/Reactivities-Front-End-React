import axios, {AxiosResponse} from "axios" // AxiosResponse is an interface

axios.defaults.baseURL = "http://localhost:5000/api";
const responseBody=(response:AxiosResponse)=>response.data;

// Review Promise:
// the Return value from the the first method will post to the first method in the "then"
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),   // get is a method.
  post:(url:string,body:{})=>axios.post(url,body).then(responseBody),
  put: (url:string,body:{})=>axios.put(url,body).then(responseBody),
  del:(url:string)=>axios.delete(url).then(responseBody)
};

const Activities={
    list:()=>requests.get('/activities') // notice the BaseURL
}

const agent={
    Activities
}

export default agent;