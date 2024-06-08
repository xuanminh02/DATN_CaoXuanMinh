import axios from 'axios';
import { API_URL } from 'config';

const get_current_result_session = async () => {
  const res = await axios({
    url: API_URL + '/api/v1/result/current',
    method: 'get'
  });
  const result = await res.data;
  return result;
};

export default get_current_result_session;
