import { JSX } from "react";
import { Teacher, useTeachers } from "../hooks/use-teachers.hook";
import {
  Modal,
  ModalContainer,
} from "../../../platform/ui/components/modal/modal";

export type TeacherEditModalProps = {
  teacher: Teacher | undefined;
};

export const TeacherEditModal = Modal.create(
  ({ teacher }: TeacherEditModalProps): JSX.Element => {
    const { create } = useTeachers();
    //const { findById } = useTeachers();
    //const { data: teacher } = findById({ id: props.id });

    if (!teacher) {
      return (
        <ModalContainer
          onSubmit={() => create({ name: "coucou", phone: "00 00 00 00 00" })}
          onClose={() => {}}
        >
          <h2>Teacher not found</h2>
          <p>This is a nice modal!</p>
        </ModalContainer>
      );
    }
    return (
      <ModalContainer onSubmit={() => create(teacher)} onClose={() => {}}>
        <h2>Teacher Edit</h2>
        <p>This is a nice modal!</p>
      </ModalContainer>
    );
  }
);
