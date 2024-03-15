import { injectStyle } from "react-toastify/dist/inject-style";
import { toast } from "react-toastify";

const toastError = (message) => {
  injectStyle();
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}


export default toastError;
