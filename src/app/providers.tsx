import { Outlet } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";

export const Providers = () => {
  return (
    <NiceModal.Provider>
      <Outlet />
    </NiceModal.Provider>
  );
};
