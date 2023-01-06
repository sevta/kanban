import {
  Badge,
  Button,
  MantineColor,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";

import { IconCirclePlus } from "@tabler/icons";
import KanbanCardItem, { KanbanCardItemProps } from "./KanbanCardItem";

interface KanbanCardProps {
  onCreateTask?: () => void;
  color?: MantineColor;
  items?: KanbanCardItemProps[];
}

export default function KanbanCard({
  onCreateTask,
  color = "cyan",
  items,
}: KanbanCardProps) {
  const theme = useMantineTheme();
  return (
    <Paper
      p="sm"
      radius="sm"
      withBorder
      sx={{
        background:
          theme.colorScheme === "light"
            ? theme.fn.lighten(theme.colors[color][0], 0.7)
            : "transparent",
        border: `solid 1.5px ${
          theme.colorScheme === "light"
            ? theme.colors[color][2]
            : theme.fn.darken(theme.colors[color][5], 0.6)
        }`,
        cursor: "pointer",
        transition: "all .15s ease",
        "&:hover": {
          border: `solid 1.5px ${theme.colors[color][4]}`,
        },
      }}
    >
      <Badge radius="sm" variant="outline" color={color}>
        Group Task 1
      </Badge>
      <Text size="sm" fw={600} mt="sm">
        January - March
      </Text>
      {items ? (
        items?.map((item, index) => <KanbanCardItem key={index} {...item} />)
      ) : (
        <Paper p="sm" withBorder radius="sm" mt="sm">
          <Text size="sm" weight={600}>
            No Task
          </Text>
        </Paper>
      )}

      <Button
        compact
        variant="subtle"
        color="dark"
        mt="sm"
        leftIcon={<IconCirclePlus size={21} />}
        onClick={() => onCreateTask?.()}
      >
        New Task
      </Button>
    </Paper>
  );
}
