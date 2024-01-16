import { useEffect, useState } from "react";
import { classNames } from "../../../util/shared";
import Button from "../../button";
import { FormSteps } from "../../form";

import { Switch } from "@mui/material";
import plans, { PlansI } from "../../../mock/plans";

interface SecondStepI {
  setStep: React.Dispatch<React.SetStateAction<FormSteps>>;
}

function SecondStep({ setStep }: SecondStepI) {
  const [selectedPlan, setSelectedPlan] = useState<PlansI>(plans[0]);
  const [selectedPeriod, setSelectedPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const navigationAndSaveInfos = (step: FormSteps) => {
    localStorage.setItem("plan", selectedPlan.name);
    localStorage.setItem(
      "period",
      selectedPeriod === "monthly" ? "monthly" : "yearly"
    );
    setStep(step);
  };

  useEffect(() => {
    const storedPlan = localStorage.getItem("plan");
    const storedPeriod = localStorage.getItem("period");
    setSelectedPlan(plans.find((plan) => plan.name === storedPlan) || plans[0]);
    setSelectedPeriod(storedPeriod as "monthly" | "yearly");
  }, []);

  return (
    <div className="flex flex-col items-center justify-between w-[520px] h-[568px] px-20 pt-12 pb-6 rounded-xl">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-3xl w-full text-[#01265A] font-ubuntu-bold mb-2">
          Select your plan
        </p>
        <p className="text-gray-400 text-[12px] w-full mb-4">
          You have the option of monthly or yearly billing.
        </p>
        <div className="flex items-center justify-center w-full gap-2 pt-5 flex-nowrap">
          {plans.map((plan) => {
            return (
              <button
                id={plan.name}
                className={classNames(
                  "flex flex-col items-start justify-between px-3 py-6 w-1/3 h-36 mb-4 border border-gray-400 hover:border-[#544D94] rounded-[8px]",
                  plan.name === selectedPlan.name
                    ? "bg-[#F8F9FE] border-[#4a4291]"
                    : "bg-white"
                )}
                onClick={() => setSelectedPlan(plan)}
              >
                <img src={plan.image} alt={plan.name} width={30} />
                <div className="flex flex-col items-start justify-center w-full">
                  <p className="text-[#01265A] font-ubuntu-bold text-[12px]">
                    {plan.name}
                  </p>
                  <p className="text-gray-400 text-[12px]">
                    $
                    {selectedPeriod === "monthly"
                      ? plan.monthlyPrice
                      : plan.yearlyPrice}
                    {selectedPeriod === "monthly" ? "/mo" : "/ye"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex flex-row items-center justify-center w-full bg-[#e7e5f8] flex-nowrap rounded-[8px]">
          <p
            className={classNames(
              "text-[12px] font-ubuntu-bold",
              selectedPeriod === "monthly" ? "text-[#01265A]" : "text-gray-500"
            )}
          >
            Monthly
          </p>
          <Switch
            checked={selectedPeriod === "yearly" ? true : false}
            onChange={() =>
              setSelectedPeriod(
                selectedPeriod === "monthly" ? "yearly" : "monthly"
              )
            }
            inputProps={{ "aria-label": "controlled" }}
            color="primary"
            className=""
          />
          <p
            className={classNames(
              "text-[12px] font-ubuntu-bold",
              selectedPeriod === "yearly" ? "text-[#01265A]" : "text-gray-500"
            )}
          >
            Yearly
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full flex-nowrap">
        <Button
          label="Go Back"
          type="secondary"
          onClick={() => navigationAndSaveInfos(1)}
        />
        <Button
          label="Next Step"
          type="primary"
          onClick={() => navigationAndSaveInfos(3)}
        />
      </div>
    </div>
  );
}

export default SecondStep;
