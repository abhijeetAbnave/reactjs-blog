import Axios from "axios";
import { stringify } from "qs";
import urlconfig from "../pwaConfig.json";



function createAxios() {
  const axios = Axios.create();
  axios.defaults.baseURL = `${urlconfig.apiEndPoint}/`;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.timeout = 120000; // 2*60*1000 = 120000 = 2 minutes

  axios.interceptors.response.use(
    (response) => response?.data,
    (error) => {
      if (error?.response?.status === 401) {
        // unauthorized call
        //   return store.dispatch(logout());
      }
      if (error?.response?.data) return Promise.reject(error.response.data);

      return Promise.reject(error);
    }
  );
  return axios;
  // }
}



// Initialise Axios
const api = createAxios();

const service = {
  //third party GET API call
  getData(route, query = {}, options = {}) {
    return api.get(`${route}?${stringify(query)}`, options);
  },
  getById(route, id, options = {}) {
    return api.get(`${route}/${id}`, options);
  },
  post(route, payload = {}, options = {}) {
    return api.post(route, payload, options);
  },
  postQs(route, query = {}, payload = {}, options = {}) {
    return api.post(`${route}?${stringify(query)}`, payload, options);
  },

  get: Axios.get,
  // post: Axios.post,
  // put: Axios.put,
  // delete: Axios.delete,
  getApi(route, query = {}, options = {}) {
    return api.get(
      `${urlconfig.apiEndPoint}${route}?${stringify(query)}`,
      options
    );
  },
  getByIdApi(route, id, options = {}) {
    return api.get(`${route}/${id}`, options);
  },
  postApi(route, payload = {}, options = {}) {
    return api.post(route, payload, options);
  },
  postQsApi(route, query = {}, payload = {}, options = {}) {
    return api.post(`${route}?${stringify(query)}`, payload, options);
  },
};

export default service;