import axios from "axios";
import { UserCredentialType } from "../types/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL

export const loginUserApi = async (
  credentials: Partial<UserCredentialType>
) : Promise<any> => {
  try {
    const { data } = await axios.post(`${API_URL}/api/login`, {
      credentials,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const registerUserApi = async (credentials: UserCredentialType) : Promise<any> => {
  try {
    const { data } = await axios.post(`${API_URL}/api/register`, {
      credentials,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
