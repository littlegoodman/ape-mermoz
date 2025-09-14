import { JSX } from "react";
import { Teacher, useTeachers } from "../hooks/use-teachers.hook";
import {
  ModalContainer,
  createModal,
} from "../../../platform/ui/components/modal";

export type TeacherEditionModalProps = {
  teacher: Teacher | undefined;
};

export const TeacherEditionModal = createModal(
  ({ teacher }: TeacherEditionModalProps): JSX.Element => {
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
      <div>
        <h1>Teacher Edition</h1>
        <p>Teacher: {teacher.name}</p>
        <p>Phone: {teacher.phone}</p>
      </div>
    );
  }
);
