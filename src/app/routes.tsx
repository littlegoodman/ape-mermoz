import { createRoutesFromElements, Route } from "react-router-dom";
import { TeachersPage } from "./teachers/views/teachers.page";
import { Providers } from "./providers";

export const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    <Route path="/" element={<TeachersPage />} />
  </Route>
);
