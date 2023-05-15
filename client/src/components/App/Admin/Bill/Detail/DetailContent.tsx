import React, { FC } from "react";
import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Button,
  Tooltip,
} from "@mui/material";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import IBill from "@/interfaces/Bill";
import { LoadingButton } from "@mui/lab";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

interface IBillDetailContent {
  data?: IBill;
}

const BillDetailContent: FC<IBillDetailContent> = (props) => {
  const { data } = props;

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Card>
      <CardHeader
        title={
          <div className="flex items-center gap-3">
            <span>Hoá đơn</span>
            <Tooltip title="Đã thanh toán" arrow>
              <LoadingButton
                size="small"
                startIcon={<CreditScoreIcon fontSize="small" />}
              >
                Đã Thanh toán
              </LoadingButton>
            </Tooltip>
          </div>
        }
      />
      <Divider />
      <div className="p-10">
        <Grid container rowSpacing={3}>
          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Tên cư dân</span>:{" "}
              <span className="text-base">{`${data?.civilian.account.lastname} ${data?.civilian.account.firstname}`}</span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Tên nhan viên</span>:{" "}
              <span className="text-base">{data?.room.name}</span>
            </div>
          </Grid>

          <Grid item xs={12}></Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default BillDetailContent;
