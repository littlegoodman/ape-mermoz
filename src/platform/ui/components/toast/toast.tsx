import { JSX } from "react";
import { styled } from "../../theme/stitches.config";
import { Text } from "../text";
import { Row } from "../row";

const ToastContainer = styled("div", {
  position: "fixed",
  bottom: "$8",
  right: "$8",
  zIndex: "$toast",
  minWidth: "300px",
  maxWidth: "400px",
  padding: "$4",
  borderRadius: "$2",
  boxShadow: "$md",
  animation: "slideIn 0.3s ease-out",
  "@keyframes slideIn": {
    from: {
      transform: "translateX(100%)",
      opacity: 0,
    },
    to: {
      transform: "translateX(0)",
      opacity: 1,
    },
  },
  variants: {
    variant: {
      success: {
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        border: "1px solid #059669",
      },
      error: {
        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
        border: "1px solid #dc2626",
      },
      info: {
        background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
        border: "1px solid #2563eb",
      },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

interface ToastProps {
  title: string;
  message?: string;
  variant?: "success" | "error" | "info";
}

export const Toast = ({
  title,
  message,
  variant = "info",
}: ToastProps): JSX.Element => {
  return (
    <ToastContainer variant={variant}>
      <Row align="center" spacing={2}>
        <div style={{ flex: 1 }}>
          <Text
            size="s"
            weight="bold"
            css={{
              color: "white !important",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            {title}
          </Text>
          {message && (
            <Text
              size="xs"
              css={{
                color: "white !important",
                opacity: 0.95,
                marginTop: "$1",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              {message}
            </Text>
          )}
        </div>
      </Row>
    </ToastContainer>
  );
};
