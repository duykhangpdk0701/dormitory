import React, { FC } from "react";
import { Grid } from "@mui/material";
import ContractItem from "./Item";
import IContract from "@/interfaces/Contract";
import Link from "next/link";

interface IContractListList {
  data?: IContract[];
}

const ContractListList: FC<IContractListList> = (props) => {
  const { data } = props;
  return (
    <div>
      <Grid container spacing={6}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={item._id}>
            <Link href={`/user/contract/${item._id}`}>
              <ContractItem data={item} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ContractListList;
