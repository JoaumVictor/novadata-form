import { useState } from "react";
import FirstStep from "../steps/firstStep";
import SecondStep from "../steps/secondStep";
import ThirdStep from "../steps/thirdStep";
import FourthStep from "../steps/FourthStep";

type FormSteps = 1 | 2 | 3 | 4;

function Form() {
  const [step, setStep] = useState<FormSteps>(1);

  const returnFormInPosition = (position: FormSteps) => {
    const forms = {
      1: <FirstStep />,
      2: <SecondStep />,
      3: <ThirdStep />,
      4: <FourthStep />,
    };
    return forms[position];
  };

  return (
    <main className="flex h-[100vh] items-center justify-center w-full bg-[#EEF5FF]">
      <div className="flex flex-row items-center justify-center gap-4 bg-white max-w-screen-2xl rounded-xl flex-nowrap">
        <div className="w-1/4 border border-black">
          <button onClick={() => setStep(1)}>passo 1</button>
          <button onClick={() => setStep(2)}>passo 2</button>
          <button onClick={() => setStep(3)}>passo 3</button>
          <button onClick={() => setStep(4)}>passo 4</button>
        </div>
        <div className="w-3/4 border border-black rounded-xl">
          {returnFormInPosition(step)}
        </div>
      </div>
    </main>
  );
}

export default Form;
