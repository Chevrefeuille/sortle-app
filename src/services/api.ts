import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

export const getDailyRanking = async () => {
  try {
    const res = await instance.get("daily");
    const data = res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const sendAnswer = async (answer: any) => {
  try {
    const res = await instance.post("check", answer);
    const data = res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const createRanking = async (ranking: any, token: any) => {
  try {
    const res = await instance.post("rankings/", ranking, {
      headers: { Authorization: "Bearer " + token },
    });
    const data = res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
