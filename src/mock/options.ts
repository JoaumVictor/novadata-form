export interface OptionsI {
  optionName: "onlineService" | "largerStorage" | "customProfile";
  title: string;
  description: string;
  price: number;
}

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

export default options;
