import React, { FC } from "react";
import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Tooltip,
  useTheme,
  Button,
} from "@mui/material";
import ITask from "@/interfaces/Task";
import moment from "moment";
import IBill from "@/interfaces/Bill";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { useAppDispatch } from "@/hooks/redux";
import { useMutation, useQuery } from "react-query";
import adminBillAPI from "@/api/admin/bill";
import billAPI from "@/api/bill";
import Link from "next/link";

interface IUserBillDetailContent {
  data?: IBill;
}

const UserBillDetailContent: FC<IUserBillDetailContent> = (props) => {
  const { data } = props;
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handlePaid = () => {
    if (data?._id) {
      payBillQuery.mutate(data._id);
    }
  };

  const payBillQuery = useMutation({
    mutationKey: ["bill"],
    mutationFn: (id: string) => billAPI.payWithPaypal(id),
  });

  return (
    <Card>
      <CardHeader
        title={
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span>Hoá đơn</span>

              {!data?.paid && (
                <Tooltip title="Thanh toán" arrow>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<CreditScoreIcon fontSize="small" />}
                    onClick={handlePaid}
                    LinkComponent={Link}
                    target="_blank"
                    href={
                      process.env.NEXT_PUBLIC_SERVER_URL +
                      `/bill/${data?._id}/paid/paypal`
                    }
                  >
                    Thanh toán
                  </Button>
                </Tooltip>
              )}
            </div>

            <div>{data?.paid ? "Đã thanh toán" : "Chưa thanh toán"}</div>
          </div>
        }
      />
      <Divider />
      <div className="p-10">
        <Grid container rowSpacing={3}>
          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Tên Cư dân</span>:{" "}
              <span className="text-base">
                {data?.civilian.account.lastname}{" "}
                {data?.civilian.account.firstname}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-base font-bold">Ngày đăng ký</span>:{" "}
              <span className="text-base">
                {moment(data?.createdAt).format("DD/MM/YYYY")}
              </span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Phòng</span>:{" "}
              <span className="text-base">{data?.room.name}</span>
            </div>

            <div className="mb-4">
              <span className="text-base font-bold">Giá</span>:{" "}
              <span className="text-base">{data?.room.price}</span>
            </div>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default UserBillDetailContent;
