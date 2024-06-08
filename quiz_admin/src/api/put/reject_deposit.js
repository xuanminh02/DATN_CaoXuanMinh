
import axios from 'axios';
import { API_URL } from 'config';
import Cookies from 'js-cookie';

const reject_deposit = async (data) => {
  const res = await axios({
    url: API_URL + '/api/v2/deposit/reject',
    method: 'put',
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

export default reject_deposit;
