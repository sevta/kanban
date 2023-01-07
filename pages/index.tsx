import { Container, Grid, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import KanbanCard from "components/KanbanCard";
import ModalCreateTask from "components/ModalCreateTask";
import Layout from "../components/Layout";
export default function Home() {
  const [showModal, handlerShowModal] = useDisclosure(false);

  return (
    <Layout>
      <Container>
        <Modal
          shadow="sm"
          opened={showModal}
          onClose={handlerShowModal.close}
          title={<Title order={4}>Create Task</Title>}
          radius="md"
        >
          <ModalCreateTask onCancel={handlerShowModal.close} />
        </Modal>
        <Grid>
          <Grid.Col xs={3}>
            <KanbanCard
              onCreateTask={handlerShowModal.toggle}
              items={[
                {
                  name: "Redesign web",
                  progress: 50,
                  done: false,
                  onMoveLeft() {
                    alert("move left");
                  },
                  onMoveRight() {
                    alert("on move right");
                  },
                  onDelete() {
                    alert("on delete");
                  },
                  onEdit() {
                    alert("on edit");
                  },
                },
                {
                  name: "Bundle interplanetary analytics for improved transmission",
                  progress: 100,
                  done: true,
                },
                {
                  name: "Bundle interplanetary analytics for improved transmission",
                  progress: 24,
                  done: false,
                },
              ]}
            />
          </Grid.Col>
          <Grid.Col xs={3}>
            <KanbanCard
              color="orange"
              onCreateTask={handlerShowModal.toggle}
              items={[
                {
                  name: "Redesign web",
                  progress: 50,
                  done: false,
                },
                {
                  name: "Bundle interplanetary analytics for improved transmission",
                  progress: 100,
                  done: true,
                },
                {
                  name: "Bundle interplanetary analytics for improved transmission",
                  progress: 24,
                  done: false,
                },
                {
                  name: "Bundle interplanetary analytics for improved transmission",
                  progress: 62,
                  done: false,
                },
              ]}
            />
          </Grid.Col>
          <Grid.Col xs={3}>
            <KanbanCard color="pink" onCreateTask={handlerShowModal.toggle} />
          </Grid.Col>
        </Grid>
      </Container>
    </Layout>
  );
}
