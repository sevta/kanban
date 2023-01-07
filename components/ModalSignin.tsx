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
  email: z.string().min(3),
  password: z.string().min(6),
});

type SigninType = z.infer<typeof schema>;

export default function ModalSignin({
  onSuccessSignin,
  onSignUp,
}: { onSignUp?: () => void; onSuccessSignin?: () => void } & ModalBaseProps) {
  const [loading, setLoading] = useState(false);
  const [_, setValue] = useLocalStorage({
    key: Enum.KanbanAuth,
    defaultValue: {
      name: "",
      auth_token: "",
    },
  });
  const form = useForm<SigninType>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: zodResolver(schema),
  });

  async function handleSubmit(values: SigninType) {
    setLoading(true);
    try {
      const resp = await axios.post(apiUrl + "auth/login", {
        ...values,
      });
      setValue({
        name: form.values.email,
        auth_token: resp?.data?.auth_token,
      });
      showNotification({ message: resp?.data.message || "Success login" });
      onSuccessSignin?.();
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
        </Stack>
        <Stack mt="lg">
          <Button type="submit" loading={loading}>
            Sign in
          </Button>
          <Divider label="or" labelPosition="center" />
          <Button variant="light" onClick={() => onSignUp?.()}>
            Sign up
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
