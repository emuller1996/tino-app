import axios from "axios";
import { useState } from "react";

export const useTemperature = () => {
  const [DataList, setDataList] = useState(null);

  const getTemperatures = async (data) => {
    try {
      setDataList(null);
      const resutl = await axios.get("/api/temperature");
      setDataList(resutl.data);
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const postCreateTemperature = async (data) => {
    //fetch("/api/temperature",)
    return axios.post("/api/temperature", data);
  };

  const deleteDeleteTemperature = async (id) => {
    //fetch("/api/temperature",)
    return axios.delete(`/api/temperature/${id}`);
  };

  return {
    postCreateTemperature,
    getTemperatures,
    DataList,
    deleteDeleteTemperature,
  };
};
