import { JSX } from "react";
import { Button } from "../../../platform/ui/components/button/button";
import { CommandEditModal } from "./command-edit.modal";
import { Plus } from "lucide-react";

export const CommandsAddButton = (): JSX.Element => {
  return (
    <Button
      onClick={() =>
        CommandEditModal.show({
          command: undefined,
        })
      }
    >
      <Plus size={16} />
    </Button>
  );
};
