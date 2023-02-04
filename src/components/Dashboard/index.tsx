import {
  Alert,
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Typography,
} from "@mui/material";
import { useAuth } from "../../hooks/AuthContext";
import Link from "next/link";

const Dashboard = () => {
  const { userData } = useAuth();

  return (
    <Container maxWidth="xl">
      <Alert>
        We are in beta. Vist the prompt the prompt page
      </Alert>
    </Container>
  );
};

export default Dashboard;
