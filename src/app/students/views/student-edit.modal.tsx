import { JSX } from "react";
import { Student, useStudents } from "../hooks/use-students.hook";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContainer,
  Input,
  FormControl,
  Select,
  Item,
  Row,
  Stack,
  Empty,
} from "../../../platform/ui/components";
import { useClasses } from "../../common/hooks";

export type StudentEditModalProps = {
  student: Student | undefined;
};

export const StudentEditModal = Modal.create(
  ({ student }: StudentEditModalProps): JSX.Element => {
    const { t } = useTranslation();
    const { upsert } = useStudents();
    const { findAll } = useClasses();

    const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { isValid, errors },
    } = useForm<Student>({
      defaultValues: student,
    });

    const { data: classes, isLoading } = findAll();
    if (isLoading) {
      return <Empty title={t("Chargement...")} />;
    }

    const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const classId = parseInt(event.target.value);
      const selectedClass = classes?.find((c) => c.id === classId);
      if (selectedClass) {
        setValue("class.id", classId);
        setValue("class.name", selectedClass.name);
      }
    };

    const onSubmit = (data: Student) => {
      upsert(data);
    };

    return (
      <ModalContainer
        isValid={isValid}
        onSubmit={handleSubmit(onSubmit)}
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
            error={!!errors.class?.id}
            helperText={
              errors.class?.id ? t("La classe est requise") : undefined
            }
          >
            <Select
              label={t("Classe")}
              value={watch("class.id")?.toString()}
              items={classes}
              {...register("class.id", {
                required: t("La classe est requise"),
                onChange: handleClassChange,
              })}
            >
              {(item) => <Item key={item.id}>{item.name}</Item>}
            </Select>
          </FormControl>
        </Stack>
      </ModalContainer>
    );
  }
);
