import { CryptoOrderStatus } from "@/models/crypto_order";
import Label from "../Label";

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    failed: {
      text: "Failed",
      color: "error",
    },
    completed: {
      text: "Đã duyệt",
      color: "success",
    },
    pending: {
      text: "Pending",
      color: "warning",
    },
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

export default getStatusLabel;
