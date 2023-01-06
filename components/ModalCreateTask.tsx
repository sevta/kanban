import {
  Box,
  Button,
  Flex,
  Group,
  NumberInput,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core";

interface ModalCreateTaskProps {
  onCancel?: () => void;
  onSave?: () => void;
}

export default function ModalCreateTask({
  onCancel,
  onSave,
}: ModalCreateTaskProps) {
  const theme = useMantineTheme();

  return (
    <Box>
      <Stack>
        <TextInput
          styles={{
            label: { fontSize: 12, fontWeight: 600, marginBottom: 6 },
          }}
          placeholder="Type your task"
          label="Task Name"
        />
        <Flex w="40%">
          <NumberInput
            styles={{
              label: { fontSize: 12, fontWeight: 600, marginBottom: 6 },
            }}
            max={100}
            placeholder="70%"
            label="Progress"
          />
        </Flex>
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
        <Button onClick={() => onSave?.()}>Save Task</Button>
      </Group>
    </Box>
  );
}
