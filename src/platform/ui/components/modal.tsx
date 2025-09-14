import { JSX } from "react";
import NiceModal, {
  NiceModalHocProps,
  useModal as useNiceModal,
} from "@ebay/nice-modal-react";
import { styled } from "@stitches/react";

export interface ShowModal<P extends {}> {
  show: (props: P) => Promise<React.FC<P & NiceModalHocProps>>;
}

export const Modal = {
  create: <P extends {}>(Comp: React.ComponentType<P>): ShowModal<P> => ({
    show: (props: P) => NiceModal.show(NiceModal.create(Comp), props),
  }),
};

export type ModalProps = {
  children: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
};

const ModalOverlay = styled("div", {
  position: "fixed !important",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ModalContent = styled("div", {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "2rem",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  maxWidth: "500px",
  width: "100%",
  maxHeight: "90vh",
  overflowY: "auto",
  "& h1, & h2": {
    marginBottom: "1rem",
    color: "#2f2f2f",
  },
  "& p": {
    marginBottom: "0.5rem",
    color: "#4f4f4f",
  },
  "& button": {
    marginTop: "1rem",
  },
});

export const ModalContainer = ({
  children,
  onClose,
  onSubmit,
}: ModalProps): JSX.Element => {
  const modal = useNiceModal();

  return (
    <ModalOverlay onClick={() => modal.remove()}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        {onSubmit && (
          <button
            onClick={() => {
              onSubmit();
              modal.remove();
            }}
          >
            Submit
          </button>
        )}

        <button
          onClick={() => {
            onClose?.();
            modal.remove();
          }}
        >
          Close
        </button>
      </ModalContent>
    </ModalOverlay>
  );
};
