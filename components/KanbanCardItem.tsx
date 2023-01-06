import {
  ActionIcon,
  Divider,
  Flex,
  Grid,
  Menu,
  Paper,
  Progress,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconDots,
  IconEdit,
  IconTrash,
} from "@tabler/icons";

export interface KanbanCardItemProps {
  name: string;
  done: boolean;
  progress: number;

  onMoveRight?: () => void;
  onMoveLeft?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function KanbanCardItem({
  name,
  done,
  progress,
  onMoveLeft,
  onMoveRight,
  onEdit,
  onDelete,
}: KanbanCardItemProps) {
  const theme = useMantineTheme();

  return (
    <Paper radius="sm" withBorder p="sm" mt="xs">
      <Text size="sm" weight={700}>
        {name}
      </Text>
      <Divider my="sm" variant="dashed" />
      <Grid justify="center" align="center" gutter={0}>
        <Grid.Col xs={8}>
          <Progress
            color={progress === 100 ? "teal" : "cyan.8"}
            radius="lg"
            size="xl"
            value={progress}
          />
        </Grid.Col>
        <Grid.Col xs={2}>
          <Flex justify="flex-end" w="100%">
            {done ? (
              <ActionIcon radius="xl" color="teal" variant="filled" size="xs">
                <IconCheck size={14} />
              </ActionIcon>
            ) : (
              <Text size="xs" weight={600}>
                {progress}%
              </Text>
            )}
          </Flex>
        </Grid.Col>
        <Grid.Col xs={2}>
          <Flex justify="flex-end">
            <Menu
              shadow="xs"
              width={200}
              radius="md"
              position="bottom-end"
              transition="pop"
              styles={{
                itemLabel: {
                  fontWeight: 600,
                  fontSize: 13,
                },
                item: {
                  "&:hover": {
                    backgroundColor: "transparent",

                    color: theme.colors["cyan"][7],
                  },
                },
              }}
            >
              <Menu.Target>
                <ActionIcon radius="xl" size="xs">
                  <IconDots size={20} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconArrowRight size={14} />}
                  onClick={() => onMoveRight?.()}
                >
                  Move Right
                </Menu.Item>
                <Menu.Item
                  icon={<IconArrowLeft size={14} />}
                  onClick={() => onMoveLeft?.()}
                >
                  Move Left
                </Menu.Item>
                <Menu.Item
                  icon={<IconEdit size={14} />}
                  onClick={() => onEdit?.()}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  sx={{
                    "&:hover": {
                      color: "red",
                    },
                  }}
                  icon={<IconTrash size={14} />}
                  onClick={() => onDelete?.()}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
