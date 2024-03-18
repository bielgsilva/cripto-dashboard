import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";

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
    <Box m="20px">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* Código existente para os StatBoxes */}

        <Grid xs={12} sm={12} md={8} lg={8}>
          <Box backgroundColor={colors.primary[400]}>
            {/* Código existente */}
            <Box height="450px" m="-20px 0 0 0">
              <PieChart data={cryptoData} />
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <Box
            backgroundColor={colors.primary[400]}
            maxHeight="450px"
            overflow="auto"
            m="25px 0 0 0"
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
                Recent Transactions
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
