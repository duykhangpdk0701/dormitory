import Label from "../Label";
import BookingStatus from "@/enum/BookingStatus";

const getStatusLabel = (cryptoOrderStatus: BookingStatus): JSX.Element => {
  const map = {
    Active: {
      text: "Hoạt động",
      color: "success",
    },

    Unactive: {
      text: "Hoạt động",
      color: "error",
    },

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

    Deposit: {
      text: "Đã đặt cọc",
      color: "success",
    },

    Paid: {
      text: "Đã thanh toán",
      color: "info",
    },
  };

  const { text, color }: any = map[cryptoOrderStatus] || map["Pending"];

  return <Label color={color}>{text}</Label>;
};

export default getStatusLabel;
