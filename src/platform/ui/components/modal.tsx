import { JSX } from "react";
import NiceModal, {
  NiceModalHocProps,
  useModal as useNiceModal,
} from "@ebay/nice-modal-react";

export interface ShowModal<P extends {}> {
  show: (props: P) => Promise<React.FC<P & NiceModalHocProps>>;
}

export const useModal = <P extends {}>(
  Comp: React.ComponentType<P>
): ShowModal<P> => ({
  show: (props: P) => NiceModal.show(NiceModal.create(Comp), props),
});

export type ModalProps = {
  children: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
};

export const Modal = ({
  children,
  onClose,
  onSubmit,
}: ModalProps): JSX.Element => {
  const modal = useNiceModal();

  return (
    <div className="nice-modal-overlay" onClick={() => modal.remove()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
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
      </div>
    </div>
  );
};
