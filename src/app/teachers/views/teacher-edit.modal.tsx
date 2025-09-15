import { JSX } from "react";
import { Teacher, useTeachers } from "../hooks/use-teachers.hook";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContainer,
  Input,
  FormControl,
} from "../../../platform/ui/components";

export type TeacherEditModalProps = {
  teacher: Teacher | undefined;
};

export const TeacherEditModal = Modal.create(
  ({ teacher }: TeacherEditModalProps): JSX.Element => {
    const { t } = useTranslation();
    const { upsert } = useTeachers();
    //const { findById } = useTeachers();
    //const { data: teacher } = findById({ id: props.id });

    const {
      register,
      handleSubmit,
      reset,
      formState: { isValid, errors },
    } = useForm<Teacher>({
      defaultValues: teacher,
    });

    return (
      <ModalContainer
        isValid={isValid}
        onSubmit={handleSubmit((data) => upsert(data))}
        onClose={() => reset()}
      >
        <FormControl
          mandatory
          label={t("Nom")}
          error={!!errors.name}
          helperText={errors.name?.message}
        >
          <Input {...register("name", { required: t("Le nom est requis") })} />
        </FormControl>
        <FormControl
          mandatory
          label={t("Téléphone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        >
          <Input
            {...register("phone", { required: t("Le téléphone est requis") })}
          />
        </FormControl>
      </ModalContainer>
    );
  }
);
