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

    const { data: classes } = findAll();
    if (!classes) {
      return <div>Loading...</div>;
    }

    const selectedClassId = watch("class.id");

    const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const classId = parseInt(event.target.value);
      const selectedClass = classes.find((c) => c.id === classId);
      if (selectedClass) {
        setValue("class.id", classId);
        setValue("class.name", selectedClass.name);
      }
    };

    const onSubmit = (data: Teacher) => {
      // Ensure we have the complete class object
      const selectedClass = classes.find((c) => c.id === data.class.id);
      if (selectedClass) {
        upsert({
          ...data,
          class: {
            id: selectedClass.id,
            name: selectedClass.name,
          },
        });
      }
    };

    // Add validation for class selection
    const isClassSelected = Boolean(
      selectedClassId && classes.some((c) => c.id === selectedClassId)
    );

    return (
      <ModalContainer
        isValid={isValid && isClassSelected}
        onSubmit={handleSubmit(onSubmit)}
        onClose={() => reset()}
      >
        <Stack>
          <Row>
            <FormControl
              mandatory
              label={t("Prénom")}
              error={!!errors.title}
              helperText={errors.title?.message}
            >
              <Input
                {...register("title", {
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
            error={!isClassSelected}
            helperText={
              !isClassSelected ? t("La classe est requise") : undefined
            }
          >
            <Select
              label={t("Classe")}
              name="class.id"
              value={selectedClassId?.toString()}
              onChange={handleClassChange}
              items={classes}
            >
              {(item) => <Item key={item.id}>{item.name}</Item>}
            </Select>
          </FormControl>
        </Stack>
      </ModalContainer>
    );
  }
);
