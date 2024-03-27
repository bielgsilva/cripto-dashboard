import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button, Grid } from "@mui/material";
import { tokens } from "../../theme";
import PieChart from "../../components/PieChart";
import noDataImage from "../../assets/bear.png";
import Header from "../../components/Header";

import { Link } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [cryptoData, setCryptoData] = useState([]);
  const [profitsLosses, setProfitsLosses] = useState({});
  const [transactionCount, setTransactionCount] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("criptosData");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      const updatedTransactionCount = {};
      const updatedProfitsLosses = {};

      parsedData.forEach((transaction) => {
        const { criptomoeda, valor, tipo } = transaction;

        // Contagem de transações
        if (!updatedTransactionCount[criptomoeda]) {
          updatedTransactionCount[criptomoeda] = 0;
        }
        updatedTransactionCount[criptomoeda]++;

        // Cálculo de lucros e perdas
        if (!updatedProfitsLosses[criptomoeda]) {
          updatedProfitsLosses[criptomoeda] = 0;
        }
        updatedProfitsLosses[criptomoeda] += tipo === "Compra" ? -parseFloat(valor) : parseFloat(valor);
      });

      setTransactionCount(updatedTransactionCount);
      setProfitsLosses(updatedProfitsLosses);
      setCryptoData(parsedData);

    } else {
      setCryptoData([]);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= theme.breakpoints.values.sm);
    };

    handleResize(); // Verifica no carregamento da página

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [theme.breakpoints.values.sm]);

  // Filtrar os dados para exibir apenas as criptomoedas adicionadas
  const filteredData = cryptoData.filter(
    (transaction, index, self) =>
      index ===
      self.findIndex((t) => t.criptomoeda === transaction.criptomoeda)
  );

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      padding={"20px"}
    >
      <Header title="Dashboard" />

      {cryptoData.length === 0 ? (
        <Box textAlign="center">
          <img src={noDataImage} alt="No data" style={{ maxWidth: isMobile ? "100%" : "auto" }} />
          <Typography variant="h5" fontWeight="600" marginBottom="20px" color={colors.grey[100]} mt={2}>
            Nenhum dado disponível.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            mt={2}
            component={Link}
            to="/criptos"
          >
            Adicione criptomoedas
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>

          <Grid item xs={12} md={8} lg={8}>
            <Box
              backgroundColor={colors.primary[400]}
              padding="20px"
            >
              <Typography variant="h3" fontWeight="600" color={colors.grey[100]}>
                Gráfico de Pizza
              </Typography>
              <Box height={450}>
                <PieChart data={filteredData} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Box
              height="100%"
              backgroundColor={colors.primary[400]}
              padding="20px"
            >
              <Typography variant="h3" fontWeight="600" color={colors.grey[100]} marginBottom="15px">
                Meus Criptoativos
              </Typography>
              {Object.keys(profitsLosses).map((criptomoeda, index) => (
                <Box
                  key={index}
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  marginBottom="15px"
                  paddingBottom="15px"
                >
                  <Typography variant="h5" fontWeight="600">
                    {criptomoeda}
                  </Typography>
                  <Typography
                    color={
                      transactionCount[criptomoeda] === 1
                        ? colors.grey[100]
                        : profitsLosses[criptomoeda] >= 0
                          ? colors.greenAccent[500]
                          : colors.redAccent[500]
                    }
                  >
                    {
                      transactionCount[criptomoeda] === 1
                        ? `Valor: ${Math.abs(profitsLosses[criptomoeda]).toFixed(2)}`
                        : `Lucro/Prejuízo: ${profitsLosses[criptomoeda].toFixed(2)}`
                    }
                  </Typography>
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/criptos"
              >
                Adicione criptomoedas
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
