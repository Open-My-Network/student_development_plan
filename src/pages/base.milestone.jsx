import React from "react";
import { useParams } from "react-router-dom";
import MilestoneOne from "./Milestone_One";
import { MilestoneTwo } from "./MilestoneTwo";
import { MilestoneThree } from "./MilestoneThree";

const BaseMilestone = () => {
  const { id } = useParams();

  switch (id) {
    case "one":
      return <MilestoneOne />;
    case "two":
      return <MilestoneTwo />;
    case "three":
      return <MilestoneThree />;
    default:
      return <div>Page not found</div>;
  }
};

export default BaseMilestone;
