import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, Modal, TextField, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Header from "../../components/Header";

const Criptos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);
  const [newRowData, setNewRowData] = useState({
    id: "",
    criptomoeda: "",
    quantidade: "",
    custoMedio: "",
    plataforma: "",
    valor: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("criptosData");
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      setData([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("criptosData", JSON.stringify(data));
  }, [data]);

  const currencyFormatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "USD",
  });

  const handleAddRow = () => {
    const id = data.length === 0 ? 1 : data[data.length - 1].id + 1;
    const quantidade = parseFloat(newRowData.quantidade.replace(",", "."));
    const custoMedio = parseFloat(newRowData.custoMedio.replace(",", "."));
    const valor = quantidade * custoMedio;
    const updatedData = [...data, { ...newRowData, id, valor }];
    setData(updatedData);
    setNewRowData({
      id: "",
      criptomoeda: "",
      quantidade: "",
      custoMedio: "",
      plataforma: "",
      valor: "",
    });
    setOpenModal(false);
  };

  const handleDeleteRow = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData.map((item, index) => ({ ...item, id: index + 1 })));
  };

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
      field: "quantidade",
      headerName: "Quantidade",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "custoMedio",
      headerName: "Cotação",
      type: "number",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) =>
        currencyFormatter.format(params.value),
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
      valueFormatter: (params) =>
        currencyFormatter.format(params.value),
    },
    {
      field: "acao",
      headerName: "Ações",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteRow(params.row.id)}>
          <CloseOutlinedIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Portfólio de Criptomoedas" />
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Adicionar Linha
        </Button>
      </Box>
      <Box
        m="0 0 0 0"
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
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <TextField
            label="Criptomoeda"
            value={newRowData.criptomoeda}
            onChange={(e) =>
              setNewRowData({ ...newRowData, criptomoeda: e.target.value })
            }
          />
          <TextField
            label="Quantidade"
            value={newRowData.quantidade}
            onChange={(e) =>
              setNewRowData({ ...newRowData, quantidade: e.target.value })
            }
          />
          <TextField
            label="Cotação"
            value={newRowData.custoMedio}
            onChange={(e) =>
              setNewRowData({ ...newRowData, custoMedio: e.target.value })
            }
          />
          <TextField
            label="Plataforma"
            value={newRowData.plataforma}
            onChange={(e) =>
              setNewRowData({ ...newRowData, plataforma: e.target.value })
            }
          />
          <Button variant="contained" onClick={handleAddRow}>
            Adicionar
          </Button>
        </Box>
      </Modal>
    </Box >
  );
};

export default Criptos;
