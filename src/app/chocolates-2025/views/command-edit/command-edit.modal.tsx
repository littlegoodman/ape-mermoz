import { JSX, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { createWorker } from "tesseract.js";
import {
  Modal,
  ModalContainer,
  Input,
  FormControl,
  Stack,
  Row,
  Button,
  Item,
  Select,
  Toast,
  Empty,
} from "../../../../platform/ui/components";
import { useModal as useNiceModal } from "@ebay/nice-modal-react";
import {
  Article,
  Command,
  PaymentMethod,
  useCommands,
  useArticles,
} from "../../hooks";
import { useStudents, Student } from "../../../students/hooks";
import { CommandEditArticlesGrid } from "./command-edit-article.grid";
import { ComboBox } from "../../../../platform/ui";
import { CameraIcon, ScanLine, RotateCw, ZoomIn, X } from "lucide-react";
import { Teacher, useTeachers } from "../../../teachers/hooks";

export type CommandEditModalProps = {
  command: Pick<Command, "id"> | undefined;
};

export type NewCommand = {
  id?: number;
  contact?: string;
  phone?: string | null;
  email?: string | null;
  student?: Student;
  teacher: Teacher;
  articles: {
    article: Article;
    quantity: number;
  }[];
  screenshot?: string | null;
  paymentMethod?: PaymentMethod | null;
};

export const CommandEditModal = Modal.create(
  ({ command: props }: CommandEditModalProps): JSX.Element => {
    const { t } = useTranslation();
    const modal = useNiceModal();
    const { findOne, upsert } = useCommands();
    const { findAll: findAllStudents } = useStudents();
    const { findAll: findAllTeachers } = useTeachers();
    const { findAll: findAllArticles } = useArticles();

    // State declarations
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [newCommandCounter, setNewCommandCounter] = useState(0);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isProcessingOCR, setIsProcessingOCR] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const modalContentRef = useRef<HTMLDivElement>(null);

    // Always call the hook to follow React rules, but only use the data when appropriate
    const queryId = props?.id?.toString() ?? "-1";
    const commandQuery = findOne(queryId);
    // Only use command data if we have an id and we're not in "create new" mode
    const shouldUseCommand = !!props?.id && !isCreatingNew;
    const command = shouldUseCommand ? commandQuery.data : undefined;
    const isLoading = shouldUseCommand ? commandQuery.isLoading : false;
    const [toastMessage, setToastMessage] = useState<{
      title: string;
      message?: string;
      variant: "success" | "error" | "info";
    } | null>(null);

    const { data: students } = findAllStudents();
    const { data: teachers } = findAllTeachers();
    const { data: allArticles } = findAllArticles();

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
    const teacher = watch("teacher");

    // Update screenshot state when command loads
    useEffect(() => {
      if (command?.screenshot !== undefined) {
        setScreenshot(command.screenshot || null);
      }
    }, [command?.screenshot]);

    // Reset form when command data is loaded or when command id changes
    useEffect(() => {
      // Don't reload command data if we're in "create new" mode
      if (isCreatingNew) {
        return;
      }
      if (command) {
        reset(command);
      } else if (!props?.id) {
        // Reset to empty form when opening a new command
        reset({
          articles: [],
        });
      }
    }, [command, props?.id, reset, isCreatingNew]);

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

    // Close fullscreen on ESC
    useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsFullscreen(false);
        }
      };
      if (isFullscreen) {
        window.addEventListener("keydown", onKeyDown);
      }
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [isFullscreen]);

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
      // Immediately stop all tracks from the camera
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => {
          track.stop();
          console.log("Stopped track:", track.kind);
        });
        videoRef.current.srcObject = null;
      }
      // Immediately stop all tracks from the camera
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => {
          track.stop();
          console.log("Stopped track:", track.kind);
        });
        videoRef.current.srcObject = null;
      }
      setIsCapturing(false);
    };

    const handleTakePhoto = () => {
      if (isCapturing) {
        capturePhoto();
      } else {
        startCamera();
      }
    };

    const extractQuantitiesFromScreenshot = async () => {
      if (!screenshot || !allArticles) {
        console.error("Screenshot or articles not available");
        return;
      }

      setIsProcessingOCR(true);
      console.log("Starting OCR extraction...");

      try {
        const worker = await createWorker("fra+eng");
        const { data } = await worker.recognize(screenshot);
        await worker.terminate();

        console.log("OCR Result:", data.text);

        // Parse the text to extract article names and quantities
        const lines = data.text.split("\n").filter((line) => line.trim());
        const extractedQuantities: Record<number, number> = {};

        for (const article of allArticles) {
          // Try to find the article name in the OCR text
          // We'll look for partial matches since OCR might not be perfect
          const articleNameWords = article.name.toLowerCase().split(" ");

          for (const line of lines) {
            const lineLower = line.toLowerCase();
            // Check if this line contains key words from the article name
            const containsKeyWords = articleNameWords.some(
              (word) => word.length > 4 && lineLower.includes(word)
            );

            if (containsKeyWords) {
              // Try to extract a number from this line
              const numbers = line.match(/\d+/g);
              if (numbers && numbers.length > 0) {
                // Use the last number found as it's likely the quantity
                const quantity = parseInt(numbers[numbers.length - 1]);
                if (quantity > 0 && quantity <= 100) {
                  extractedQuantities[article.id] = quantity;
                  console.log(`Found ${quantity} for article: ${article.name}`);
                  break;
                }
              }
            }
          }
        }

        console.log("Extracted quantities:", extractedQuantities);

        // Update the articles in the form
        if (Object.keys(extractedQuantities).length > 0) {
          const updatedArticles = allArticles.map((article) => ({
            article,
            quantity: extractedQuantities[article.id] || 0,
          }));
          setValue("articles", updatedArticles);
          console.log("Updated articles in form");

          // Show success toast with count
          const count = Object.keys(extractedQuantities).filter(
            (id) => extractedQuantities[parseInt(id)] > 0
          ).length;
          setToastMessage({
            title: "Extraction réussie",
            message: `${count} ${count === 1 ? "article" : "articles"} extrait${
              count > 1 ? "s" : ""
            }`,
            variant: "success",
          });
        } else {
          console.warn("No quantities extracted from screenshot");
          setToastMessage({
            title: "Aucun article trouvé",
            message: "Veuillez vérifier la qualité de la photo",
            variant: "error",
          });
        }
      } catch (error) {
        console.error("Error during OCR:", error);
        setToastMessage({
          title: "Erreur d'extraction",
          message: "Une erreur est survenue lors de l'OCR",
          variant: "error",
        });
      } finally {
        setIsProcessingOCR(false);
      }
    };

    // Auto-hide toast after 3 seconds
    useEffect(() => {
      if (toastMessage) {
        const timer = setTimeout(() => {
          setToastMessage(null);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [toastMessage]);

    const handleSave = async (data: Command | NewCommand) => {
      upsert({ ...data, screenshot } as Command);
    };

    const handleSaveAndCreateNew = handleSubmit(async (data) => {
      await handleSave(data);
      // Reset form to create a new command
      setIsCreatingNew(true);
      setNewCommandCounter((prev) => prev + 1);
      reset({
        articles: [],
        contact: "",
        phone: null,
        email: null,
        paymentMethod: null,
      });
      // Explicitly reset paymentMethod to ensure Select component updates
      setValue("paymentMethod", null);
      setScreenshot(null);
      // Scroll to top of modal after a small delay to ensure DOM is updated
      setTimeout(() => {
        if (modalContentRef.current) {
          // Find the scrollable parent (ModalContent)
          let scrollableParent = modalContentRef.current.parentElement;
          while (scrollableParent) {
            const style = window.getComputedStyle(scrollableParent);
            if (style.overflowY === "auto" || style.overflowY === "scroll") {
              scrollableParent.scrollTo({ top: 0, behavior: "smooth" });
              break;
            }
            scrollableParent = scrollableParent.parentElement;
          }
        }
      }, 100);
      // Show success message
      setToastMessage({
        title: t("Commande enregistrée"),
        message: t("Vous pouvez maintenant créer une nouvelle commande"),
        variant: "success",
      });
    });

    const handleSaveAndClose = handleSubmit(async (data) => {
      await handleSave(data);
      handleClose();
      modal.remove();
    });

    const handleClose = () => {
      stopCamera();
      reset();
      setScreenshot(null);
      setIsCreatingNew(false);
      setNewCommandCounter(0);
    };

    return (
      <ModalContainer
        size="l"
        tone="pink"
        isValid={isValid}
        onClose={handleClose}
      >
        {isLoading ? (
          <Empty title={t("Chargement en cours...")} />
        ) : (
          <div ref={modalContentRef}>
            <Stack>
              <Row spacing={4}>
                <Stack>
                  <Row>
                    <FormControl
                      mandatory
                      width="large"
                      label={t("Élève ou enseignant")}
                      error={!!errors.student}
                      helperText={errors.student?.message}
                    >
                      <ComboBox
                        items={
                          [...(students ?? []), ...(teachers ?? [])]
                            .sort((a, b) =>
                              a.lastName.localeCompare(b.lastName)
                            )
                            .map((s) => {
                              const isTeacher = "title" in s;
                              if (isTeacher) {
                                return {
                                  key: `teacher-${s.id.toString()}`,
                                  value: `${s.title} ${s.lastName} (${s.class.name})`,
                                };
                              }
                              return {
                                key: `student-${s.id.toString()}`,
                                value: `${s.firstName} ${s.lastName} (${s.class.name})`,
                              };
                            }) ?? []
                        }
                        placeholder={t(
                          "Sélectionner un élève ou un enseignant"
                        )}
                        value={
                          student
                            ? `${student?.lastName} ${student?.firstName} (${student?.class?.name})`
                            : teacher
                            ? `${teacher?.title} ${teacher?.lastName} (${teacher?.class?.name})`
                            : ""
                        }
                        onSelectionChange={(key: any) => {
                          if (key?.startsWith("student-")) {
                            const studentId = parseInt(
                              key.replace("student-", "") as string
                            );
                            const selectedStudent = students?.find(
                              (s) => s.id === studentId
                            );
                            if (selectedStudent) {
                              const teacher = teachers?.find(
                                (t) => t.class.id === selectedStudent.class.id
                              );
                              setValue("student", selectedStudent);
                              if (teacher) {
                                setValue("teacher", teacher);
                              }
                            }
                          } else if (key?.startsWith("teacher-")) {
                            const teacherId = parseInt(
                              key.replace("teacher-", "") as string
                            );
                            const selectedTeacher = teachers?.find(
                              (t) => t.id === teacherId
                            );
                            if (selectedTeacher) {
                              setValue("teacher", selectedTeacher);
                              setValue("student", undefined);
                            }
                          }
                        }}
                        error={!!errors.student}
                      />
                    </FormControl>
                    <FormControl
                      label={t("Contact")}
                      error={!!errors.contact}
                      helperText={errors.contact?.message}
                    >
                      <Input {...register("contact", { required: false })} />
                    </FormControl>
                  </Row>
                  <Row>
                    <FormControl
                      label={t("Téléphone")}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    >
                      <Input {...register("phone", { required: false })} />
                    </FormControl>
                    <FormControl
                      label={t("Email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    >
                      <Input {...register("email", { required: false })} />
                    </FormControl>
                    <FormControl
                      label={t("Moyen de paiement")}
                      error={!!errors.paymentMethod}
                      helperText={errors.paymentMethod?.message}
                    >
                      <Select
                        key={`paymentMethod-${
                          isCreatingNew
                            ? `new-${newCommandCounter}`
                            : props?.id ?? "default"
                        }`}
                        label={t("Moyen de paiement")}
                        name="paymentMethod"
                        value={watch("paymentMethod")?.toString() ?? undefined}
                        items={Object.values(PaymentMethod).map((method) => ({
                          key: method,
                          value: method,
                        }))}
                        onChange={(event) => {
                          setValue(
                            "paymentMethod",
                            event.target.value as PaymentMethod
                          );
                        }}
                      >
                        {(item) => <Item key={item.key}>{t(item.value)}</Item>}
                      </Select>
                    </FormControl>
                  </Row>
                </Stack>

                <Row justify="end">
                  {screenshot && !isCapturing && (
                    <div
                      style={{
                        width: "fit-content",
                      }}
                    >
                      <Stack spacing={1}>
                        <Button
                          variant="outlined"
                          style={{ margin: "1px" }}
                          onClick={handleTakePhoto}
                          title={t("Changer la photo")}
                        >
                          <RotateCw size={16} />
                        </Button>
                        <Button
                          variant="outlined"
                          style={{ margin: "1px" }}
                          onClick={() => setIsFullscreen(true)}
                          title={t("Afficher en plein écran")}
                        >
                          <ZoomIn size={16} />
                        </Button>
                        <Button
                          hidden={true}
                          variant="outlined"
                          style={{ margin: "1px" }}
                          onClick={extractQuantitiesFromScreenshot}
                          disabled={isProcessingOCR}
                          title={
                            isProcessingOCR
                              ? t("Extraction en cours...")
                              : t("Extraire les articles")
                          }
                        >
                          <ScanLine size={16} />
                        </Button>
                      </Stack>
                    </div>
                  )}

                  <FormControl width="fit-content">
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
                        <Stack spacing={2} align="end">
                          {screenshot ? (
                            <img
                              src={screenshot}
                              alt="Command photo"
                              style={{
                                maxWidth: "150px",
                                maxHeight: "120px",
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                maxWidth: "135px",
                                height: "110px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                border: "2px dashed #ccc",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#f5f5f5",
                                cursor: "pointer",
                              }}
                              onClick={handleTakePhoto}
                              title="Click to take photo"
                            >
                              <div
                                style={{
                                  textAlign: "center",
                                  color: "#999",
                                  padding: "16px",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: "48px",
                                    marginBottom: "8px",
                                  }}
                                >
                                  <CameraIcon />
                                </div>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                  }}
                                >
                                  Aucune photo
                                </div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#999",
                                    marginTop: "4px",
                                  }}
                                >
                                  Cliquer pour ajouter
                                </div>
                              </div>
                            </div>
                          )}
                        </Stack>
                      ) : (
                        <Stack spacing={2} align="end">
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
                                maxWidth: "135px",
                                maxHeight: "110px",
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
              </Row>

              <CommandEditArticlesGrid
                {...register("articles")}
                articles={watch("articles")}
                onArticlesChange={(articles) => {
                  setValue("articles", articles);
                }}
                isLoading={false}
                error={null}
              />

              <Row justify="end" spacing={2}>
                <Button
                  variant="outlined"
                  disabled={!isValid}
                  onClick={handleSaveAndCreateNew}
                >
                  {t("Enregistrer et créer nouveau")}
                </Button>
                <Button
                  variant="contained"
                  disabled={!isValid}
                  onClick={handleSaveAndClose}
                >
                  {t("Enregistrer et fermer")}
                </Button>
              </Row>
            </Stack>
          </div>
        )}
        {toastMessage && (
          <Toast
            title={toastMessage.title}
            message={toastMessage.message}
            variant={toastMessage.variant}
          />
        )}
        {isFullscreen && screenshot && (
          <div
            onClick={() => setIsFullscreen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: "24px",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "95vw",
                maxHeight: "95vh",
              }}
            >
              <button
                onClick={() => setIsFullscreen(false)}
                aria-label={t("Fermer")}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "rgba(0,0,0,0.6)",
                  border: "none",
                  borderRadius: 8,
                  padding: 6,
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                <X size={18} />
              </button>
              <img
                src={screenshot}
                alt="Command photo fullscreen"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  width: "90vw",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 8,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </div>
        )}
      </ModalContainer>
    );
  }
);
