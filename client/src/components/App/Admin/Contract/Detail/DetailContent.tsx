import React, { FC } from "react";
import { Card, CardHeader, Divider, Grid } from "@mui/material";

import IContract from "@/interfaces/Contract";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

interface IContractDetailContent {
  data?: IContract;
}

const ContractDetailContent: FC<IContractDetailContent> = (props) => {
  const { data } = props;

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Card>
      <CardHeader title={``} />
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
              <span className="text-base">{`${data?.staff.account.lastname} ${data?.staff.account.firstname}`}</span>
            </div>
          </Grid>

          <Grid item xs={12}>
            <p className="text-base font-bold">Hợp đồng: </p>
            <iframe src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <div className="h-[900px]">
                <Viewer
                  fileUrl="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                  plugins={[defaultLayoutPluginInstance]}
                />
              </div>
            </Worker>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default ContractDetailContent;
