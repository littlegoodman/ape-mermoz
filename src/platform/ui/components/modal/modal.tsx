import { JSX } from "react";
import NiceModal, {
  NiceModalHocProps,
  useModal as useNiceModal,
} from "@ebay/nice-modal-react";
import { ModalContent, ModalOverlay } from "./modal.style";
import { Row } from "../row";
import { Button } from "../button";
import { useTranslation } from "react-i18next";
export { ModalContent };

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
  size?: "s" | "m" | "l";
  tone?: "default" | "pink";
  onClose?: () => void;
  isValid?: boolean;
  onSubmit?: () => void;
};

export const ModalContainer = ({
  children,
  size,
  tone = "default",
  isValid,
  onClose,
  onSubmit,
}: ModalProps): JSX.Element => {
  const { t } = useTranslation();
  const modal = useNiceModal();

  return (
    <ModalOverlay onClick={() => modal.remove()}>
      <ModalContent
        size={size}
        tone={tone}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <Row justify="end">
          <Button
            variant="light"
            onClick={() => {
              onClose?.();
              modal.remove();
            }}
          >
            {t("Annuler")}
          </Button>
          {onSubmit && (
            <Button
              variant="contained"
              disabled={!isValid}
              onClick={() => {
                onSubmit();
                modal.remove();
              }}
            >
              {t("Valider")}
            </Button>
          )}
        </Row>
      </ModalContent>
    </ModalOverlay>
  );
};
