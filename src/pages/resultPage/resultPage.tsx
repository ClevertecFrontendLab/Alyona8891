import { AuthLayout } from "../../layouts/authLayout/";
import { ResultContentLayout } from "../../layouts/resultContentLayout";

export const ResultPage: React.FC = () => {

  return (
      <>
          <AuthLayout>
              <ResultContentLayout />
          </AuthLayout>
      </>
  );
};
