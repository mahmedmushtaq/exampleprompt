import { Button, Card, Typography } from "@mui/material";
import AuthenticationLayout from "../src/layouts/AuthenticationLayout";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../src/hooks/AuthContext";

export default function SignIn() {
  const { registerWithGoogle } = useAuth();
  const handleOnClick = async () => {
    await registerWithGoogle();
  };

  return (
    <AuthenticationLayout heading="Registration">
      <Card>
        <Button
          startIcon={<GoogleIcon />}
          sx={{ px: 5, py: 2 }}
          onClick={handleOnClick}
        >
          Login/SignUp With Google
        </Button>
      </Card>
    </AuthenticationLayout>
  );
}
