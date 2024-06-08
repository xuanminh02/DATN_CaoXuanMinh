import axios from 'axios';
import { API_URL } from 'config';
import Cookies from 'js-cookie';

const get_profile_user = async () => {
  const res = await axios({
    url: API_URL + '/api/v2/profile',
    headers: {
      Authorization: 'Bearer ' + Cookies.get('access_token')
    }
  });
  const result = await res.data;
  return result;
};

export default get_profile_user;
