import { TeachersNavigation } from "../../teachers/teachers.navigation";

export const Navigation = () => {
  return (
    <ul>
      <li>L’École</li>
      <li>
        <TeachersNavigation />
      </li>
    </ul>
  );
};
