export const Paragraph = ({ text }: { text: string }): JSX.Element => {
  return (
    <p className="text-xl text-light-secondary dark:text-light-line-reply">
      {text}
    </p>
  );
};
