import { JSX } from "react";
import NiceModal, {
  NiceModalHocProps,
  useModal as useNiceModal,
} from "@ebay/nice-modal-react";
import { ModalContent, ModalOverlay } from "./modal.style";
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
  onClose?: () => void;
  isValid?: boolean;
  onSubmit?: () => void;
};

export const ModalContainer = ({
  children,
  isValid,
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
            disabled={!isValid}
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
