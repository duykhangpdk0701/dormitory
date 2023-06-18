import { Box, Typography, Container, Button } from "@mui/material";
import Link from "next/link";

import { styled } from "@mui/material/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import pageEnrollSuccess from "@/assets/images/status/enrollsuccess.svg";

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

const StatusEnrollSuccess = () => {
  return (
    <>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <LazyLoadImage
              src={pageEnrollSuccess.src}
              alt="SGU Dormitory đăng ký thành công"
              className="h-[50vh] mb-4"
            />
            <Typography className="mb-2" variant="h2">
              Đăng ký thành công!
            </Typography>
            <p className="mb-8">
              Chúng tôi sẽ sớm liên lạc với bạn thông qua email, vui lòng hãy để
              mắt tới email!
            </p>
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

export default StatusEnrollSuccess;
