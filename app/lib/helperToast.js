import { toast } from "react-toastify";

export const helperToast = {
  success: (content, opts) => {
    toast.dismiss();
    toast.success(content, opts);
  },
  error: (content, opts) => {
    toast.dismiss();
    toast.error(content, opts);
  },
};
