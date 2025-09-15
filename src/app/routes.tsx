import { createRoutesFromElements, Route } from "react-router-dom";
import { Providers } from "./providers";
import { TeachersPage } from "./teachers/views/teachers.page";
import { StudentsPage } from "./students/views/students.page";
import { WelcomePage } from "./welcome/view/welcome.page";

export const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/professors" element={<TeachersPage />} />
    <Route path="/students" element={<StudentsPage />} />
  </Route>
);
