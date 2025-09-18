import { JSX } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContainer,
  Input,
  FormControl,
} from "../../../platform/ui/components";
import { Select, Item } from "../../../platform/ui/components/select";
import { Command, useCommands } from "../hooks";
import { useStudents, Student } from "../../students/hooks";
import { CommandArticlesEditGrid } from "./command-articles-edit.grid";

export type CommandEditModalProps = {
  command: Command | undefined;
};

export const CommandEditModal = Modal.create(
  ({ command }: CommandEditModalProps): JSX.Element => {
    const { t } = useTranslation();
    const { upsert } = useCommands();
    const { findAll } = useStudents();
    const { data: students } = findAll();

    const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { isValid, errors },
    } = useForm<Command>({
      defaultValues: command,
    });

    const selectedStudentId = watch("student.id");

    return (
      <ModalContainer
        isValid={isValid}
        onSubmit={handleSubmit((data) => upsert(data))}
        onClose={() => reset()}
      >
        <FormControl
          mandatory
          label={t("Student")}
          error={!!errors.student}
          helperText={errors.student?.message}
        >
          <Select
            label="Student"
            placeholder="Sélectionner un étudiant"
            value={selectedStudentId?.toString()}
            onChange={(e) => {
              const studentId = parseInt(e.target.value);
              const selectedStudent = students?.find((s) => s.id === studentId);
              if (selectedStudent) {
                setValue("student", selectedStudent);
              }
            }}
          >
            {students?.map((student: Student) => (
              <Item
                key={student.id}
                textValue={`${student.firstName} ${student.lastName} (${student.class})`}
              >
                {student.firstName} {student.lastName} ({student.class})
              </Item>
            ))}
          </Select>
        </FormControl>

        <FormControl
          mandatory
          label={t("Parent")}
          error={!!errors.parent}
          helperText={errors.parent?.message}
        >
          <Input {...register("parent", { required: false })} />
        </FormControl>

        <CommandArticlesEditGrid
          command={command}
          isLoading={false}
          error={null}
        />
      </ModalContainer>
    );
  }
);
