import { JSX } from "react";
import { Page } from "../../common/layout";
import { Empty } from "../../../platform/ui/components";
import { useTranslation } from "react-i18next";

export const WelcomePage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Page title={""}>
      <Empty title={t("Bienvenue")} />
    </Page>
  );
};
