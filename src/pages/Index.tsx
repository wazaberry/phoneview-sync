import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PhoneHero from "@/components/PhoneHero";
import PhoneHistory from "@/components/PhoneHistory";

interface HistoryEntry {
  phoneNumber: string;
  timestamp: string;
}

const Index = () => {
  const [searchParams] = useSearchParams();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const phoneNumber = searchParams.get("PhoneID");

  useEffect(() => {
    if (phoneNumber) {
      const newEntry = {
        phoneNumber,
        timestamp: new Date().toLocaleString(),
      };
      setHistory((prev) => [newEntry, ...prev]);
    }
  }, [phoneNumber]);

  return (
    <div className="min-h-screen bg-background">
      <PhoneHero phoneNumber={phoneNumber} />
      <PhoneHistory history={history} />
    </div>
  );
};

export default Index;