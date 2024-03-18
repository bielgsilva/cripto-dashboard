import { useState } from "react";

export default function ValuesProvider() {

  const [invoices, setInvoices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newRowData, setNewRowData] = useState({
    id: "",
    criptomoeda: "",
    quantidade: "",
    cotacao: "",
    precoMedio: "",
    valor: "",
  });
  const [data, setData] = useState([]);



  return ({
    invoices, setInvoices,
    newRowData, setNewRowData,
    openModal, setOpenModal,
    data, setData
  });
}