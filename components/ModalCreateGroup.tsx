import {
  Box,
  Button,
  Group,
  Stack,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { ModalBaseProps } from "types";
import { apiUrl, postWithBearerToken } from "utils";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(4),
  description: z.string().min(4),
});

type GroupType = z.infer<typeof schema>;

export default function ModalCreateGroup({
  onCancel,
  onSuccess,
}: ModalBaseProps) {
  const theme = useMantineTheme();

  const [loading, setLoading] = useState(false);
  const [value] = useLocalStorage({
    key: "kanban-auth",
    serialize: JSON.stringify,
  });
  const form = useForm<GroupType>({
    initialValues: {
      title: "",
      description: "",
    },

    validate: zodResolver(schema),
  });

  async function handleSubmit(values: GroupType) {
    setLoading(true);

    try {
      await postWithBearerToken({
        token: value.auth_token,
        api: apiUrl + "todos",
        values,
      });
      showNotification({ message: `Success create ${values.title}` });
      onSuccess?.();
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
            placeholder="Placeholder"
            label="Title"
            {...form.getInputProps("title")}
          />
          <Textarea
            placeholder="Placeholder"
            label="Description"
            {...form.getInputProps("description")}
          />
        </Stack>
        <Group mt="lg" spacing="sm" position="right">
          <Button
            variant="light"
            onClick={() => onCancel?.()}
            color="gray"
            bg="transparent"
            sx={{
              border: `1px solid ${theme.fn.lighten(
                theme.colors["gray"][5],
                0.7
              )}`,
            }}
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
