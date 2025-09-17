import { JSX } from "react";
import { SearchInput } from "../../../platform/ui/components";
import { useTranslation } from "react-i18next";

export type StudentsSearchInputProps = {
  onSearch: (search: string) => void;
  onClear: () => void;
  value: string;
  disabled: boolean;
};

export const StudentsSearchInput = ({
  onSearch,
  onClear,
  value,
  disabled,
}: StudentsSearchInputProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <SearchInput
      placeholder={t("Rechercher un élève")}
      onSearch={onSearch}
      onClear={onClear}
      value={value}
      disabled={disabled}
    />
  );
};
