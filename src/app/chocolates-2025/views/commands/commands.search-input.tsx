import { JSX } from "react";
import { SearchInput } from "../../../../platform/ui/components";
import { useTranslation } from "react-i18next";

export type CommandsSearchInputProps = {
  onSearch: (search: string) => void;
  onClear: () => void;
  value: string;
  disabled: boolean;
};

export const CommandsSearchInput = ({
  onSearch,
  onClear,
  value,
  disabled,
}: CommandsSearchInputProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <SearchInput
      placeholder={t("Rechercher une commande")}
      onSearch={onSearch}
      onClear={onClear}
      value={value}
      disabled={disabled}
    />
  );
};
