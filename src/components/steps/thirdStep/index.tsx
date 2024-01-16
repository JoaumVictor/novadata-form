import { useEffect, useState } from "react";
import { classNames } from "../../../util/shared";
import Button from "../../button";
import iconCheckmark from "../../../images/icon-checkmark.svg";
import { FormSteps } from "../../form";

interface OptionsSelectedI {
  onlineService: boolean;
  largerStorage: boolean;
  customProfile: boolean;
}

interface OptionsI {
  optionName: "onlineService" | "largerStorage" | "customProfile";
  title: string;
  description: string;
  price: number;
}

interface ThirdStepI {
  setStep: React.Dispatch<React.SetStateAction<FormSteps>>;
}

function ThirdStep({ setStep }: ThirdStepI) {
  const options: OptionsI[] = [
    {
      optionName: "onlineService",
      title: "Online Service",
      description: "Access to multiplayer games.",
      price: 1,
    },
    {
      optionName: "largerStorage",
      title: "Larger storage",
      description: "Extra 1TB of cloud save.",
      price: 2,
    },
    {
      optionName: "customProfile",
      title: "Customizable profile",
      description: "Custom theme on your profile.",
      price: 2,
    },
  ];

  const [optionSelected, setOptionSelected] = useState<OptionsSelectedI>({
    onlineService: false,
    largerStorage: false,
    customProfile: false,
  });

  const navigationAndSaveInfos = (step: FormSteps) => {
    localStorage.setItem(
      "onlineService",
      optionSelected.onlineService.toString()
    );
    localStorage.setItem(
      "largerStorage",
      optionSelected.largerStorage.toString()
    );
    localStorage.setItem(
      "customProfile",
      optionSelected.customProfile.toString()
    );
    setStep(step);
  };

  useEffect(() => {
    const storedOnlineService = localStorage.getItem("onlineService");
    const storedLargerStorage = localStorage.getItem("largerStorage");
    const storedCustomProfile = localStorage.getItem("customProfile");
    setOptionSelected({
      ...optionSelected,
      onlineService: storedOnlineService === "true",
      largerStorage: storedLargerStorage === "true",
      customProfile: storedCustomProfile === "true",
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-between w-3/4 h-[568px] px-20 pt-12 pb-6 rounded-xl">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-3xl w-full text-[#01265A] font-ubuntu-bold mb-2">
          Pick add-ons
        </p>
        <p className="text-[#01265A] text-[12px] w-full mb-4">
          Add-ons help enhance your gaming your gaming experience.
        </p>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          {options.map((option) => {
            return (
              <button
                className={classNames(
                  "flex gap-4 flex-row items-center justify-between py-3 px-6 w-full border border-gray-400 hover:border-[#544D94] rounded-[8px]",
                  optionSelected[option.optionName]
                    ? "bg-[#F8F9FE]"
                    : "bg-white"
                )}
                onClick={() => {
                  setOptionSelected({
                    ...optionSelected,
                    [option.optionName]: !optionSelected[option.optionName],
                  });
                }}
              >
                <div
                  className={classNames(
                    "flex items-center justify-center border p-1 w-4 h-4 rounded-[3px]",
                    optionSelected[option.optionName]
                      ? "bg-[#443BFE]"
                      : "bg-white border-gray-400"
                  )}
                >
                  {optionSelected[option.optionName] && (
                    <img src={iconCheckmark} alt="checkmark icon" width={14} />
                  )}
                </div>
                <div className="flex flex-col items-start justify-center w-[80%]">
                  <p className="text-[#01265A] font-ubuntu-bold text-[12px]">
                    {option.title}
                  </p>
                  <p className="text-gray-400 text-[12px]">
                    {option.description}
                  </p>
                </div>
                <p className="text-[12px] text-[#01265A]">
                  +${option.price}/mo
                </p>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full flex-nowrap">
        <Button
          label="Go Back"
          type="secondary"
          onClick={() => navigationAndSaveInfos(2)}
        />
        <Button
          label="Next Step"
          type="primary"
          onClick={() => navigationAndSaveInfos(4)}
        />
      </div>
    </div>
  );
}

export default ThirdStep;
