import Label from "../Label";
import BookingStatus from "@/enum/BookingStatus";

const getStatusLabel = (cryptoOrderStatus?: BookingStatus): JSX.Element => {
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

    Denied: {
      text: "Bị từ chối",
      color: "error",
    },

    Accepted: {
      text: "Đã duyệt",
      color: "success",
    },

    Pending: {
      text: "Đang chờ xác nhận",
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

    Working: {
      text: "Đang làm việc",
      color: "warning",
    },
    Done: {
      text: "Đã hoàn thành",
      color: "success",
    },
  };

  const { text, color }: any = cryptoOrderStatus
    ? map[cryptoOrderStatus]
    : map["Pending"];

  return <Label color={color}>{text}</Label>;
};

export default getStatusLabel;
