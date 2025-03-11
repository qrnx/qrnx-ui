import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const serverInstance = axios.create({
  baseURL: `${process.env.STRAPI_API_URL}/api/`,
});

export const serverWithoutInterceptor = axios.create({
  baseURL: `${process.env.STRAPI_API_URL}/api/`,
});

serverInstance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession(authOptions);

    if (session) {
      config.headers["Authorization"] = `Bearer ${session.jwt}`;
    }

    return config;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.log("Request error", error);
    return Promise.reject(error);
  }
);

export default serverInstance;
