import { Button } from "../../../../platform/ui/components/button/button";
import { useTranslation } from "react-i18next";
import { PaymentMethod } from "../../hooks/use-commands.hook";
import {
  Filter,
  Banknote,
  CreditCard,
  ReceiptText,
  Clock3,
  MoreHorizontal,
} from "lucide-react";

export type CommandsPaymentMethodToggleProps = {
  value?: PaymentMethod | undefined;
  onChange: (value: PaymentMethod | undefined) => void;
  disabled?: boolean;
};

const order: (PaymentMethod | undefined)[] = [
  undefined,
  PaymentMethod.CASH,
  PaymentMethod.CARD,
  PaymentMethod.CHECK,
  PaymentMethod.WAITING_FOR_PAYMENT,
  PaymentMethod.OTHER,
];

export const CommandsPaymentMethodToggle = ({
  value,
  onChange,
  disabled,
}: CommandsPaymentMethodToggleProps) => {
  const { t } = useTranslation();

  const next = () => {
    const idx = order.findIndex((v) => v === value);
    const nextValue = order[(idx + 1) % order.length];
    onChange(nextValue);
  };

  const { icon, label } = (() => {
    switch (value) {
      case PaymentMethod.CASH:
        return { icon: <Banknote size={18} />, label: t("cash") };
      case PaymentMethod.CARD:
        return { icon: <CreditCard size={18} />, label: t("card") };
      case PaymentMethod.CHECK:
        return { icon: <ReceiptText size={18} />, label: t("check") };
      case PaymentMethod.WAITING_FOR_PAYMENT:
        return { icon: <Clock3 size={18} />, label: t("waiting_for_payment") };
      case PaymentMethod.OTHER:
        return { icon: <MoreHorizontal size={18} />, label: t("other") };
      default:
        return { icon: <Filter size={18} />, label: t("Tous les moyens") };
    }
  })();

  return (
    <Button
      icon={icon}
      onClick={next}
      title={label}
      aria-label={label}
      disabled={disabled}
      variant="subtle"
      size="xsmall"
    />
  );
};
