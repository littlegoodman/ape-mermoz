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
} from "../../../../platform/ui/components";
import {
  Article,
  Command,
  PaymentMethod,
  useCommands,
  useArticles,
} from "../../hooks";
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
  paymentMethod?: PaymentMethod | null;
};

export const CommandEditModal = Modal.create(
  ({ command }: CommandEditModalProps): JSX.Element => {
    const { t } = useTranslation();
    const { upsert } = useCommands();
    const { findAll: findAllStudents } = useStudents();
    const { findAll: findAllArticles } = useArticles();
    const [screenshot, setScreenshot] = useState<string | null>(
      command?.screenshot || null
    );
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isProcessingOCR, setIsProcessingOCR] = useState(false);
    const [toastMessage, setToastMessage] = useState<{
      title: string;
      message?: string;
      variant: "success" | "error" | "info";
    } | null>(null);

    const { data: students } = findAllStudents();
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
            title: "Aucune quantité trouvée",
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
            <Stack>
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
              <FormControl
                label={t("Moyen de paiement")}
                error={!!errors.paymentMethod}
                helperText={errors.paymentMethod?.message}
              >
                <Select
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
            </Stack>

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
                      <Stack spacing={2}>
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
                        <Button
                          variant="outlined"
                          onClick={extractQuantitiesFromScreenshot}
                          disabled={isProcessingOCR}
                        >
                          {isProcessingOCR
                            ? t("Extraction en cours...")
                            : t("Extraire les quantités")}
                        </Button>
                      </Stack>
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
        {toastMessage && (
          <Toast
            title={toastMessage.title}
            message={toastMessage.message}
            variant={toastMessage.variant}
          />
        )}
      </ModalContainer>
    );
  }
);
