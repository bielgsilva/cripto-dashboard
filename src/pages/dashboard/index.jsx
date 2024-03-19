import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Grid from "@mui/material/Unstable_Grid2";
import PieChart from "../../components/PieChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Estado para armazenar os dados das criptomoedas
  const [cryptoData, setCryptoData] = useState([]);
  // Estado para armazenar os dados do preço médio
  const [averagePrices, setAveragePrices] = useState({});
  // Estado para armazenar os valores totais de cada criptomoeda
  const [totalValues, setTotalValues] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("criptosData");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setCryptoData(parsedData);
      // Calcular o preço médio
      const prices = {};
      const totals = {};
      parsedData.forEach((transaction) => {
        const { criptomoeda, quantidade, valor, tipo } = transaction;
        const price = parseFloat(valor) / parseFloat(quantidade);
        if (!prices[criptomoeda]) {
          prices[criptomoeda] = 0;
          totals[criptomoeda] = 0;
        }
        if (tipo === "Compra") {
          prices[criptomoeda] += price;
          totals[criptomoeda] += parseFloat(valor);
        } else {
          prices[criptomoeda] -= price;
          totals[criptomoeda] -= parseFloat(valor);
        }
      });
      // Calcular o preço médio final
      Object.keys(prices).forEach((criptomoeda) => {
        prices[criptomoeda] /= 2;
      });
      setAveragePrices(prices);
      setTotalValues(totals);
    } else {
      setCryptoData([]);
    }
  }, []);

  // Filtrar os dados para exibir apenas as criptomoedas adicionadas
  const filteredData = cryptoData.filter(
    (transaction, index, self) =>
      index ===
      self.findIndex((t) => t.criptomoeda === transaction.criptomoeda)
  );

  return (
    <Grid
      container
      margin="20px"
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Box
        width="100%"
        height="500px"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="50px"
      >
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
              <PieChart data={filteredData} />
            </Box>
          </Box>
        </Grid>

        <Grid
          xs={12}
          sm={12}
          md={4}
          lg={4}
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          height="100%"
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
          {Object.keys(averagePrices).map((criptomoeda, index) => (
            <Box
              key={index}
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
                  color={
                    averagePrices[criptomoeda] >= 0
                      ? colors.greenAccent[100]
                      : colors.redAccent[500]
                  }
                >
                  {criptomoeda}
                </Typography>
                <Typography color={colors.grey[100]}>
                  Preço Médio: {averagePrices[criptomoeda]}
                </Typography>
                <Typography color={colors.grey[100]}>
                  Valor Total: {totalValues[criptomoeda]}
                </Typography>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default Dashboard;
