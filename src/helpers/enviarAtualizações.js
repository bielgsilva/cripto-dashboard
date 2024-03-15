import btc from '../lib/btc';
import ToastSucess from './ToastSucess'
import ToastError from './ToastError'

export const enviarAtualizações = async (email) => {

  console.log(email);

  try {
    if (!email) {
      ToastError("Preencha todos os campos");
      return;
    }
    const teste = await btc.post("/check-email", { email });

    if (teste.data.canRegister === false) {
      return ToastError("Email já registrado");
    }

    const response = await btc.get(`/new-user?email=${email}`);
    console.log(response);
    ToastSucess("Dados de rastreios enviados com sucesso");

  } catch (error) {
    console.error(error);
    ToastError("Erro ao enviar atualizações");

  }
};

