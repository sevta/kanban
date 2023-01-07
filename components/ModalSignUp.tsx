import {
  Box,
  Button,
  Divider,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ModalBaseProps } from "types";

type SignUpForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function ModalSignUp({
  onCancel,
  onSubmit,
  onSignIn,
}: { onSignIn?: () => void } & ModalBaseProps) {
  const form = useForm<SignUpForm>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  return (
    <Box>
      <Stack>
        <TextInput
          placeholder="Name"
          label="Name"
          {...form.getInputProps("name")}
        />
        <TextInput
          placeholder="Email"
          label="Email"
          type="email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          {...form.getInputProps("password_confirmation")}
        />
      </Stack>
      <Stack mt="lg">
        <Button onClick={() => onSubmit?.()}>Sign Up</Button>
        <Divider label="or" labelPosition="center" />
        <Button variant="light" onClick={() => onSignIn?.()}>
          Sign In
        </Button>
      </Stack>
    </Box>
  );
}
