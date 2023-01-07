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

export default function ModalSignin({ onCancel, onSubmit }: ModalBaseProps) {
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
        <Button variant="light">Sign up</Button>
      </Stack>
    </Box>
  );
}
