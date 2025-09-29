import { JSX } from "react";
import { SearchInput } from "../../../platform/ui/components";
import { useTranslation } from "react-i18next";

export type TeachersSearchInputProps = {
  onSearch: (search: string) => void;
  onClear: () => void;
  value: string;
  disabled: boolean;
};

export const TeachersSearchInput = ({
  onSearch,
  onClear,
  value,
  disabled,
}: TeachersSearchInputProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <SearchInput
      placeholder={t("Rechercher un enseignant")}
      onSearch={onSearch}
      onClear={onClear}
      value={value}
      disabled={disabled}
    />
  );
};
