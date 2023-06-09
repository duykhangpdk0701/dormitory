import { Box, Container, Link, Typography, styled } from "@mui/material";

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: "block", md: "flex" }}
        alignItems="center"
        textAlign={{ xs: "center", md: "left" }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">&copy; Đại Học Sài Gòn</Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 },
          }}
          variant="subtitle1"
        >
          Xây dựng bởi{" "}
          <Link
            href="https://github.com/duykhangpdk0701/dormitory"
            target="_blank"
            rel="noopener noreferrer"
          >
            Khang, Hiền
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
