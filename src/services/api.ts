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
      throw error.message;
    } else {
      console.log("unexpected error: ", error);
      throw "An unexpected error occurred";
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
      throw error.message;
    } else {
      console.log("unexpected error: ", error);
      throw "An unexpected error occurred";
    }
  }
};

export const fetchRankings = async (
  page: number,
  pageSize: number,
  token: string
) => {
  try {
    const res = await instance.get("rankings/", {
      params: { page: page, limit: pageSize },
      headers: { Authorization: "Bearer " + token },
    });
    const data = res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw error.message;
    } else {
      console.log("unexpected error: ", error);
      throw "An unexpected error occurred";
    }
  }
};

export const fetchRanking = async (id: string, token: string) => {
  try {
    const res = await instance.get(`rankings/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    const data = res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw error.message;
    } else {
      console.log("unexpected error: ", error);
      throw "An unexpected error occurred";
    }
  }
};

export const createRanking = async (ranking: any, token: string) => {
  try {
    const res = await instance.post("rankings/", ranking, {
      headers: { Authorization: "Bearer " + token },
    });
    const data = res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw error.message;
    } else {
      console.log("unexpected error: ", error);
      throw "An unexpected error occurred";
    }
  }
};

export const updateRanking = async (
  id: string,
  ranking: any,
  token: string
) => {
  try {
    const res = await instance.patch(`rankings/${id}`, ranking, {
      headers: { Authorization: "Bearer " + token },
    });
    const data = res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw error.message;
    } else {
      console.log("unexpected error: ", error);
      throw "An unexpected error occurred";
    }
  }
};
