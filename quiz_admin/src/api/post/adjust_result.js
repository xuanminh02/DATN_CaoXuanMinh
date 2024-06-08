import axios from 'axios';
import { API_URL } from 'config';
import Cookies from 'js-cookie';

const adjust_result = async (data) => {
  const res = await axios({
    url: API_URL + '/api/v1/adjust/result',
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + Cookies.get('access_token')
    },
    data: {
      ...data
    }
  });
  const result = await res.data;
  return result;
};

export default adjust_result;
