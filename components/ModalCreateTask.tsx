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
import { ModalBaseProps } from "types";

export default function ModalCreateTask({
  onCancel,
  onSubmit,
}: ModalBaseProps) {
  const theme = useMantineTheme();

  return (
    <Box>
      <Stack>
        <TextInput placeholder="Type your task" label="Task Name" />
        <Flex w="40%">
          <NumberInput max={100} placeholder="70%" label="Progress" />
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
        <Button onClick={() => onSubmit?.()}>Save Task</Button>
      </Group>
    </Box>
  );
}
