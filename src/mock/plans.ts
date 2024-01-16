import arcadeImg from "../images/icon-arcade.svg";
import advancedImg from "../images/icon-advanced.svg";
import proImg from "../images/icon-pro.svg";

export interface PlansI {
  image: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

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

export default plans;
