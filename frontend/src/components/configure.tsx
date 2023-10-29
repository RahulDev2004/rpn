import data from "./interface.json";
import { erc20ABI, usePublicClient, useWalletClient } from "wagmi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { parseEther } from "viem";
import { Button } from "./ui/button";


export default function Configure() {

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  async function fundWallet() {
    if (!walletClient) {
      console.log("wallets not connected");
      return;
    }

    const [address] = await walletClient.getAddresses();

    const { request } = await publicClient.simulateContract({
      abi: erc20ABI,
      address: `0x779877A7B0D9E8603169DdbD7836e478b4624789`,
      functionName: "transfer",
      args: [`0x${data.address.substring(2)}`, parseEther("0.5")],
      account: address,
    });

    const hash = await walletClient.writeContract(request);
  }

  return (
    <>
      {/* <p>Address: {data.address}</p> */}
      <Button onClick={fundWallet}>Fund Your Account</Button>
      <p className="font-bold">Configure</p>
      <p>Choose the node</p>
      {/* <Combobox options={[{
        label: "0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD",
        value: "0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD"
      }]} /> */}
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choose the node" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD">0x6090149792d...</SelectItem>
          {/* <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem> */}
        </SelectContent>
      </Select>

    </>
  );
}
