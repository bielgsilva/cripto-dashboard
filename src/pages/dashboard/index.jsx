import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import { tokens } from "../../theme";
import PieChart from "../../components/PieChart";
import noDataImage from "../../assets/bear.png";
import Header from "../../components/Header";
import { bitcoin, eth, xrp } from "../../helpers/bitcoinprice";

import { Link } from "react-router-dom";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [cryptoData, setCryptoData] = useState([]);

  const [transactionCount, setTransactionCount] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [nextEvents, setNextEvents] = useState([]);


  useEffect(() => {
    // Obtém os preços das criptomoedas
    const getPrices = async () => {
      const bitcoinData = await bitcoin();
      const ethData = await eth();
      const xrpData = await xrp();

      setCryptoPrices({
        Bitcoin: bitcoinData.price,
        Ethereum: ethData.price,
        XRP: xrpData.price,
      });
    };

    getPrices();

    const savedData = localStorage.getItem("criptosData");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      const updatedTransactionCount = {};
      const updatedProfitsLosses = {};

      parsedData.forEach((transaction) => {
        const { criptomoeda, valor, tipo, quantidade } = transaction;

        // Contagem de transações
        if (!updatedTransactionCount[criptomoeda]) {
          updatedTransactionCount[criptomoeda] = 0;
        }
        if (tipo === "Compra") {
          updatedTransactionCount[criptomoeda] += parseFloat(quantidade);
        } else if (tipo === "Venda") {
          updatedTransactionCount[criptomoeda] -= parseFloat(quantidade);
        }

        // Cálculo de lucros e perdas
        if (!updatedProfitsLosses[criptomoeda]) {
          updatedProfitsLosses[criptomoeda] = 0;
        }
        updatedProfitsLosses[criptomoeda] += tipo === "Compra" ? -parseFloat(valor) : parseFloat(valor);
      });

      setTransactionCount(updatedTransactionCount);

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

  // Função para obter a cotação de uma criptomoeda específica
  const getCryptoPrice = (criptomoeda) => {
    return cryptoPrices[criptomoeda];
  };

  // Calcula o preço médio de uma criptomoeda com base nas transações
  const calculateAveragePrice = (transactions) => {
    let totalValue = 0;
    let totalQuantity = 0;

    // Loop através de todas as transações
    transactions.forEach((transaction) => {
      const { quantidade, cotacao, tipo } = transaction;
      const parsedQuantidade = parseFloat(quantidade);
      const parsedCotacao = parseFloat(cotacao);

      // Se for uma transação de compra, adiciona ao total
      if (tipo === "Compra") {
        totalValue += parsedQuantidade * parsedCotacao;
        totalQuantity += parsedQuantidade;
      } else if (tipo === "Venda") {
        // Se for uma transação de venda, subtrai do total
        totalValue -= parsedQuantidade * parsedCotacao;
        totalQuantity -= parsedQuantidade;
      }
    });

    // Calcula o preço médio
    const averagePrice = totalValue / totalQuantity;

    return isNaN(averagePrice) ? 0 : averagePrice;
  };

  // Filtrar os dados para exibir apenas as criptomoedas adicionadas
  const filteredData = Object.values(
    cryptoData.reduce((acc, transaction) => {
      if (!acc[transaction.criptomoeda]) {
        acc[transaction.criptomoeda] = transaction;
      } else {
        // Se já existe uma transação para essa criptomoeda, atualiza os valores
        acc[transaction.criptomoeda].quantidade =
          parseFloat(acc[transaction.criptomoeda].quantidade) +
          parseFloat(transaction.quantidade);
        acc[transaction.criptomoeda].valor =
          parseFloat(acc[transaction.criptomoeda].valor) +
          parseFloat(transaction.valor);
      }
      return acc;
    }, {})
  );

  // Calcula o preço médio para cada criptomoeda
  const cryptoAverages = filteredData.map((transaction) => ({
    criptomoeda: transaction.criptomoeda,
    averagePrice: calculateAveragePrice(
      cryptoData.filter(
        (t) => t.criptomoeda === transaction.criptomoeda
      )
    ),
  }));


  // Carregar eventos do localStorage quando o componente é montado
  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);

      const formattedEvents = parsedEvents.map(event => ({
        title: event.title,
        start: event.start
      }));
      setNextEvents(formattedEvents);
    }
  }, []);

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
          <img
            src={noDataImage}
            alt="No data"
            style={{ maxWidth: isMobile ? "100%" : "auto" }}
          />
          <Typography
            variant="h5"
            fontWeight="600"
            marginBottom="20px"
            color={colors.grey[100]}
            mt={2}
          >
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
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
              >
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
              <Typography
                variant="h3"
                fontWeight="600"
                marginBottom={"20px"}
                color={colors.grey[100]}>
                Meus Criptoativos
              </Typography>
              {cryptoAverages.map((cryptoAverage, index) => (
                <Grid
                  key={index}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  marginBottom="15px"
                  paddingBottom="15px"
                >
                  <Box>
                    <Typography variant="h5" fontWeight="600">
                      {cryptoAverage.criptomoeda}
                    </Typography>
                    <Typography>
                      Cotação atual: {getCryptoPrice(cryptoAverage.criptomoeda)}
                    </Typography>
                  </Box>

                  <Box textAlign={"right"}>
                    <Typography>
                      Quantidade: {transactionCount[cryptoAverage.criptomoeda]}
                    </Typography>
                    <Typography
                      color={
                        cryptoAverage.averagePrice === getCryptoPrice(cryptoAverage.criptomoeda)
                          ? colors.grey[100]
                          : cryptoAverage.averagePrice >= getCryptoPrice(cryptoAverage.criptomoeda)
                            ? colors.redAccent[500]
                            : colors.greenAccent[500]
                      }
                    >
                      Preço médio: {cryptoAverage.averagePrice.toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
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

      <Grid>
        <Box

          padding="20px"
          marginTop="20px"
        >
          <Typography
            variant="h3"
            fontWeight="600"
            marginBottom={"20px"}
            color={colors.grey[100]}
          >
            Próximos Eventos
          </Typography>
          {nextEvents.length === 0 ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
            >
              <Typography
                variant="body1"
                color={colors.grey[100]}
              >
                Nenhum evento próximo.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/calendar"

              >
                Adicione Eventos
              </Button>
            </Box>
          ) : (
            <List>
              {nextEvents.map((event, index) => (
                <ListItem key={index}>
                  <ListItemText primary={event.name} secondary={event.date} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;

