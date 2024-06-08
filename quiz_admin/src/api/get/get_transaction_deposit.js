import axios from 'axios';
import { API_URL } from 'config';
import Cookies from 'js-cookie';

const get_transaction_deposit = async (data) => {
  const res = await axios({
    url: API_URL + '/api/v2/transaction/deposit',
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

export default get_transaction_deposit;
