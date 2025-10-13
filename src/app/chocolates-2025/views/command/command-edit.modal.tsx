import { JSX } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContainer,
  Input,
  FormControl,
  Stack,
  Row,
} from "../../../../platform/ui/components";
import { Article, Command, useCommands } from "../../hooks";
import { useStudents, Student } from "../../../students/hooks";
import { CommandArticlesEditGrid } from "./command-articles-edit.grid";
import { ComboBox } from "../../../../platform/ui";

export type CommandEditModalProps = {
  command: Command | undefined;
};

export type NewCommand = {
  id?: number;
  parent?: string;
  student?: Student;
  articles: {
    article: Article;
    quantity: number;
  }[];
};

export const CommandEditModal = Modal.create(
  ({ command }: CommandEditModalProps): JSX.Element => {
    const { t } = useTranslation();
    const { upsert } = useCommands();
    const { findAll: findAllStudents } = useStudents();

    const { data: students } = findAllStudents();

    const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { isValid, errors },
    } = useForm<Command | NewCommand>({
      defaultValues: command ?? {
        articles: [],
      },
    });

    const student = watch("student");

    return (
      <ModalContainer
        size="l"
        isValid={isValid}
        onSubmit={handleSubmit((data) => upsert(data as Command))}
        onClose={() => reset()}
      >
        <Stack>
          <Row>
            <FormControl
              mandatory
              width="large"
              label={t("Student")}
              error={!!errors.student}
              helperText={errors.student?.message}
            >
              <ComboBox
                items={
                  students
                    ?.sort((a, b) => a.lastName.localeCompare(b.lastName))
                    .map((s) => ({
                      key: s.id.toString(),
                      value: `${s.lastName} ${s.firstName} (${s.class.name})`,
                    })) ?? []
                }
                placeholder={t("Sélectionner un étudiant")}
                value={
                  student
                    ? `${student?.lastName} ${student?.firstName} (${student?.class?.name})`
                    : ""
                }
                onSelectionChange={(key) => {
                  console.log("key", key);
                  if (key) {
                    const studentId = parseInt(key as string);
                    const selectedStudent = students?.find(
                      (s) => s.id === studentId
                    );
                    if (selectedStudent) {
                      setValue("student", selectedStudent);
                    }
                  }
                }}
                error={!!errors.student}
              />
            </FormControl>

            <FormControl
              mandatory
              label={t("Parent")}
              error={!!errors.parent}
              helperText={errors.parent?.message}
            >
              <Input {...register("parent", { required: false })} />
            </FormControl>
          </Row>

          <CommandArticlesEditGrid
            {...register("articles")}
            articles={watch("articles")}
            onArticlesChange={(articles) => {
              setValue("articles", articles);
            }}
            isLoading={false}
            error={null}
          />
        </Stack>
      </ModalContainer>
    );
  }
);
