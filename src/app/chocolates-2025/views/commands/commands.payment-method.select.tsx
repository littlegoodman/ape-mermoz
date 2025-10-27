import { Select, Item } from "../../../../platform/ui/components/select/select";
import { useTranslation } from "react-i18next";
import { PaymentMethod } from "../../hooks/use-commands.hook";

export type CommandsPaymentMethodSelectProps = {
  value?: PaymentMethod | undefined;
  onChange: (value: PaymentMethod | undefined) => void;
  disabled?: boolean;
};

export const CommandsPaymentMethodSelect = ({
  value,
  onChange,
  disabled,
}: CommandsPaymentMethodSelectProps) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value as PaymentMethod | "";
    onChange(newValue === "" ? undefined : (newValue as PaymentMethod));
  };

  return (
    <Select
      label={t("Moyen de paiement")}
      placeholder={t("Tous les moyens")}
      value={value ?? ""}
      onChange={handleChange}
      isDisabled={disabled}
    >
      <Item key="">{t("Tous les moyens")}</Item>
      <Item key={PaymentMethod.CASH}>{t("cash")}</Item>
      <Item key={PaymentMethod.CARD}>{t("card")}</Item>
      <Item key={PaymentMethod.CHECK}>{t("check")}</Item>
      <Item key={PaymentMethod.WAITING_FOR_PAYMENT}>
        {t("waiting_for_payment")}
      </Item>
      <Item key={PaymentMethod.OTHER}>{t("other")}</Item>
    </Select>
  );
};
