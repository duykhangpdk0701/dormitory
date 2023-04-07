import React, { ReactNode, FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import banner1 from "@/assets/banner/banner1.jpg";
import { Container, Grid } from "@mui/material";

interface IHome {
  activity: ReactNode;
  announcement: ReactNode;
  enroll: ReactNode;
}

const Home: FC<IHome> = (props) => {
  const { activity, announcement, enroll } = props;
  return (
    <div>
      <div className="h-[700px]">
        <LazyLoadImage
          src={banner1.src}
          className="object-bottom object-none h-full w-full"
        />
      </div>

      <Container>
        <Grid container className="py-12" spacing={3}>
          <Grid item lg={9} md={9} xs={12}>
            {activity}
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            {announcement}
          </Grid>
        </Grid>

        {enroll}
      </Container>
    </div>
  );
};

export default Home;
