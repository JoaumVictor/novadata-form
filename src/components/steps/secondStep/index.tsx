import Button from "../../button";
import arcadeImg from "../../../images/icon-arcade.svg";
import advancedImg from "../../../images/icon-advanced.svg";
import proImg from "../../../images/icon-pro.svg";
import { useEffect, useState } from "react";
import { classNames } from "../../../util/shared";

import { Switch } from "@mui/material";
import { FormSteps } from "../../form";

interface PlansI {
  image: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

interface SecondStepI {
  setStep: React.Dispatch<React.SetStateAction<FormSteps>>;
}

function SecondStep({ setStep }: SecondStepI) {
  const plans: PlansI[] = [
    {
      image: arcadeImg,
      name: "Arcade",
      monthlyPrice: 9,
      yearlyPrice: 99,
    },
    {
      image: advancedImg,
      name: "Advanced",
      monthlyPrice: 12,
      yearlyPrice: 120,
    },
    {
      image: proImg,
      name: "Pro",
      monthlyPrice: 15,
      yearlyPrice: 150,
    },
  ];

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
    <div className="flex flex-col items-center justify-between w-3/4 h-[568px] px-20 pt-12 pb-6 rounded-xl">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-3xl w-full text-[#01265A] font-ubuntu-bold mb-2">
          Select your plan
        </p>
        <p className="text-[#01265A]  text-[12px] w-full mb-4">
          You have the option of monthly or yearly billing.
        </p>
        <div className="flex items-center justify-center w-full gap-2 pt-6 flex-nowrap">
          {plans.map((plan) => {
            return (
              <button
                className={classNames(
                  "flex flex-col items-start justify-between px-3 py-6 w-1/3 h-36 mb-4 border border-gray-400 hover:border-[#544D94] rounded-[8px]",
                  plan.name === selectedPlan.name ? "bg-[#F8F9FE]" : "bg-white"
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
