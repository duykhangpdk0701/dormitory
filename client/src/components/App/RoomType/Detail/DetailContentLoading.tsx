import { Card, CardHeader, Divider, Grid, Skeleton } from "@mui/material";

const RoomTypeDetailContentLoading = () => {
  return (
    <Card>
      <CardHeader title={<Skeleton animation="wave" width={200} />} />
      <Divider />
      <div className="p-10">
        <Grid container rowSpacing={3}>
          <Grid item xs={12} md={6}>
            <div className="mb-4 flex">
              <Skeleton animation="wave" height={30} width={200} />
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <Skeleton animation="wave" height={30} width={200} />
            </div>
          </Grid>

          <Grid item xs={12}>
            <Grid container className="mb-4" spacing={3}>
              {Array(4).fill(
                <Grid item xs={6} lg={3} md={4}>
                  <div className="w-full h-[200px]">
                    <Skeleton animation="wave" className="w-full h-full" />
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div className="mb-4">
              <Skeleton animation="wave" height={30} width={200} />
              <Skeleton animation="wave" height={30} width={400} />
              <Skeleton animation="wave" height={30} width={600} />
              <Skeleton animation="wave" height={30} width={100} />
              <Skeleton animation="wave" height={30} width={1000} />
            </div>
          </Grid>

          <Grid item xs={12}>
            <Skeleton variant="rounded" className="w-full" height={48} />
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default RoomTypeDetailContentLoading;
