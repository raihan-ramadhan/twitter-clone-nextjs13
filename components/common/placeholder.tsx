import { CustomIcon } from "../ui/custom-icons";

export function Placeholder(): JSX.Element {
  return (
    <main
      id="globalLoader"
      className="fixed inset-0 flex w-full h-full overflow-hidden items-center justify-center"
    >
      <i>
        <CustomIcon
          className="h-20 w-20 text-[#1DA1F2]"
          iconName="TwitterIcon"
        />
      </i>
    </main>
  );
}
