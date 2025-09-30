import { JSX } from "react";
import { Teacher, useTeachers } from "../hooks/use-teachers.hook";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContainer,
  Input,
  FormControl,
  Select,
  Item,
  Stack,
  Row,
} from "../../../platform/ui/components";

export type TeacherEditModalProps = {
  teacher: Teacher | undefined;
};

export const TeacherEditModal = Modal.create(
  ({ teacher }: TeacherEditModalProps): JSX.Element => {
    const { t } = useTranslation();
    const { upsert } = useTeachers();

    const {
      register,
      handleSubmit,
      reset,
      watch,
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
        <Stack>
          <Row>
            <FormControl
              mandatory
              label={t("Prénom")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            >
              <Input
                {...register("firstName", {
                  required: t("Le prénom est requis"),
                })}
              />
            </FormControl>
            <FormControl
              mandatory
              label={t("Nom")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            >
              <Input
                {...register("lastName", { required: t("Le nom est requis") })}
              />
            </FormControl>
          </Row>
          <FormControl
            mandatory
            label={t("Classe")}
            error={!!errors.class}
            helperText={errors.class?.message}
          >
            <Select
              label={t("Classe")}
              {...register("class", { required: t("La classe est requise") })}
              value={watch("class")}
              items={[
                { id: "CE1", label: "CE1" },
                { id: "CE2", label: "CE2" },
                { id: "CM1", label: "CM1" },
                { id: "CM2a", label: "CM2a" },
                { id: "CM2b", label: "CM2b" },
              ]}
            >
              {(item) => <Item key={item.id}>{item.label}</Item>}
            </Select>
          </FormControl>
        </Stack>
      </ModalContainer>
    );
  }
);
