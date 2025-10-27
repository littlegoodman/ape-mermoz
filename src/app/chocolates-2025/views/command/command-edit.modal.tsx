import { JSX, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContainer,
  Input,
  FormControl,
  Stack,
  Row,
  Button,
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
  screenshot?: string | null;
};

export const CommandEditModal = Modal.create(
  ({ command }: CommandEditModalProps): JSX.Element => {
    const { t } = useTranslation();
    const { upsert } = useCommands();
    const { findAll: findAllStudents } = useStudents();
    const [screenshot, setScreenshot] = useState<string | null>(
      command?.screenshot || null
    );
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isCapturing, setIsCapturing] = useState(false);

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

    useEffect(() => {
      if (isCapturing && videoRef.current) {
        console.log(
          "Video element is now available, starting camera stream..."
        );
        const startCameraStream = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
            });
            console.log("Camera stream obtained");

            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              console.log("Stream assigned to video element");

              const video = videoRef.current;
              video.addEventListener(
                "loadedmetadata",
                () => {
                  console.log(
                    "Video metadata loaded, dimensions:",
                    video.videoWidth,
                    video.videoHeight
                  );
                },
                { once: true }
              );

              video.addEventListener(
                "playing",
                () => {
                  console.log("Video is playing");
                },
                { once: true }
              );
            }
          } catch (error) {
            console.error("Camera access failed:", error);
            setIsCapturing(false);
          }
        };

        startCameraStream();

        // Cleanup function
        return () => {
          console.log("Cleaning up camera stream");
          if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
          }
        };
      }
    }, [isCapturing]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setScreenshot(base64String);
        };
        reader.readAsDataURL(file);
      }
    };

    const startCamera = () => {
      console.log("startCamera called, setting isCapturing to true");
      setIsCapturing(true);
    };

    const capturePhoto = () => {
      console.log("Capture button clicked");
      const video = videoRef.current;
      if (!video) {
        console.error("Video element not found");
        return;
      }

      console.log("Video dimensions:", video.videoWidth, video.videoHeight);

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.error("Video dimensions are 0");
        // Wait a bit and try again
        setTimeout(() => capturePhoto(), 100);
        return;
      }

      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          console.error("Could not get canvas context");
          return;
        }

        ctx.drawImage(video, 0, 0);
        const base64String = canvas.toDataURL("image/png");
        console.log("Screenshot captured, length:", base64String.length);
        setScreenshot(base64String);
        stopCamera();
      } catch (error) {
        console.error("Error capturing photo:", error);
      }
    };

    const stopCamera = () => {
      console.log("stopCamera called, setting isCapturing to false");
      setIsCapturing(false);
    };

    const handleTakePhoto = () => {
      if (isCapturing) {
        capturePhoto();
      } else {
        startCamera();
      }
    };

    const onSubmit = (data: Command | NewCommand) => {
      upsert({ ...data, screenshot } as Command);
    };

    const handleClose = () => {
      stopCamera();
      reset();
      setScreenshot(null);
    };

    return (
      <ModalContainer
        size="l"
        isValid={isValid}
        onSubmit={handleSubmit(onSubmit)}
        onClose={handleClose}
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

          <Row align="start">
            <FormControl label={t("Screenshot de la commande")}>
              <Stack spacing={2}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
                {!isCapturing ? (
                  <>
                    <Button variant="outlined" onClick={handleTakePhoto}>
                      {screenshot
                        ? t("Changer la photo")
                        : t("Prendre une photo")}
                    </Button>
                    {screenshot && (
                      <div
                        style={{
                          maxWidth: "200px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "1px solid #ccc",
                        }}
                      >
                        <img
                          src={screenshot}
                          alt="Command photo"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <Stack spacing={2}>
                    <div
                      style={{
                        backgroundColor: "#000",
                        borderRadius: "8px",
                        padding: "8px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={{
                          maxWidth: "300px",
                          maxHeight: "400px",
                          width: "100%",
                          height: "auto",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <Row justify="center">
                      <Button
                        variant="contained"
                        onClick={capturePhoto}
                        style={{ marginRight: "8px" }}
                      >
                        {t("Capturer")}
                      </Button>
                      <Button variant="light" onClick={stopCamera}>
                        {t("Annuler")}
                      </Button>
                    </Row>
                  </Stack>
                )}
              </Stack>
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
