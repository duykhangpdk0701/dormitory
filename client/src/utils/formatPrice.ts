const priceFormat = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price * 1000);
};

export default priceFormat;
