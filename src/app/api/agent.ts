import axios, {AxiosResponse} from "axios" // AxiosResponse is an interface
import { Activity } from "../models/activity";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};


axios.defaults.baseURL = "http://localhost:5000/api";

// use axios.interceptor
axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    // Promise.reject vs Throw
    // https://stackoverflow.com/questions/33445415/javascript-promises-reject-vs-throw
    return await Promise.reject(error);
  }
});

const responseBody=<T>(response:AxiosResponse<T>)=>response.data;

// Review Promise:
// the Return value from the the first method will post to the first method in the "then"
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody), // get is a method.
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities={
    list:()=>requests.get<Activity[]>('/activities') // notice the BaseURL
}

const agent={
    Activities
}

export default agent;