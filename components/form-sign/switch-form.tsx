type SwitchSignProps = {
  switchSign: () => void;
  textP: string;
  textButton: string;
};

export const SwitchForm = ({
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
          className="span-link cursor-pointer inline-block"
        >
          {textButton}
        </button>
      </div>
    </>
  );
};
