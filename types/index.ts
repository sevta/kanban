export type ModalBaseProps = {
  onCancel?: () => void;
  onSubmit?: () => void;
  onSuccess?: () => void;
};

export enum Enum {
  KanbanAuth = "kanban-auth",
}
