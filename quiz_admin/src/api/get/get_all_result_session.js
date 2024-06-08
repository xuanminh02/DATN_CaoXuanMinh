import axios from 'axios';
import { API_URL } from 'config';
import Cookies from 'js-cookie';

const get_all_result_session = async (data) => {
  const res = await axios({
    url: API_URL + '/api/v2/result/session',
    method: 'get',
    params: {
      ...data
    },
    headers: {
      Authorization: 'Bearer ' + Cookies.get('access_token')
    }
  });
  const result = await res.data;
  return result;
};

export default get_all_result_session;
