import axios from "axios";
import { useState } from "react";

export const useNap = () => {
  const [DataList, setDataList] = useState(null);

  const getNap = async (data) => {
    try {
      setDataList(null);
      const resutl = await axios.get("/api/nap");
      setDataList(resutl.data);
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const postCreateNap = async (data) => {
    return axios.post("/api/nap", data);
  };

  const patchUpdateNap = async (data,id) => {
    return axios.patch(`/api/nap/${id}`, data);
  };

  const deleteDeleteNap = async (id) => {
    return axios.delete(`/api/nap/${id}`);
  };

  return {
    postCreateNap,
    getNap,
    DataList,
    deleteDeleteNap,
    patchUpdateNap
  };
};
