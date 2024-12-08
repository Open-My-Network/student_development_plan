import React, { useState, useEffect } from "react";
import "./App.css";

// Import your images
import slide1 from "./5.png";
import slide2 from "./2.png";
import slide3 from "./3.png";
import slide6 from "./leep.png"; // LEEP logo image
import slide7 from "./1.png";
import slide9 from "./20point.PNG"; // Image for "20 LEEP Points"
import milestoneImage from "./1.png"; // Image for the milestone slide
import leapPointsImage from "./10point.png"; // Image for "10 LEEP Points"


const slides = [
  {
    id: 1,
    title: "LEEP 9th GRADE STUDENT DEVELOPMENT PLAN",
    description: "CLICK HERE TO ENTER THE JOURNEY",
    image: slide1,
  },
  {
    id: 2,
    title: "",
    description:
      "Welcome to LEEP’s 9th Grade Development Plans! Get ready for an awesome journey built just for you. We’ll give you the tools, skills, and a simple plan to help you reach your goals in school and in life. This is your first step toward making your dreams real, and we’re here to help you the whole way. Let’s get started and make it happen!",
    image: slide2,
  },
  {
    id: 3,
    title: "",
    description:
      "The development process starts with you! You know your interests, skills, and goals best. By understanding what's important to you, you can take control of your future and choose options that fit your priorities.",
    image: slide3,
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
    id: 13,
    title: "Personal Mission Statement",
    description: `
      Create a Personal Mission Statement: "My mission is to always be true to myself, stay curious, and be kind to others. 
      I want to keep learning, follow my passions, and use my strengths to make a difference in the world, no matter how big or small."`,
    form: true,
  },
  {
    id: 14, // New Slide with Two Columns and Image
    personalMissionStatement: true,
  },
  {
    id: 15,
    title: "NEXT STOP ON THE JOURNEY… MILESTONE 2 ",
    description: `
      CONGRATS, NAME OF STUDENT! You've crushed this milestone and earned your LEEP points, bringing you one step closer to reaching your NorthStar goal! 
      Keep that energy going – you’re on the path to greatness!`,
    cta: true,
  },
  {
    id: 16,
    apiSlide: true,
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [apiData, setApiData] = useState(null);
  const [hasFetchedData, setHasFetchedData] = useState(false); // Track if data is already fetched
  const [posts, setPosts] = useState([]); // Store new posts

  // Load API data when API slide is active (if not already fetched)
  useEffect(() => {
    if (slides[currentSlide].apiSlide && !hasFetchedData) {
      fetchApiData();
    }
  }, [currentSlide]);

  const fetchApiData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/"
      );
      const data = await response.json();
      setApiData(data);
      setHasFetchedData(true);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel">
      <div className="slide">
        {slides[currentSlide].customContent ? (
          <div className="slide-container">
            <div className="slide-header">
              <h1>Your NorthStar Goal is the ULTIMATE GOAL you want to accomplish by the end of high school.</h1>
            </div>
            <div className="slide-content">
              <div className="goal-box short-term">
                <h2>“Current Grade” NorthStar Goal <span>(Short-Term)</span></h2>
                <p>
                  This goal is all about staying on track and doing your best in your current grade. 
                  It focuses on your schoolwork, personal growth, and activities that will help you succeed this year.
                </p>
              </div>
              <div className="goal-box long-term">
                <h2>“Graduation” NorthStar Goal <span>(Long-Term)</span></h2>
                <p>
                  This is your big dream for when you finish school. It’s the goal you're aiming for, 
                  with steps you take now and later to help you reach it and succeed.
                </p>
              </div>
            </div>
            <div className="slide-footer">
              <p>
                Once you set your goals, think about the steps that will help you get there. These steps could be going to a 
                LEEP workshop, studying on your own, doing special projects, or completing assignments that help you grow.
              </p>
              <button className="cta-button">CLICK TO MOVE FORWARD ON YOUR JOURNEY</button>
            </div>
          </div>
        ) : slides[currentSlide].questions ? (
          <div className="styled-table-slide">
            <div className="table-header">
              <h2>CONSIDER THE FOLLOWING QUESTIONS TO ASK YOURSELF ON THIS JOURNEY</h2>
            </div>
            <table className="styled-table">
              <tbody>
                <tr>
                  <td>How will this goal help me reach my big goal for this grade and my future?</td>
                  <td>What worked well and what could I improve on?</td>
                  <td>What challenges could I face trying to achieve this milestone goal and how can I overcome them?</td>
                </tr>
                <tr>
                  <td>How do I plan to track my progress during this milestone?</td>
                  <td>What tasks do I need to finish? Do I have a clear plan and timeline to reach my goals?</td>
                  <td>Who can give me helpful advice, and how do I use that advice to improve?</td>
                </tr>
              </tbody>
            </table>
            <button className="cta-button">CLICK TO MOVE FORWARD ON YOUR JOURNEY</button>
          </div>
        ) : slides[currentSlide].logoSlide ? (
          <div className="logo-slide">
            <img src={slide6} alt="LEEP Logo" className="centered-logo" />
          </div>
        ) : slides[currentSlide].milestoneSlide ? (
          <div className="milestone-slide">
            <div className="milestone-text">
              <h2>CLICK HERE</h2>
              <h2>AND</h2>
              <h2>TAKE ACTION</h2>
            </div>
            <div className="milestone-image">
              <img
                src={slide7}
                alt="Milestone 1"
                className="curved-image"
              />
            </div>
          </div>
        ) : slides[currentSlide].milestoneWelcome ? (
          <div className="milestone-welcome-slide">
            <h1 className="milestone-header">WELCOME TO MILESTONE 1</h1>
            <p className="milestone-description">
              Congrats on taking the LEEP and starting your awesome journey – this is just the beginning of something great!
            </p>
            <p className="milestone-cta">CLICK TO MOVE FORWARD ON YOUR JOURNEY</p>
          </div>
                ) : slides[currentSlide].twoColumnsWithImage ? (
          <div className="two-columns-with-image">
            <div className="columns">
              <div className="column column-left">
                <h2>MILESTONE 1: THE GOAL AND PURPOSE</h2>
                <p>
                  Establish meaningful, achievable goals for 9th Grade that will assist me with current and future success.
                </p>
              </div>
              <div className="column column-right">
                <p>
                  <strong>This month,</strong> we’re going to focus on setting your big "NorthStar Goal." As you work
                  toward your first milestone, you’ll create smaller goals to help you along the way. Here’s your first
                  step to reaching that next milestone!
                </p>
              </div>
            </div>
            <div className="image-section">
              <img src={slide9} alt="20 LEEP Points" />
            </div>
            <p className="cta-text">CLICK TO MOVE FORWARD ON YOUR JOURNEY</p>
          </div>
                ) : slides[currentSlide].twoColumnsWithImage ? (
                  <div className="two-columns-with-image">
                    <div className="columns">
                      <div className="column column-left">
                        <h2>MILESTONE 1: THE GOAL AND PURPOSE</h2>
                        <p>
                          Establish meaningful, achievable goals for 9th Grade that will assist me with current and future success.
                        </p>
                      </div>
                      <div className="column column-right">
                        <p>
                          <strong>This month,</strong> we’re going to focus on setting your big "NorthStar Goal." As you work
                          toward your first milestone, you’ll create smaller goals to help you along the way. Here’s your first
                          step to reaching that next milestone!
                        </p>
                      </div>
                    </div>
                    <div className="image-20point">
                      <img src={slide9} alt="20 LEEP Points"/>
                    </div>
                    <p className="cta-text">CLICK TO MOVE FORWARD ON YOUR JOURNEY</p>
                  </div>
        ) : slides[currentSlide].imageAndTwoRows ? (
          <div className="image-and-two-rows">
            <div className="image-milestone">
              <img src={milestoneImage} alt="Milestone" className="left-image" />
            </div>
            <div className="text-section">
              <div className="row row-blue">
                <h2>Create a Personal Core Value Statement</h2>
                <p>CLICK HERE</p>
              </div>
              <div className="row row-green">
                <h2>Create a Personal Mission Statement</h2>
                <p>CLICK HERE</p>
              </div>
            </div>
          </div>
        ) : slides[currentSlide].twoColoredColumnsWithImage ? (
          <div className="two-colored-columns-with-image">
            <h1 className="slide-title">PERSONAL CORE VALUE STATEMENT</h1>
            <div className="columns">
              <div className="column column-blue">
                <p>
                  A Personal Core Value is something that really matters to you.
                  It’s like a personal guide that shapes how you act, make
                  choices, and treat others. For example, if honesty is one of
                  your values, telling the truth is important to you, and
                  you’ll try to be truthful in everything you do. Values help
                  define who you are and who you want to become.
                </p>
              </div>
              <div className="column column-white">
                <h3>THINK ABOUT WHAT MATTERS MOST TO YOU</h3>
                <ol>
                  <li>What qualities do you admire in other people?</li>
                  <li>What beliefs or ideas are most important to you?</li>
                  <li>When do you feel happiest and proud of yourself?</li>
                </ol>
              </div>
            </div>
            <p className="instructions">
              Now, write down 10-15 values that really matter to you, like
              honesty, kindness, or creativity. Then, narrow it down to your
              top 5 core values – these are the ones that guide what you do
              every day!
            </p>
            <div className="image-10point">
              <img src={leapPointsImage} alt="10 LEEP Points" />
            </div>
            <p className="cta-text">Create a Personal Core Value Statement</p>
          </div>
        ) : slides[currentSlide].form ? (
          <div className="form-section">
            <h1>{slides[currentSlide].title}</h1>
            <p>{slides[currentSlide].description}</p>
            <textarea rows="5" placeholder="Write your statement here..."></textarea>
            <button className="submit-button">Submit</button>
          </div>
        ) : slides[currentSlide].cta ? (
          <div className="text-section">
            <h1>{slides[currentSlide].title}</h1>
            <p>{slides[currentSlide].description}</p>
            <button className="cta-button">CLICK TO MOVE FORWARD</button>
          </div>
        ): slides[currentSlide].tableSlide ? (
          <div className="table-slide2">
            <h1 className="table-title">SAMPLE VALUES TO GET GOING...</h1>
            <div className="table-container">
              <table>
                <tbody>
                  <tr>
                    <td><strong>Respect</strong> - Treating others kindly and valuing their differences</td>
                    <td><strong>Accountability</strong> - Taking responsibility for your actions</td>
                    <td><strong>Kindness</strong> - Being friendly, generous, and considerate to others</td>
                    <td><strong>Compassion</strong> - Wanting to help those who are struggling</td>
                    <td><strong>Optimism</strong> - Looking at situations with a positive outlook</td>
                  </tr>
                  <tr>
                    <td><strong>Integrity</strong> - Doing the right thing, even when no one is watching</td>
                    <td><strong>Honesty</strong> - Being truthful with yourself and others</td>
                    <td><strong>Open-Mindedness</strong> - Being willing to consider new ideas and perspectives</td>
                    <td><strong>Justice</strong> - Standing up for fairness and doing what’s right</td>
                    <td><strong>Growth</strong> - Always aiming to improve and learn</td>
                  </tr>
                  <tr>
                    <td><strong>Responsibility</strong> - Owning your actions and choices</td>
                    <td><strong>Creativity</strong> - Using imagination to think of new ideas</td>
                    <td><strong>Patience</strong> - Staying calm and persistent, even in challenging situations</td>
                    <td><strong>Courage</strong> - Being brave enough to face fears or try new things</td>
                    <td><strong>Focus</strong> - Concentrating on the task or goal at hand</td>
                  </tr>
                  <tr>
                    <td><strong>Perseverance</strong> - Sticking with something, even when it’s tough</td>
                    <td><strong>Gratitude</strong> - Appreciating what you have and showing thankfulness</td>
                    <td><strong>Leadership</strong> - Inspiring others and setting a good example</td>
                    <td><strong>Dedication</strong> - Putting in effort and commitment to reach goals</td>
                    <td><strong>Loyalty</strong> - Standing by friends, family, and commitments</td>
                  </tr>
                  <tr>
                    <td><strong>Empathy</strong> - Understanding and caring about how others feel</td>
                    <td><strong>Self-Discipline</strong> - Staying focused on goals and resisting distractions</td>
                    <td><strong>Resilience</strong> - Bouncing back from challenges or setbacks</td>
                    <td><strong>Adaptability</strong> - Being flexible and open to change</td>
                    <td><strong>Service</strong> - Helping others and contributing to your community</td>
                  </tr>
                  <tr>
                    <td><strong>Curiosity</strong> - Being eager to learn and explore new things</td>
                    <td><strong>Teamwork</strong> - Working well with others to achieve a common goal</td>
                    <td><strong>Humility</strong> - Recognizing that there’s always something new to learn</td>
                    <td><strong>Self-Respect</strong> - Valuing yourself and your abilities</td>
                    <td><strong>Ambition</strong> - Having strong goals and dreams for the future</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) 
       :slides[currentSlide].personalMissionStatement ? (
          <div className="personal-mission-slide">
            <h1 className="slide-title">PERSONAL MISSION STATEMENT</h1>
            <div className="columns">
              <div className="column column-green">
                <p>
                  A personal mission statement is like a life guide—a short sentence
                  or two that shows what matters most to you and how you want to live.
                  Think of it as your personal roadmap, helping you stay focused on
                  your goals and the kind of person you want to be. It’s there to help
                  you make choices and keep you on track toward the future you want.
                </p>
              </div>
              <div className="column column-white">
                <h3>THINK ABOUT WHAT MATTERS MOST TO YOU</h3>
                <ol>
                  <li>What do I care about the most?</li>
                  <li>What kind of person do I want to be?</li>
                  <li>How do I want to treat others?</li>
                  <li>What are my biggest goals or dreams for the future?</li>
                </ol>
              </div>
            </div>
            <p className="cta-text">Create a Personal Mission Statement</p>
            <div className="image-mission">
              <img src={leapPointsImage} alt="10 LEEP Points" />
            </div>
          </div>
        )

      : slides[currentSlide].apiSlide ? (
        <div className="api-slide">
          <h1>API Data</h1>
          <ul>
            {apiData?.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong> - Completed:{" "}
                {item.completed ? "Yes" : "No"}
              </li>
            ))}
          </ul>
        </div>
      ) 
        
      
        : (
          <>
            <div className="text-section">
              <h1>{slides[currentSlide].title}</h1>
              <p>{slides[currentSlide].description}</p>
            </div>
            <div className="image-section">
              {slides[currentSlide].image && (
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                />
              )}
            </div>
            
            
          </>
        )}
        
      </div>
    </div>
  );
  
}
export default App;
