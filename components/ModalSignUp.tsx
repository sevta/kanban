import {
  Box,
  Button,
  Divider,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import axios from "axios";
import { ModalBaseProps } from "types";
import { apiUrl } from "utils";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
});

type SignUpType = z.infer<typeof schema>;

export default function ModalSignUp({
  onSignIn,
}: { onSignIn?: () => void } & ModalBaseProps) {
  const form = useForm<SignUpType>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: zodResolver(schema),
  });

  async function handleSubmit(values: SignUpType) {
    try {
      const resp = await axios.post(apiUrl + "signup", {
        ...values,
      });
      console.log({ resp });
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
          <Button type="submit">Sign Up</Button>
          <Divider label="or" labelPosition="center" />
          <Button variant="light" onClick={() => onSignIn?.()}>
            Sign In
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
