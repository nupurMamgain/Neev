import React from "react";
import SignInCard from '../components/SignInCard';
import InfoCard from '../components/InfoCard';


const login = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <InfoCard />
      <SignInCard />
    </div>
  );
};

export default login;
