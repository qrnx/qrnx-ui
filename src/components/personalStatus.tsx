import { CancelPremium } from "./forms/cancel-premium";
import { GetPremium } from "./forms/get-premium";
import { ResponsiveDialog } from "./responsive-dialog";

export const PersonalStatus = ({ title, status }) => {
  return (
    <ResponsiveDialog
      label={title}
      title={title}
      variant={"ghost"}
      description={"asd"}
      formComponent={<GetPremium />}
    />
  );
};
