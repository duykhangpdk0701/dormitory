import { Typography, Avatar, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";

function PageHeader() {
  const theme = useTheme();

  const user = useMemo(() => {
    return {
      name:
        typeof window !== "undefined"
          ? sessionStorage.getItem("username")
          : null,
      avatar:
        typeof window !== "undefined" ? sessionStorage.getItem("avatar") : null,

      jobtitle:
        typeof window !== "undefined" ? sessionStorage.getItem("role") : null,
    };
  }, []);

  return (
    <Grid container alignItems="center">
      <Grid item>
        {user.avatar ? (
          <Avatar
            sx={{
              mr: 2,
              width: theme.spacing(8),
              height: theme.spacing(8),
            }}
            variant="rounded"
            alt={user.name || ""}
            src={process.env.NEXT_PUBLIC_SERVER_URL + user.avatar}
          />
        ) : (
          <Avatar
            sx={{
              mr: 2,
              width: theme.spacing(8),
              height: theme.spacing(8),
            }}
            variant="rounded"
          />
        )}
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Xin Chào, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          Chúc bạn một ngày làm việc hiệu quả!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
