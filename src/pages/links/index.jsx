import React from 'react';
import { Grid, Button } from '@mui/material';
import Header from "../../components/Header";

const linksData = [
  { title: 'Bitcoin Rainbow Price Chart', url: 'https://www.blockchaincenter.net/en/bitcoin-rainbow-chart/' },
  { title: 'Alt Coin Season', url: 'https://www.blockchaincenter.net/en/altcoin-season-index/' },
  { title: 'TradingView - DXY', url: 'https://br.tradingview.com/chart/2PVqqdVZ/?symbol=TVC%3ADXY' },
  { title: 'Calendário Econômico', url: 'https://br.investing.com/economic-calendar/' },
  { title: 'Tokens-WhatList', url: 'https://coinmarketcap.com/pt-br/watchlist/' },
  { title: 'Calendário Eventos Cripto', url: 'https://coinmarketcap.com/pt-br/events/' },

];

const linkButtonStyle = {
padding:"15px 30px",
backgroundColor:"#0e121f",
fontSize:"18px",
minHeight:"100px"
};

const Links = () => {
  return (
    <Grid
      container
      padding="20px"
      display={"flex"}
      flexDirection={"column"}
      gap={"30px"}
    >
      <Header title="Links úteis" />

      <Grid container spacing={5} justifyContent="center">
        {linksData.map((link, index) => (
          <Grid key={index} item xs={12} sm={6} md={3} textAlign="center">
            <div>
              <Button
                style={linkButtonStyle}
                variant="contained"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.title}
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Links;
