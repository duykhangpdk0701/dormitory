import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import Link from "next/link";

function PageHeader() {
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Danh sách loại phòng
        </Typography>
        <Typography variant="subtitle2">
          Đây là danh sách loại phòng nơi sinh viên cư trú
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          LinkComponent={Link}
          href="/admin/room-type/add"
        >
          Tạo phòng mới
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
