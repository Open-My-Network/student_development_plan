import slide1 from "../assets/1.png";
import slide2 from "../assets/2.png";
import slide3 from "../assets/3.png";
import { MyButton } from "../components/Button";


export const slides = [
  {
    id: 1,
    title: "LEEP 9th GRADE STUDENT DEVELOPMENT PLAN",
    Button: "CLICK HERE TO ENTER THE JOURNEY",
    image: slide1,
  },
  {
    id: 2,
    title: "",
    description:
      "Welcome to LEEP’s 9th Grade Development Plans! Get ready for an awesome journey built just for you. We’ll give you the tools, skills, and a simple plan to help you reach your goals in school and in life. This is your first step toward making your dreams real, and we’re here to help you the whole way. Let’s get started and make it happen!",
    image: slide2,
    animation: "flyInFromTop 2s ease-in-out",
    
  },
  {
    id: 3,
    title: "",
    description:
      "The development process starts with you! You know your interests, skills, and goals best. By understanding what's important to you, you can take control of your future and choose options that fit your priorities.",
    image: slide3,
    animation: "fadeIn 2.5s ease-in-out",
    
  },
  {
    id: 4,
    customContent: true,
  },
  {
    id: 5, // New slide with questions grid
    questions: true,
  },
  {
    id: 6, // LEEP Logo Slide
    logoSlide: true,
  },
  {
    id: 7, // New Milestone Slide
    milestoneSlide: true,
  },
  {
    id: 8, // New "Welcome to Milestone 1" Slide
    milestoneWelcome: true,
  },
  {
    id: 9, // New slide with 2 columns and an image
    twoColumnsWithImage: true,
  },
  {
    id: 10, // New slide with image on the left and two rows on the right
    imageAndTwoRows: true,
  },
  {
    id: 11, // New Slide with Two Colored Columns and Information
    twoColoredColumnsWithImage: true,
  },
  {
    id: 12, // New Slide with Table of Sample Values
    tableSlide: true,
  },
  {
    id: 13, // New Slide with Two Columns and Image
    personalMissionStatement: true,
  },
  {
    id: 14,
    title: "", // Will be dynamically set
    description: "", // Will be dynamically set
    Missionform: true,
    dynamicContent: true, // Indicates this slide has dynamic content
  },
  {
    id: 15,
    title: "Values You Submitted",
    description: "", // Dynamically fetched content will go here
    apiContent: true, // Indicates this slide fetches data from an API
  },
  {
    id: 16,
    title: "NEXT STOP ON THE JOURNEY… MILESTONE 2 ",
    description: `
        CONGRATS, NAME OF STUDENT! You've crushed this milestone and earned your LEEP points, bringing you one step closer to reaching your NorthStar goal! 
        Keep that energy going – you’re on the path to greatness!`,
    cta: true,
  },
  // {
  //   id: 16,
  //   apiSlide: true,
  // },
  // {
  //   id: 17, // New slide ID
  //   formWithFields: true, // Custom flag for the form slide
  // },
];
