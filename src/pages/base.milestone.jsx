import React from "react";
import { useParams } from "react-router-dom";
import MilestoneOne from "./Milestone_One";
import { MilestoneTwo } from "./MilestoneTwo";
import { MilestoneThree } from "./MilestoneThree";
import NotFound from "./not.found";

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
      return <NotFound />;
  }
};

export default BaseMilestone;
