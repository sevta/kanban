import {
  Box,
  Button,
  Divider,
  PasswordInput,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { ModalBaseProps } from "types";

export default function ModalSignin({
  onCancel,
  onSubmit,
  onSignUp,
}: { onSignUp?: () => void } & ModalBaseProps) {
  const theme = useMantineTheme();

  return (
    <Box>
      <Stack>
        <TextInput placeholder="Name" label="Password" />
        <PasswordInput placeholder="Password" label="Password" />
      </Stack>
      <Stack mt="lg">
        <Button onClick={() => onSubmit?.()}>Sign in</Button>
        <Divider label="or" labelPosition="center" />
        <Button variant="light" onClick={() => onSignUp?.()}>
          Sign up
        </Button>
      </Stack>
    </Box>
  );
}
