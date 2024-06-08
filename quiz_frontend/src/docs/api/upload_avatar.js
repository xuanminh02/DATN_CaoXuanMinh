import axios from "axios";
import { SERVER_URL } from "../../config/config";

export const uploadAvatarClient = async (formData) => {
  const res= await axios.post(`${SERVER_URL}/api/v1/upload/avatar`, formData, {
    headers: {
        'content-type': 'multipart/form-data'
    },
    responseType: "json"
  })
  const result = await res.data;
  return result
};
