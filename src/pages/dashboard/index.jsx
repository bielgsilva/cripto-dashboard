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
  // Estado para armazenar os dados do lucro/prejuízo
  const [profitsLosses, setProfitsLosses] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("criptosData");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setCryptoData(parsedData);
      // Calcular o lucro ou prejuízo
      // Calcular o lucro ou prejuízo
      const profitsLosses = {};
      parsedData.forEach((transaction) => {
        const { criptomoeda, valor, tipo } = transaction;
        if (!profitsLosses[criptomoeda]) {
          profitsLosses[criptomoeda] = 0;
        }
        // Se for compra, é um gasto, se for venda, é um ganho
        profitsLosses[criptomoeda] += tipo === "Compra" ? -parseFloat(valor) : parseFloat(valor);
      });
      setProfitsLosses(profitsLosses);

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
          {Object.keys(profitsLosses).map((criptomoeda, index) => (
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
                >
                  {criptomoeda}
                </Typography>
              </Box>
              <Box>
                <Typography color={profitsLosses[criptomoeda] >= 0 ? colors.greenAccent[500] : colors.redAccent[500]}>
                  Lucro/Prejuízo: {profitsLosses[criptomoeda]}
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
