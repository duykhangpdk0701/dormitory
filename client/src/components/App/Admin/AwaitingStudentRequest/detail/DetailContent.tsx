import IBookingRequest from "@/interfaces/BookingRequest";
import { Card, CardHeader, Divider, Grid } from "@mui/material";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface IAwaitingStudentDetailContent {
  data?: IBookingRequest;
}

const AwaitingStudentDetailContent: FC<IAwaitingStudentDetailContent> = (
  props
) => {
  const { data } = props;
  return (
    <Card>
      <CardHeader
        title={`${data?.lastname} ${data?.firstname} - ${data?.studentId}`}
      />
      <Divider />
      <div className="p-10">
        <Grid container rowSpacing={3}>
          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Họ và tên</span>:{" "}
              <span className="text-base">{`${data?.lastname} ${data?.firstname}`}</span>
            </div>
            <div className="mb-4">
              <span className="text-base font-bold">Mã số sinh viên</span>:{" "}
              <span className="text-base">{data?.studentId}</span>
            </div>
            <div className="mb-4">
              <span className="text-base font-bold">Ưu tiên</span>:{" "}
              <span className="text-base">{data?.priority.name}</span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Địa chỉ Email</span>:{" "}
              <span className="text-base">{data?.email}</span>
            </div>
            <div className="mb-4">
              <span className="text-base font-bold">Giới tính</span>:{" "}
              <span className="text-base">{data?.gender}</span>
            </div>
          </Grid>
          <span className="text-base font-bold">Hình ảnh chứng thực:</span>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              {data?.images.map((item, index) => (
                <Grid item xs={3} key={index}>
                  <LazyLoadImage
                    className="w-full object-cover"
                    src={process.env.NEXT_PUBLIC_SERVER_URL + item}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default AwaitingStudentDetailContent;
