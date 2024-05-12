import { Container } from "@mui/material";

const NotFound = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p> ... or you don't have access to it.</p>
    </Container>
  );
};

export default NotFound;
