import { JSX } from "react";
import { useTeachers } from "../hooks/use-teachers.hook";
import { Modal } from "../../../platform/ui/components/modal";

export type TeacherEditionModalProps = {
  id: string;
};

export const TeacherEditionModal = {
  show: (props: TeacherEditionModalProps) =>
    Modal.show(TeacherEditionModalContent, props),
};

export const TeacherEditionModalContent = (
  props: TeacherEditionModalProps
): JSX.Element => {
  const { findById } = useTeachers();
  const { data: teacher } = findById({ id: props.id });

  if (!teacher) {
    return <div>Teacher not found</div>;
  }

  return (
    <div>
      <h1>Teacher Edition</h1>
      <p>Teacher: {teacher.name}</p>
      <p>Phone: {teacher.phone}</p>
    </div>
  );
};
