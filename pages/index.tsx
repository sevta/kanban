import { Container, Grid, Modal, Title } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import KanbanCard from "components/KanbanCard";
import ModalCreateTask from "components/ModalCreateTask";
import { useEffect, useState } from "react";
import { Enum } from "types";
import { apiUrl } from "utils";
import Layout from "../components/Layout";

export default function Home() {
  const [showModal, handlerShowModal] = useDisclosure(false);
  const [todos, setTodos] = useState<any>([]);
  const [value] = useLocalStorage({
    key: Enum.KanbanAuth,
    serialize: JSON.stringify,
    deserialize: (str) => (str === undefined ? "" : JSON.parse(str)),
  });

  // const { data, error } = useSWR(
  //   [apiUrl + "todos", value?.auth_token],
  //   fetcher
  // );

  async function getData() {
    try {
      const resp = await axios.get(apiUrl + "todos", {
        headers: {
          Authorization: `Bearer ${value?.auth_token}`,
        },
      });
      setTodos(resp.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (value?.auth_token) {
      getData();
    }
  }, [value]);

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
          {todos?.map((todo: any, index: number) => (
            <Grid.Col xs={3} key={index}>
              <KanbanCard title={todo.title} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}
