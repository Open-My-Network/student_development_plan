import React from "react";
import { GreetingCard } from "../components/Card/GreetingCard";
import { LEEPCard } from "../components/Card/LEEPCard";

export const MilestoneTwo = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
      <div className="container">
        <GreetingCard
          title="Welcome to Milestone 2"
          image="https://placehold.co/600x400"
          btnText="Click Here To Enter Journey"
        />
       
      </div>
    </div>
  );
};