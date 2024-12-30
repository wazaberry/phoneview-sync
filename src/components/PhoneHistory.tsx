import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PhoneEntry {
  id: number;
  phoneNumber: string;
  timestamp: string;
}

interface PhoneHistoryProps {
  history: PhoneEntry[];
}

const PhoneHistory: React.FC<PhoneHistoryProps> = ({ history }) => {
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6">Phone Number History</h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Phone Number</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((entry) => (
              <TableRow key={entry.id} className="animate-fade-in">
                <TableCell className="font-medium">
                  {formatPhoneNumber(entry.phoneNumber)}
                </TableCell>
                <TableCell>
                  {new Date(entry.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PhoneHistory;