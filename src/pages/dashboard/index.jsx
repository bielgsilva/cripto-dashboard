import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";

import Grid from "@mui/material/Unstable_Grid2";

import PieChart from "../../components/PieChart";



const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State para armazenar os dados das criptomoedas
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("criptosData");
    if (savedData) {
      setCryptoData(JSON.parse(savedData));
    } else {
      setCryptoData([]);
    }
  }, []);

  return (

    <Grid container margin='20px' rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

      <Box
        width="100%"
        height="500px"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap='50px'>

        <Grid xs={12} sm={12} md={8} lg={8}>
          <Box backgroundColor={colors.primary[400]}>
            <Box height="450px" m="-20px 0 0 0">
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Gráfico de Pizza
              </Typography>
              <PieChart data={cryptoData} />
            </Box>
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={4} lg={4}
          display='flex'
          flexDirection='column'
          justifyContent='flex-start'
          height='100%'

        >

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            color={colors.grey[100]}
            p="15px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
              Meus Criptoativos
            </Typography>
          </Box>
          {cryptoData.map((transaction, i) => {
            return (
              <Box
                key={`${transaction}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.greenAccent[100]}
                  >
                    {transaction.criptomoeda}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.precoMedio}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  color={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.valor}
                </Box>
              </Box>
            );
          })}

        </Grid>
      </Box >
    </Grid>

  );
};

export default Dashboard;
