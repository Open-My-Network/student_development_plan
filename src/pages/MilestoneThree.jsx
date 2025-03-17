import React from "react";
import { GreetingCard } from "../components/Card/GreetingCard";

export const MilestoneThree = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="container">
        <GreetingCard
          title="Welcome to Milestone 3"
          image="https://placehold.co/600x400"
          btnText="Click Here and Take Action"
        />
      </div>
    </div>
  );
};
