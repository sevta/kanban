import axios from "axios";

export const apiUrl = "https://todo-api-18-140-52-65.rakamin.com/";

export const fetcher = (url: string, token: any) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

type PostWithBearerTokenType = {
  token: string;
  values: Record<any, any>;
  api: string;
};

export const postWithBearerToken = async ({
  api,
  token,
  values,
}: PostWithBearerTokenType) => {
  try {
    const resp = await axios.post(api, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp;
  } catch (error) {
    throw error;
  }
};
