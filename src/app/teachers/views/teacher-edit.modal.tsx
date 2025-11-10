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
  Empty,
} from "../../../platform/ui/components";
import { useClasses } from "../../common/hooks";

export type TeacherEditModalProps = {
  teacher: Teacher | undefined;
};

export const TeacherEditModal = Modal.create(
  ({ teacher }: TeacherEditModalProps): JSX.Element => {
    const { t } = useTranslation();
    const { upsert } = useTeachers();
    const { findAll } = useClasses();

    const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { isValid, errors },
    } = useForm<Teacher>({
      defaultValues: teacher,
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

    const onSubmit = (data: Teacher) => {
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
              label={t("Titre")}
              error={!!errors.title}
              helperText={errors.title?.message}
            >
              <Select
                label={t("Titre")}
                items={[{ value: "Mme" }, { value: "M" }]}
                value={watch("title")}
                {...register("title")}
              >
                {(item) => <Item key={item.value}>{item.value}</Item>}
              </Select>
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
              items={classes}
              value={watch("class.id")?.toString()}
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
