import axios from "axios";
import { useState } from "react";

export const useTemperature = () => {

    const [DataList, setDataList] = useState(null)

  const getTemperatures = async (data) => {

    try {
        const resutl = await axios.get("/api/temperature");
        setDataList(resutl.data)
    } catch (error) {
        
    }
  };
  const postCreateTemperature = async (data) => {
    //fetch("/api/temperature",)
    return axios.post("/api/temperature", data);
  };

  return {
    postCreateTemperature,
    getTemperatures,
    DataList
  };
};
