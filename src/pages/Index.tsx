import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PhoneHero from "@/components/PhoneHero";
import PhoneHistory from "@/components/PhoneHistory";
import { supabase } from "@/lib/supabase";

interface PhoneEntry {
  id: number;
  phonenumber: string;
  timestamp: string;
}

const Index = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [currentPhone, setCurrentPhone] = useState<string | null>(searchParams.get("PhoneID"));

  // Fetch phone history
  const { data: history = [] } = useQuery({
    queryKey: ["phone-history"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("phone_history")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) {
        toast.error("Failed to fetch phone history");
        throw error;
      }

      // Update current phone with the latest entry
      if (data && data.length > 0) {
        setCurrentPhone(data[0].phonenumber);
      }

      return data as PhoneEntry[];
    },
  });

  // Subscribe to real-time changes
  useEffect(() => {
    const channel = supabase
      .channel("phone_history_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "phone_history",
        },
        (payload) => {
          // Update the current phone number if it's an insert
          if (payload.eventType === "INSERT") {
            const newPhone = (payload.new as PhoneEntry).phonenumber;
            setCurrentPhone(newPhone);
          }
          // Invalidate and refetch when data changes
          queryClient.invalidateQueries({ queryKey: ["phone-history"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Add new phone number to history
  useEffect(() => {
    const addPhoneNumber = async () => {
      const phoneFromUrl = searchParams.get("PhoneID");
      if (phoneFromUrl && phoneFromUrl !== currentPhone) {
        const { error } = await supabase.from("phone_history").insert([
          {
            phonenumber: phoneFromUrl,
            timestamp: new Date().toISOString(),
          },
        ]);

        if (error) {
          toast.error("Failed to add phone number to history");
        } else {
          setCurrentPhone(phoneFromUrl);
        }
      }
    };

    addPhoneNumber();
  }, [searchParams, currentPhone]);

  return (
    <div className="min-h-screen bg-background">
      <PhoneHero phoneNumber={currentPhone} />
      <PhoneHistory history={history} />
    </div>
  );
};

export default Index;