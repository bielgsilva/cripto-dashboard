import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import Grid from "@mui/material/Unstable_Grid2";
import PieChart from "../../components/PieChart";
import noDataImage from "../../assets/bear.png";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [cryptoData, setCryptoData] = useState([]);
  const [profitsLosses, setProfitsLosses] = useState({});
  const [transitionCount, setTransactionCount] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("criptosData");

    if (savedData) {
      setCryptoData(JSON.parse(savedData));

      const transactionCount = {};
      const profitsLosses = {};

      cryptoData.forEach((transaction) => {
        const { criptomoeda, valor, tipo } = transaction;

        // Contagem de transações
        if (!transactionCount[criptomoeda]) {
          transactionCount[criptomoeda] = 0;
        }
        transactionCount[criptomoeda]++;

        // Cálculo de lucros e perdas
        if (!profitsLosses[criptomoeda]) {
          profitsLosses[criptomoeda] = 0;
        }
        profitsLosses[criptomoeda] += tipo === "Compra" ? -parseFloat(valor) : parseFloat(valor);
      });

      setTransactionCount(transactionCount);
      setProfitsLosses(profitsLosses);

    } else {
      setCryptoData([]);
    }
  }, [cryptoData]);


  // Filtrar os dados para exibir apenas as criptomoedas adicionadas
  const filteredData = cryptoData.filter(
    (transaction, index, self) =>
      index ===
      self.findIndex((t) => t.criptomoeda === transaction.criptomoeda)
  );

  return (
    <Grid
      container
      height="100vh"
      padding="20px"
      display="flex"
      justifyContent="center"
      alignItems="center"

    >
      <Box
        width="100%"
        height="auto"
        padding="35px"
        display="flex"
        justifyContent="center"
        gap="50px"
      >
        {cryptoData.length === 0 ? (
          <Box textAlign="center">
            <img src={noDataImage} alt="No data" />
            <Typography variant="h5" fontWeight="600" marginBottom="20px" color={colors.grey[100]} mt={2}>
              Nenhum dado disponível.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              mt={2}
              component={Link}

              to="/criptos">
              Adicione criptomoedas
            </Button>
          </Box>
        ) : (
          <>
            <Grid xs={12} sm={12} md={8} lg={8}>
              <Box backgroundColor={colors.primary[400]} padding="40px 
              20px">
                <Box height="450px" m="-20px 0 0 0">
                  <Typography

                    variant="h3"
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
              backgroundColor={colors.primary[400]}
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
                  variant="h3"
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
                    <Typography
                      color={
                        transitionCount[criptomoeda] === 1
                          ? colors.grey[100]
                          : profitsLosses[criptomoeda] >= 0
                            ? colors.greenAccent[500]
                            : colors.redAccent[500]
                      }
                    >
                      {
                        transitionCount[criptomoeda] === 1
                          ? `Valor: ${Math.abs(profitsLosses[criptomoeda]).toFixed(2)}`
                          : `Lucro/Prejuízo: ${profitsLosses[criptomoeda].toFixed(2)}`
                      }

                    </Typography>
                  </Box>
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                mt={2}
                component={Link}
                to="/criptos">
                Adicione criptomoedas
              </Button>



            </Grid>
          </>
        )}
      </Box>
    </Grid>
  );
};

export default Dashboard;
