import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PhoneHero from "@/components/PhoneHero";
import PhoneHistory from "@/components/PhoneHistory";
import { supabase } from "@/lib/supabase";

interface PhoneEntry {
  id: number;
  phoneNumber: string;
  timestamp: string;
}

const Index = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const phoneNumber = searchParams.get("PhoneID");

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
        () => {
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
      if (phoneNumber) {
        const { error } = await supabase.from("phone_history").insert([
          {
            phoneNumber,
            timestamp: new Date().toISOString(),
          },
        ]);

        if (error) {
          toast.error("Failed to add phone number to history");
        }
      }
    };

    addPhoneNumber();
  }, [phoneNumber]);

  return (
    <div className="min-h-screen bg-background">
      <PhoneHero phoneNumber={phoneNumber} />
      <PhoneHistory history={history} />
    </div>
  );
};

export default Index;