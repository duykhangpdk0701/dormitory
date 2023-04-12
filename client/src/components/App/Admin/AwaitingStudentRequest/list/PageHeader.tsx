import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import avatarImg from "@/asset/images/avatars/1.jpg";

function PageHeader() {
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Danh sách sinh viên đợi duyệt
        </Typography>
        <Typography variant="subtitle2">
          Đây là danh sách sinh viên đã đăng ký và chưa được duyệt
        </Typography>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}

export default PageHeader;
