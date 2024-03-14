import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";

import Header from "../../components/Header";

const Criptos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "criptomoeda",
      headerName: "Criptomoeda",
      cellClassName: "name-column--cell",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sigla",
      headerName: "Sigla",
      type: "text",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "quantidade",
      headerName: "Quantidade",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "custoMedio",
      headerName: "Custo Médio",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => currencyFormatter.format(params.value),

    },
    {
      field: "plataforma",
      headerName: "Plataforma",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "valor",
      headerName: "Valor Total",
      width: 150,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => currencyFormatter.format(params.value),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Portfólio de Criptomoedas" />
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Criptos;
