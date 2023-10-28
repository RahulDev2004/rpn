import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePublicClient } from "wagmi";
import data from "./interface.json";

export default function CheckIp() {
  const [value, setValue] = useState<string>();
  const publicClient = usePublicClient();

  async function readIp() {
    const ip = await publicClient.readContract({
      abi: data.abi,
      address: `0x${data.address.substring(2)}`,
      functionName: "getIp",
    });

    console.log(ip);

    setValue(ip as string);
  }

  useEffect(()=>{
    setInterval(()=>{
        readIp();
    }, 1000)
  }, [])

  return (
    <>
      <p>
        Ip Address: <span className="font-bold">{value}</span>
      </p>
    </>
  );
}
