import { Button } from "./ui/button";
import { Combobox } from "./ui/combo-box";

export default function Configure() {
  return (
    <>
      <p className="font-bold">Configure</p>
      <p>Choose the node</p>
      <Combobox options={[{
        label: "0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD",
        value: "0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD"
      }]}/>
    </>
  );
}
