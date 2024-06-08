import axios from 'axios';
import { API_URL } from 'config';
import Cookies from 'js-cookie';

const put_bank_setting = async (data) => {
  const res = await axios({
    url: API_URL + '/api/v2/bank/setting',
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

export default put_bank_setting;
