import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import { axiosWithAuth } from '../utils/axiosWithAuth.js';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth().get('/api/colors')
      .then((response) => {
        console.log("This is response from axiosWithAuth in BubblePage:", response)
        setColorList(response.data)
      })
      .catch((error) => {
        console.log("This is an error from axiosWithAuth get request:", error.message)
      })
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
