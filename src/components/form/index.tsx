import { useState } from "react";
import FirstStep from "../steps/firstStep";
import SecondStep from "../steps/secondStep";
import ThirdStep from "../steps/thirdStep";
import FourthStep from "../steps/FourthStep";
import bgsidebar from "../../images/bg-sidebar-desktop.svg";
import { classNames } from "../../util/shared";

export type FormSteps = 1 | 2 | 3 | 4;

interface stepMapProps {
  step: FormSteps;
  name: string;
}

function Form() {
  const [step, setStep] = useState<FormSteps>(1);

  const stepMap: stepMapProps[] = [
    { step: 1, name: "YOUR INFO" },
    { step: 2, name: "SELECT PLAN" },
    { step: 3, name: "ADD-ONS" },
    { step: 4, name: "SUMMARY" },
  ];

  const returnFormInPosition = (position: FormSteps) => {
    const forms = {
      1: <FirstStep setStep={setStep} />,
      2: <SecondStep setStep={setStep} />,
      3: <ThirdStep setStep={setStep} />,
      4: <FourthStep setStep={setStep} />,
    };
    return forms[position];
  };

  return (
    <main className="flex h-[100vh] items-center justify-center w-full bg-[#EEF5FF]">
      <div className="flex flex-row items-center justify-center gap-4 p-4 bg-white max-w-screen-2xl rounded-xl flex-nowrap">
        <div
          className="flex flex-col items-center justify-start w-1/4 rounded-[10px] pt-6 gap-2"
          style={{
            background: `url(${bgsidebar})`,
            width: "274px",
            height: "568px",
          }}
        >
          {stepMap.map((item) => (
            <button
              id={item.name}
              onClick={() => {
                if (item.step < step) setStep(item.step);
              }}
              className={classNames(
                "flex items-center justify-start w-4/5 h-16 gap-2",
                item.step <= step ? "cursor-pointer" : "cursor-auto"
              )}
            >
              <div
                className={classNames(
                  "rounded-full p-4 flex justify-center items-center w-[21px] h-[21px]",
                  step === item.step
                    ? "bg-[#BEE1FE] border-2 border-[#BEE1FE]"
                    : "bg-transparent border-2 border-white"
                )}
              >
                <p
                  className={classNames(
                    step === item.step ? "text-black" : "text-white",
                    "text-[14px] font-ubuntu-bold"
                  )}
                >
                  {item.step}
                </p>
              </div>
              <div className="flex flex-col items-start justify-center">
                <p className="text-gray-400 text-[10px]">STEP {item.step}</p>
                <p className="text-white text-[14px] font-ubuntu-bold tracking-wider">
                  {item.name}
                </p>
              </div>
            </button>
          ))}
        </div>
        {returnFormInPosition(step)}
      </div>
    </main>
  );
}

export default Form;
