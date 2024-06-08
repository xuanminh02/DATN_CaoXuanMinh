import axios from 'axios';
import { API_URL } from 'config';
import Cookies from 'js-cookie';

const get_all_user = async (data) => {
  const res = await axios({
    url: API_URL + '/api/v2/user',
    params: {
      ...data
    },
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + Cookies.get('access_token')
    }
  });
  const result = await res.data;
  return result;
};

export default get_all_user;
