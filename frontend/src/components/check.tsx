import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePublicClient } from "wagmi";
import data from "./interface.json";

export default function CheckIp() {
  const [newIp, setNewIp] = useState<string>();
  const [realIp, setRealIp] = useState<string>();
  const publicClient = usePublicClient();

  async function readNewIp() {
    const ip = await publicClient.readContract({
      abi: data.abi,
      address: `0x${data.address.substring(2)}`,
      functionName: "getIp",
    });

    console.log(ip);

    setNewIp(ip as string);
  }

  async function readRealIp(){
    const result = await fetch("https://api.ipify.org?format=json", {
      method: "GET",
    }).then(res=>res.json());

    setRealIp((result as {ip:string}).ip);
  }

  useEffect(()=>{
    setTimeout(()=>{
        readNewIp();
      }, 1000)
      readRealIp();
    }, [])

  return (
    <>
      <p>
        Your old IP Address: <span className="font-bold">{realIp}</span>
      </p>
      <p>
        Your new IP Address: <span className="font-bold">{newIp}</span>
      </p>
    </>
  );
}
