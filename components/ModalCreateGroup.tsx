import {
  Box,
  Button,
  Group,
  Stack,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";

interface ModalCreateGroupProps {
  onCancel?: () => void;
  onSave?: () => void;
}

export default function ModalCreateGroup({
  onCancel,
  onSave,
}: ModalCreateGroupProps) {
  const theme = useMantineTheme();

  return (
    <Box>
      <Stack>
        <TextInput
          styles={{
            label: { fontSize: 12, fontWeight: 600, marginBottom: 6 },
          }}
          placeholder="Placeholder"
          label="Title"
        />
        <Textarea
          styles={{
            label: { fontSize: 12, fontWeight: 600, marginBottom: 6 },
          }}
          placeholder="Placeholder"
          label="Description"
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
        <Button onClick={() => onSave?.()}>Submit</Button>
      </Group>
    </Box>
  );
}
