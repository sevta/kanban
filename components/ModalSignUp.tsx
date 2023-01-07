import {
  Box,
  Button,
  Divider,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { Enum, ModalBaseProps } from "types";
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
  onSuccessSignUp,
}: { onSignIn?: () => void; onSuccessSignUp?: () => void } & ModalBaseProps) {
  const [_, setValue] = useLocalStorage({
    key: Enum.KanbanAuth,
    defaultValue: {
      email: "",
      auth_token: "",
    },
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const resp = await axios.post(apiUrl + "signup", {
        ...values,
      });
      if (resp?.statusText === "Created") {
        setValue({
          email: form.values.email,
          auth_token: resp?.data?.auth_token,
        });
      }
      showNotification({ message: resp?.data.message });
      onSuccessSignUp?.();
    } catch (error: any) {
      showNotification({ color: "red", message: error?.message || "error" });
    } finally {
      setLoading(false);
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
          <Button type="submit" loading={loading}>
            Sign Up
          </Button>
          <Divider label="or" labelPosition="center" />
          <Button variant="light" onClick={() => onSignIn?.()}>
            Sign In
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
