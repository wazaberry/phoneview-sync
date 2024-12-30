import React from "react";

interface PhoneHeroProps {
  phoneNumber: string | null;
}

const PhoneHero: React.FC<PhoneHeroProps> = ({ phoneNumber }) => {
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {phoneNumber ? formatPhoneNumber(phoneNumber) : "No Phone Number"}
        </h1>
        <p className="text-white/80">
          Enter a phone number in the URL using ?PhoneID=1234567890
        </p>
      </div>
    </div>
  );
};

export default PhoneHero;