import { HrLine } from "../hr-line";

export const OrLineModal = (): JSX.Element => {
  return (
    <>
      <div className="relative">
        <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-2 bg-main-background-1 z-50">
          or
        </span>
        <HrLine className="z-0" />
      </div>
    </>
  );
};
