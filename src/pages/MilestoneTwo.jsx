import React from "react";
import { GreetingCard } from "../components/Card/GreetingCard";
import { TwoColumnsWithImage } from "../components/Card/GoalAndPurpose";
import { TwoColoredColumnsWithImage } from "../components/Card/TwoColoredColumnsWithImage"; // Adjust the import path as necessary
import { ImageAndTwoRows } from "../components/Card/ImageAndTwoRows";


export const MilestoneTwo = () => {
  const nextSlide = () => {
    console.log("Moving to the next slide");
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
      <div className="container">
        {/* Greeting Card */}
        <GreetingCard
          title="Welcome to Milestone 2"
          image="https://placehold.co/600x400"
          btnText="Click Here To Enter Journey"
        />

        {/* Two Columns With Image */}
        <TwoColumnsWithImage
          title="MILESTONE 2: THE GOAL AND PURPOSE"
          description="Get the skills to make your dreams come true! Learn how to turn big goals into easy steps so you can reach success one step at a time!"
          rightColumnText="This month, we’re focusing on how to reach your goals. Every big achievement starts with a plan, and we're going to show you how to make one with 
          SMART goals. Get ready to build skills that will keep you on track and lead you straight to success!"
          image={"../assets/20point.PNG"}
          altText="20 point image"
        />

        {/* Two Colored Columns With Image */}
        <TwoColoredColumnsWithImage
          title="PERSONAL CORE VALUE STATEMENT"
          blueColumnText="A Personal Core Value is something that really matters to you. It’s like a personal guide that shapes how you act, make choices, and treat others. For example, if honesty is one of your values, telling the truth is important to you, and you’ll try to be truthful in everything you do. Values help define who you are and who you want to become."
          whiteColumnTitle="THINK ABOUT WHAT MATTERS MOST TO YOU"
          whiteColumnList={[
            "What qualities do you admire in other people?",
            "What beliefs or ideas are most important to you?",
            "When do you feel happiest and proud of yourself?",
          ]}
          instructions="Now, write down 10-15 values that really matter to you, like honesty, kindness, or creativity. Then, narrow it down to your top 5 core values – these are the ones that guide what you do every day!"
          image={"../assets/leep.png"}
          buttonText="CLICK TO MOVE FORWARD"
          onButtonClick={nextSlide}
        />

        {/* Image and Two Rows Component */}
        <ImageAndTwoRows
          image={"../assets/milestoneImage.png"}
          altText="Milestone"
          firstRowText="Create Your Academic SMART GOAL"
          firstRowAction={() => console.log("Navigating to Slide 10")}
          secondRowText="Create Your Personal SMART GOAL"
          secondRowAction={() => console.log("Navigating to Slide 13")}
        />
      </div>
    </div>
  );
};