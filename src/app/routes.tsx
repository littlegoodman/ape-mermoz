import { createRoutesFromElements, Route } from "react-router-dom";
import { Providers } from "./providers";
import { TeachersPage } from "./teachers/views/teachers.page";
import { StudentsPage } from "./students/views/students.page";
import { WelcomePage } from "./welcome/view/welcome.page";
import { CommandsSummaryPage } from "./chocolates-2025/views/commands-summary.page";
import { CommandsPage } from "./chocolates-2025/views/commands.page";

export const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/professors" element={<TeachersPage />} />
    <Route path="/students" element={<StudentsPage />} />
    <Route path="/commands-summary" element={<CommandsSummaryPage />} />
    <Route path="/commands" element={<CommandsPage />} />
  </Route>
);
