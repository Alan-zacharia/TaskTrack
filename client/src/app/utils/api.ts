import axios from "axios";
import { UserCredentialType } from "../types/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL

axios.defaults.withCredentials = true

export const loginUserApi = async (
  credentials: Partial<UserCredentialType>
) : Promise<any> => {
  try {
    const response  = await axios.post(`${API_URL}/api/login`, {
      credentials,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const registerUserApi = async (credentials: UserCredentialType) : Promise<any> => {
  try {
    const response  = await axios.post(`${API_URL}/api/register`, {
      credentials,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
