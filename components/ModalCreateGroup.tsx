import {
  Box,
  Button,
  Group,
  Stack,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { ModalBaseProps } from "types";

export default function ModalCreateGroup({
  onCancel,
  onSubmit,
}: ModalBaseProps) {
  const theme = useMantineTheme();

  return (
    <Box>
      <Stack>
        <TextInput placeholder="Placeholder" label="Title" />
        <Textarea placeholder="Placeholder" label="Description" />
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
        <Button onClick={() => onSubmit?.()}>Submit</Button>
      </Group>
    </Box>
  );
}
