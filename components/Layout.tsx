import {
  AppShell,
  AppShellProps,
  Button,
  Container,
  Flex,
  Header,
  Modal,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";
import ModalCreateGroup from "./ModalCreateGroup";

export default function Layout({ children }: AppShellProps) {
  const [showModalCreateGroup, handlerModalCreateGroup] = useDisclosure(false);
  return (
    <AppShell
      header={
        <Header height={60}>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Flex>
              <Title mr="md" order={4}>
                Product Roadmap
              </Title>
              <Modal
                shadow="sm"
                opened={showModalCreateGroup}
                onClose={handlerModalCreateGroup.close}
                title={<Title order={4}>Add New Group</Title>}
                radius="md"
              >
                <ModalCreateGroup onCancel={handlerModalCreateGroup.close} />
              </Modal>
              <Button
                size="xs"
                leftIcon={<IconPlus size={16} />}
                color="cyan.8"
                onClick={handlerModalCreateGroup.toggle}
              >
                Add New Group
              </Button>
            </Flex>
          </Container>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
