import {
  AppShell,
  AppShellProps,
  Button,
  Container,
  Flex,
  Header,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";
import ModalCreateGroup from "./ModalCreateGroup";
import ModalSignin from "./ModalSignin";
import ModalSignUp from "./ModalSignUp";

export default function Layout({ children }: AppShellProps) {
  const [value, setValue] = useLocalStorage({
    key: "kanban-auth",
    serialize: JSON.stringify,
  });
  const [showModalCreateGroup, handlerModalCreateGroup] = useDisclosure(false);
  const [showModalSignin, handlerModalSignin] = useDisclosure(false);
  const [showModalSignUp, handlerModalSignUp] = useDisclosure(false);

  function handleLogout() {
    setValue(undefined);
  }

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
            <Flex justify="space-between" w="100%">
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
                  <ModalCreateGroup
                    onSuccess={handlerModalCreateGroup.close}
                    onCancel={handlerModalCreateGroup.close}
                  />
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
              <Modal
                opened={showModalSignUp}
                onClose={handlerModalSignUp.close}
                radius="md"
                title={<Title order={4}>Sign Up</Title>}
              >
                <ModalSignUp
                  onSuccessSignUp={handlerModalSignUp.close}
                  onSignIn={() => {
                    handlerModalSignUp.close();
                    handlerModalSignin.open();
                  }}
                ></ModalSignUp>
              </Modal>
              <Modal
                opened={showModalSignin}
                onClose={handlerModalSignin.close}
                radius="md"
                title={<Title order={4}>Sign In</Title>}
              >
                <ModalSignin
                  onSuccessSignin={handlerModalSignin.close}
                  onSignUp={() => {
                    handlerModalSignin.close();
                    handlerModalSignUp.open();
                  }}
                ></ModalSignin>
              </Modal>
              {value?.auth_token ? (
                <Flex justify="center" align="center">
                  <Text weight={600} mr="sm" size="sm" color="gray.6">
                    {value?.name}
                  </Text>
                  <Button variant="light" size="xs" onClick={handleLogout}>
                    Logout
                  </Button>
                </Flex>
              ) : (
                <Button
                  size="xs"
                  variant="light"
                  color="cyan.8"
                  onClick={handlerModalSignin.toggle}
                >
                  Sign in
                </Button>
              )}
            </Flex>
          </Container>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
