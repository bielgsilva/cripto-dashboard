import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { bitcoin, eth, xrp } from '../../helpers/bitcoinprice';
import Header from "../../components/Header";
import { format } from 'date-fns';

const paperStyle = {
  padding: '20px',
  textAlign: 'center',
  color: 'black',
  backgroundColor: '#de8419',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)',
  border: '2px solid #000', // Definindo uma borda preta de 2px

};

const Mercado = () => {
  const [prices, setPrices] = useState([]);
  const [attData, setAttData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const btc = await bitcoin();
      const ethData = await eth();
      const xrpData = await xrp();

      setAttData(format(new Date(btc.date), "HH:mm 'de' dd/MM/yyyy"));

      setPrices([btc, ethData, xrpData]);
    };

    fetchData();
  }, []);

  return (
    <Grid
      container
      padding="20px"
      display={"flex"}
      flexDirection={"column"}
      gap={"30px"}

    >
      <Header title="Cotação de Hoje" />

      <Grid container spacing={3} justifyContent="center">
        {prices.map((crypto, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} style={paperStyle}>
              <Typography variant="h3" gutterBottom>
                {crypto.name}
              </Typography>
              <Typography variant="h2">${crypto.price}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h3" gutterBottom alignSelf="center" textAlign={"center"} >
        Última atualização: <br />
        <Typography variant="h2" gutterBottom alignSelf="center" textAlign={"center"}>
          {attData}
        </Typography>
      </Typography>
    </Grid>
  );
};

export default Mercado;
