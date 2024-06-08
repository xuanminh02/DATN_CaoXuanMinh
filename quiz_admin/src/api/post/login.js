import axios from 'axios';
import { API_URL } from 'config';

const login = async (data) => {
  const res = await axios({
    url: API_URL + '/api/v1/login',
    method: 'post',
    data: {
      ...data
    }
  });
  const result = await res.data;
  return result;
};

export default login;
