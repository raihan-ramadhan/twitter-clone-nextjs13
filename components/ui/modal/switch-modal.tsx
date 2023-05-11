type SwitchSignProps = {
  switchSign: () => void;
  textP: string;
  textButton: string;
};

export const SwitchModal = ({
  switchSign,
  textP,
  textButton,
}: SwitchSignProps) => {
  return (
    <>
      <div className="pt-6">
        <p className="inline">{textP}</p>{" "}
        <button
          type="button"
          role="button"
          onClick={switchSign}
          className="span-link-accent cursor-pointer inline-block"
        >
          {textButton}
        </button>
      </div>
    </>
  );
};
