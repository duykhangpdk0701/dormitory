import { CryptoOrderStatus } from "@/models/crypto_order";
import Label from "../Label";
import BookingStatus from "@/enum/BookingStatus";

const getStatusLabel = (cryptoOrderStatus: BookingStatus): JSX.Element => {
  const map = {
    Cancel: {
      text: "Bị từ chối",
      color: "error",
    },
    Accepted: {
      text: "Đã duyệt",
      color: "success",
    },
    Pending: {
      text: "Pending",
      color: "warning",
    },
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

export default getStatusLabel;
