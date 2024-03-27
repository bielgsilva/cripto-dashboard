import { useState } from "react";

export default function ValuesProvider() {


  const [btcPrice, setBtcPrice] = useState('');
  const [ethPrice, setEthPrice] = useState('');
  const [xrpPrice, setXrpPrice] = useState('');



  return ({
    btcPrice, setBtcPrice,
    ethPrice, setEthPrice,
    xrpPrice, setXrpPrice
  });
}