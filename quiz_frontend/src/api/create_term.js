import axios from "axios";
import { SERVER_URL } from "../config/config";

export default async function createTerm(args, question, id_term, own_id) {
  const res = await axios({
    url: `${SERVER_URL}/api/v1/create/term`,
    method: "post",
    responseType: "json",
    timeoutErrorMessage: "Time out message",
    timeout: 10000,
    data: {
      ...args,
      question,
      id_term,
      own_id,
    },
  });

  const result = await res.data;
  window.location.href = `${window.location.origin}/term/${result[0]}/${result[1]
    .toString()
    .toLowerCase()
    .replaceAll(" ", "-")}`;
}
