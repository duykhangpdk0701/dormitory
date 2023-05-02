import { Box, Typography, Container, Button } from "@mui/material";
import Link from "next/link";

import { styled } from "@mui/material/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import page404 from "@/assets/images/status/404.svg";

const MainContent = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const Status404 = () => {
  return (
    <>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <LazyLoadImage
              src={page404.src}
              alt="SGU Dormitory không tìm thấy trang"
            />
            <Typography variant="h2" sx={{ my: 2 }}>
              Trang web bạn tìm không tìm không tại
            </Typography>
          </Box>
        </Container>
        <div>
          <Button LinkComponent={Link} href="/" variant="outlined">
            Quay lại trang chủ
          </Button>
        </div>
      </MainContent>
    </>
  );
};

export default Status404;
