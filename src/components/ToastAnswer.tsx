import Image from "next/image";

export const CorrectAnswerToast = () => (
  <Image
    src="/correct.gif"
    alt="Bravo"
    className="ml-16"
    width={200}
    height={200}
  />
);

export const IncorrectAnswerToast = () => (
  <div className="flex pl-20 gap-4">
    <Image src="/Incorrect.gif" alt="Bravo" width={200} height={200} />
  </div>
);
