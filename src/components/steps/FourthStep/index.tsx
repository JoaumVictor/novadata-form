import { useEffect, useState } from "react";
import Button from "../../button";
import { FormSteps } from "../../form";
import plans from "../../../mock/plans";
import options from "../../../mock/options";
import { classNames } from "../../../util/shared";

interface FourthStepI {
  setStep: React.Dispatch<React.SetStateAction<FormSteps>>;
}

function FourthStep({ setStep }: FourthStepI) {
  const [finallyPlan, setFinallyPlan] = useState({
    plan: "",
    period: "",
  });
  const [finallyServices, setFinallyServices] = useState({
    onlineService: false,
    largerStorage: false,
    customProfile: false,
  });

  useEffect(() => {
    const storedPlan = localStorage.getItem("plan");
    const storedPeriod = localStorage.getItem("period");
    const storedOnlineService = localStorage.getItem("onlineService");
    const storedLargerStorage = localStorage.getItem("largerStorage");
    const storedCustomProfile = localStorage.getItem("customProfile");
    setFinallyPlan({
      plan: storedPlan || "",
      period: storedPeriod || "",
    });
    setFinallyServices({
      onlineService: storedOnlineService === "true",
      largerStorage: storedLargerStorage === "true",
      customProfile: storedCustomProfile === "true",
    });
  }, []);

  const completePlan = plans.find((plan) => plan.name === finallyPlan.plan);

  const totalValue =
    (finallyPlan.period === "monthly"
      ? completePlan?.monthlyPrice!
      : completePlan?.yearlyPrice! / 12) +
    options.reduce((acc, cur) => {
      if (finallyServices[cur.optionName]) return acc + cur.price;
      return acc;
    }, 0);

  return (
    <div className="flex flex-col items-center justify-between w-[520px] h-[568px] px-20 pt-12 pb-6 rounded-xl">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-3xl w-full text-[#01265A] font-ubuntu-bold mb-2">
          Finishing Up
        </p>
        <p className="text-gray-400 text-[12px] w-full mb-4">
          Double-check everything looks OK before confirming.
        </p>
        <div className="bg-gray-200 rounded-[8px] w-full mt-5">
          <div className="flex flex-row items-center justify-between px-5 py-3">
            <div>
              <p className="text-[14px] font-ubuntu-bold text-[#01265A]">
                {`${finallyPlan.plan} (${finallyPlan.period})`}
              </p>
              <p
                onClick={() => setStep(2)}
                className="underline text-[#01265A] hover:font-ubuntu-bold text-[12px] cursor-pointer"
              >
                Change
              </p>
            </div>
            <p className="text-[#01265A] font-ubuntu-bold text-[12px]">
              $
              {finallyPlan.period === "monthly"
                ? `${completePlan?.monthlyPrice}/mo`
                : `${completePlan?.yearlyPrice}/ye`}
            </p>
          </div>
          <div className="w-[94%] h-[1px] mx-auto bg-gray-300" />
          {options.map((option) => (
            <div
              id={option.title}
              className={classNames(
                "flex items-center justify-between px-4 my-2",
                !finallyServices[option.optionName] && "hidden"
              )}
            >
              <p className="text-[12px] text-gray-400">{option.title}</p>
              <p className="text-[12px] text-[#01265A]">
                {finallyPlan.period === "monthly"
                  ? `+${option.price}/mo`
                  : `+${option.price * 12}/ye`}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between w-full mt-10">
          <p className="text-[12px] text-gray-400">
            {finallyPlan.period === "monthly"
              ? "Total (per month)"
              : "Total (per year)"}
          </p>
          <p className="text-[16px] text-[#5145E6] font-ubuntu-bold">
            {finallyPlan.period === "monthly"
              ? `+${totalValue}/mo`
              : `+${totalValue * 12}/ye`}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full flex-nowrap">
        <Button label="Go Back" type="secondary" onClick={() => setStep(3)} />
        <button
          className={classNames(
            "bg-[#938CFD] disabled:bg-[#263c57fd] text-white rounded-[8px] mt-4 px-4 py-2 text-[12px]"
          )}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default FourthStep;
