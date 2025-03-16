import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"
import "../App.css";

import {MyButton} from "../components/Button/index";
import { MyContainer } from "../components/Container";
import { LogoSlide } from "../components/Logo";
import Table from "../value/Table";
import EditPopup from "../EditPopup";
import { fetchData, deleteItem, markAsTop, unmarkAsTop,updateItem } from "../value/service/api";

// Import your images

import slide7 from "../assets/8.png";
import slide9 from "../assets/20point.PNG"; // Image for "20 LEEP Points"
import milestoneImage from "../assets/8.png"; // Image for the milestone slide
import leapPointsImage from "../assets/10point.png"; // Image for "10 LEEP Points"


import { slides } from "../utils/slide_items";
import { hover } from "@testing-library/user-event/dist/hover";

function MilestoneOne() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { width, height } = useWindowSize();
  const [statement, setStatement] = useState("");
  const [valueType, setValueType] = useState("");
  const [dynamicTitle, setDynamicTitle] = useState("");
  const [dynamicDescription, setDynamicDescription] = useState("");
  const [apiData, setApiData] = useState([]); // Store API data
  
  const [data, setData] = useState([]);
  const [frozenData, setFrozenData] = useState([]); // Frozen data state
  const [loading, setLoading] = useState(false);
  const userId = 645;

  const [editingItem, setEditingItem] = useState(null); // State for the item being edited

  // Fetch data when the component loads or slide changes
  useEffect(() => {
    const fetchDataForSlide = async () => {
      setLoading(true);
      const result = await fetchData(userId);
      //fetch marked items from local storage
      const savedFrozenData = JSON.parse(localStorage.getItem("frozenData")) || [];

      //Merge API data and frozenData to ensure consistency
      const updateData = result.items.map((item) => ({
        ...item,
        markAsValue: savedFrozenData.some((f) => f.id === item.id),
      }));
      setData(updateData);
      setFrozenData(savedFrozenData);
      setLoading(false);
    };

    fetchDataForSlide();
  }, [currentSlide, userId]);

  const handleDelete = async (itemId) => {
    setLoading(true);
    const success = await deleteItem(itemId, userId);
    if (success) {
      setData((prevData) => prevData.filter((item) => item.id !== itemId));
      setFrozenData((prevFrozen) => prevFrozen.filter((item) => item.id !== itemId));
      localStorage.setItem(
        "frozenData",
        JSON.stringify(frozenData.filter((item) => item.id !== itemId))
      );
    } else {
      console.error("Failed to delete the item");
    }
    setLoading(false);
  };

  // Handle marking an item as top
  // Handle marking an item as top
  const handleMarkAsTop = async (itemId) => {
    const isMarked = await markAsTop(itemId, userId);
    if (isMarked) {
      // Find the marked item in the current data
      const markedItem = data.find((item) => item.id === itemId);

      // Update frozenData and save it in localStorage
      const updatedFrozenData = [...frozenData, { ...markedItem, markAsValue: true }];
      setFrozenData(updatedFrozenData);
      localStorage.setItem("frozenData", JSON.stringify(updatedFrozenData));
    }
  };

 
  // Handle unmarking an item as top
  const handleUnmarkAsTop = async (itemId) => {
    const isUnmarked = await unmarkAsTop(itemId, userId);
    if (isUnmarked) {
      // Remove the item from frozenData and update localStorage
      const updatedFrozenData = frozenData.filter((item) => item.id !== itemId);
      setFrozenData(updatedFrozenData);
      localStorage.setItem("frozenData", JSON.stringify(updatedFrozenData));
    }
  };

  const handleSaveEdit = async (itemData) => {
    try {
      const response = await fetch("http://localhost:3001/development-plan/update-value", {
        method: "PUT",  // PUT request since you're updating the data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 645,  // Use the correct user_id
          item_id: itemData.id,  // Use item.id for item identification
          statement: itemData.statement,  // Edited statement
          value_type: itemData.value_type,  // Edited value_type
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Update successful:", data);
        // Optionally, update state to reflect the changes
        setData((prevData) =>
          prevData.map((item) =>
            item.id === itemData.id ? { ...item, ...itemData } : item
          )
        );
        setEditingItem(null); // Close the edit popup
      } else {
        console.error("Update failed:", data);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  

  const handleEditClick = (item) => {
    setEditingItem(item); // Open the popup with the selected item's data
  };
  

  // Combine frozen and main data (frozen data always on top)
  const combinedData = [...frozenData, ...data.filter((item) => !frozenData.some((f) => f.id === item.id))];
  

  // const [apiData, setApiData] = useState(null);
  // const [hasFetchedData, setHasFetchedData] = useState(false);
  // const [posts, setPosts] = useState([]); // Store new posts
  // const [loading, setLoading] = useState(false); // New state for loading indicator
  // const [error, setError] = useState(null); // New state for error handling
  // const [formData, setFormData] = useState({
  //   sdp_title: "",
  //   est_year: "",
  //   plan_mode: "",
  //   str_month: "",
  //   end_month: "",
  //   description: "",
  // });


  // const [successMessage, setSuccessMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  

  // const handleFormChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setSuccessMessage("");
  //   setErrorMessage("");

  //   try {
  //     const response = await fetch(
  //       "http://localhost:3001/development-plan/create-plan",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           sdp_title: formData.sdp_title,
  //           est_year: formData.est_year,
  //           plan_mode: formData.plan_mode,  
  //           str_month: formData.str_month,  
  //           end_month: formData.end_month,  
  //           description: formData.description,
  //         }),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setSuccessMessage("Plan successfully created!");
  //     setFormData({
  //       sdp_title: "",
  //       est_year: "",
  //       plan_mode: "",
  //       str_month: "",
  //       end_month: "",
  //       description: "",
  //     });
  //     console.log("Form submitted successfully:", data);
  //   } catch (error) {
  //     setErrorMessage("Failed to create the plan. Please try again.");
  //     console.error("Error submitting the form:", error);
  //   } finally {
  //     setLoading(false); // Stop loading indicator
  //   }
  // };
  ///submitting the mission statement

  // // Load API data when API slide is active (if not already fetched)
  // useEffect(() => {
  //   if (slides[currentSlide].apiSlide && !hasFetchedData) {
  //     fetchApiData();
  //   }
  // }, [currentSlide]);

  // const fetchApiData = async () => {
  //   setLoading(true); // Start loading indicator
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3001/development-plan?page=1&limit=25"
  //     );
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     const data = await response.json();
  
  //     // Update state with the fetched data
  //     setApiData(data.data); // Assuming the API response has a `data` field for the list
  //     setHasFetchedData(true);
  //   } catch (error) {
  //     console.error("Error fetching API data:", error);
  //   }finally {
  //     setLoading(false); // Stop loading
  //   }
  // };
  

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
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    // Check if the current slide has dynamic content
    if (slides[currentSlide]?.dynamicContent) {
      // Automatically set valueType to "Personal Mission Statement" if the slide is Missionform
      if (slides[currentSlide]?.Missionform) {
        setValueType("Personal Mission Statement");
      }
      if (slides[currentSlide]?.Personalform) {
        setValueType("Personal Core Value");
      }
      
      // Set dynamic title and description based on the valueType
      if (slides[currentSlide]?.name === "personalform") {
        setDynamicTitle("Sample Core Value Statement");
        setDynamicDescription(
          `Create a Core Value Statement: "My personal values are honesty, kindness, and determination. I believe in always telling the truth, treating others with respect, 
          and never giving up, even when things get tough. These values help me be the best version of myself and guide me toward my goals."`
        );
      } else if (valueType === "Personal Mission Statement") {
        setDynamicTitle("Personal Mission Statement");
        setDynamicDescription(
          `Create a Personal Mission Statement: "My mission is to always be true to myself, stay curious, and be kind to others. 
          I want to keep learning, follow my passions, and use my strengths to make a difference in the world, no matter how big or small."`
        );
      } else if (valueType === "Personal Core Value") {
        setDynamicTitle("Sample Core Value Statement");
        setDynamicDescription(
          `Create a Core Value Statement: "My personal values are honesty, kindness, and determination. I believe in always telling the truth, treating others with respect, 
          and never giving up, even when things get tough. These values help me be the best version of myself and guide me toward my goals."`
        );
      }
    }
  }, [valueType, currentSlide]);
  

  const handleSubmit = async () => {
      // Validation: Ensure both fields are filled out
  if (!statement.trim()) {
    alert("Please enter your statement.");
    return;
  }

  if (!valueType) {
    alert("Please select a value type.");
    return;
  }
    try {
      const response = await fetch("http://localhost:3001/development-plan/create-value", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
        statement,
        value_type: valueType,
        user_id:645, 
      }), // Send the user's input statement
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      setStatement(""); // Clear the textarea after submitting
      setValueType(""); // Clear the value type after submitting
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="carousel">
      {(currentSlide === 0 || currentSlide === 7) && (
        <Confetti width={width} height={height} />
      )}
      <div className="slide">
      {slides[currentSlide].customContent ? (
          <div className="slide-container">
          <div className="slide-header">
            <h1>
              Your NorthStar Goal is the ULTIMATE GOAL you want to accomplish by the
              end of high school.
            </h1>
          </div>
          <div className="slide-content">
            <div className="goal-box short-term">
              <h2>
                “Current Grade” NorthStar Goal <span>(Short-Term)</span>
              </h2>
              <p>
                This goal is all about staying on track and doing your best in your
                current grade. It focuses on your schoolwork, personal growth, and
                activities that will help you succeed this year.
              </p>
            </div>
            <div className="goal-box long-term">
              <h2>
                “Graduation” NorthStar Goal <span>(Long-Term)</span>
              </h2>
              <p>
                This is your big dream for when you finish school. It’s the goal
                you're aiming for, with steps you take now and later to help you
                reach it and succeed.
              </p>
            </div>
          </div>
          <div className="slide-footer">
            <p>
              Once you set your goals, think about the steps that will help you get
              there. These steps could be going to a LEEP workshop, studying on your
              own, doing special projects, or completing assignments that help you
              grow.
            </p>
            <MyButton onClick={nextSlide}>CLICK TO MOVE FORWARD ON YOUR JOURNEY</MyButton>
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
            <MyButton onClick={nextSlide} style={{ backgroundColor: "#32cd32", color: "white" }}>CLICK TO MOVE FORWARD ON YOUR JOURNEY</MyButton>
          </div>
        ) : slides[currentSlide].logoSlide ? (
          <LogoSlide/>
        ) : slides[currentSlide].milestoneSlide ? (
          <div className="milestone-slide">
            <MyButton onClick={nextSlide} style={{ backgroundColor: "transparent", hover:"none" }}> 
              <div className="milestone-text">
                <h2>CLICK HERE</h2>
                <h2>AND</h2>
                <h2>TAKE ACTION</h2>
              </div>
            </MyButton>
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
            <MyButton onClick={nextSlide} style={{ backgroundColor: "transparent", hover:"none" }}>
              <p className="milestone-cta">CLICK TO MOVE FORWARD ON YOUR JOURNEY</p>
            </MyButton>
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
            <div className="image-journey">
              <img src={slide9} alt="20 LEEP Points" />
            </div>
            <MyButton onClick={nextSlide} style={{ backgroundColor: "transparent", hover:"none" }}>
              <p className="cta-text">CLICK TO MOVE FORWARD ON YOUR JOURNEY</p>
            </MyButton>  
          </div>
        ) : slides[currentSlide].imageAndTwoRows ? (
          <div className="image-and-two-rows">
            <div className="image-milestone">
              <img src={milestoneImage} alt="Milestone" className="left-image" />
            </div>
            <div className="text-section">
              <div className="row row-blue">
                <h2>Create a Personal Core Value Statement</h2>
                <p className="click-here" onClick={() => setCurrentSlide(10)}>CLICK HERE</p>
              </div>
              <div className="row row-green">
                <h2>Create a Personal Mission Statement</h2>
                <p className="click-here" onClick={() => setCurrentSlide(13)}>CLICK HERE</p>
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
            <MyButton onClick={nextSlide} className="mission-button">CLICK TO MOVE FORWARD</MyButton> 
          </div>
        ) : slides[currentSlide].cta ? (
          <div className="cta-section">
            <div className="text-section">
              <h1>{slides[currentSlide].title}</h1>
              <p>{slides[currentSlide].description}</p>
              <MyButton onClick={nextSlide} className="cta-button">CLICK TO MOVE FORWARD</MyButton>
            </div>
            
            {currentSlide === 15 && (
              <div className="confetti-wrapper">
                {Array.from({ length: 50 }).map((_, index) => (
                  <div
                    key={index}
                    className="confetti"
                    style={{
                      left: `${Math.random() * 100}vw`,
                      top: `${Math.random() * 100}vh`,
                      backgroundColor: ['#ff6f61', '#ffc107', '#00c853', '#0288d1'][Math.floor(Math.random() * 4)],
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : slides[currentSlide].Missionform ? (
          <div className="form-section">
            <h1>{dynamicTitle || slides[currentSlide]?.title}</h1>
            <p>{dynamicDescription || slides[currentSlide]?.description}</p>
            <textarea rows="5"
              placeholder="Write your statement here..."
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
            />
          {/* Dropdown for Value Type */}
          <select
            value={valueType}
            onChange={(e) => {
              const selectedType = e.target.value;
              setValueType(selectedType);
            }}
          >
            <option value="">Select a Value Type</option>
            <option value="Personal Mission Statement">Personal Mission Statement</option>
            <option value="Personal Core Value">Personal Core Value</option>
          </select>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
                  ) : slides[currentSlide].Personalform ? (
                    <div className="form-section">
                      <h1>{dynamicTitle || slides[currentSlide]?.title}</h1>
                      <p>{dynamicDescription || slides[currentSlide]?.description}</p>
                      <textarea rows="5"
                        placeholder="Write your statement here..."
                        value={statement}
                        onChange={(e) => setStatement(e.target.value)}
                      />
                    {/* Dropdown for Value Type */}
                    <select
                      value={valueType}
                      onChange={(e) => {
                        const selectedType = e.target.value;
                        setValueType(selectedType);
                      }}
                    >
                      <option value="">Select a Value Type</option>
                      <option value="Personal Mission Statement">Personal Mission Statement</option>
                      <option value="Personal Core Value">Personal Core Value</option>
                    </select>
                      <button className="submit-button" onClick={handleSubmit}>
                        Submit
                      </button>
                    </div>
          ) : slides[currentSlide].apiContent ? (
            <div className="api-slide">
              <h1>{slides[currentSlide].title}</h1>
              <div className="scrollable-container">
                <tbody>
                  <Table
                  data={combinedData}
                  handleDelete={handleDelete}
                  handleMarkAsTop={handleMarkAsTop}
                  handleUnmarkAsTop={handleUnmarkAsTop}
                  handleEditClick={handleEditClick}
                  />
                  {editingItem && (
                    <EditPopup
                      item={editingItem}
                      onSubmit={handleSaveEdit}
                      onCancel={() => setEditingItem(null)}
                    />
                  )}
                  </tbody>
                </div>
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
            <p        
              className="cta-text"
              onClick={() => {
                setValueType("Personal Mission Statement"); // Automatically select "Personal Core Value"
              }}
            >
              <MyButton onClick={nextSlide} className="mission-button">Create a Personal Mission Statement</MyButton>
            </p>
            <div className="image-10point">
              <img src={leapPointsImage} alt="10 LEEP Points" />
            </div>
          </div>
        )

      //   : slides[currentSlide].apiSlide ? (
      //     <div className="api-slide">
      //       <h1>API Data</h1>
      //       {loading && <p>Loading data...</p>}
      //       {apiData?.length > 0 ? (
      //         <ul>
      //           {apiData.map((item) => (
      //             console.log(item),
      //             <li key={item.id}>
      //               <strong>{item.sdp_title}</strong> - estimatedTime: {item.est_year} - Plan Mode: {item.plan_mode} - starting Month: {item.str_month} - End Month: {item.end_month} - Description: {item.description}
      //             </li>
      //           ))}
      //         </ul>
      //       ) : (
      //         <p>No data available.</p>
      //       )}
      //     </div>
      //   )
      // // Form Creation
      // : slides[currentSlide].formWithFields ? (
      //   <div className="custom-form-slide">
      //     <h1 className="slide-title">CREATE YOUR PLAN</h1>
      //     <div className="columns">
      //       <div className="column column-green">
      //         <p>
      //           Planning is an essential step to turn your goals into actionable steps. Use this form to define the key elements of your plan. Provide details about what you want to achieve, the time it will take, and any additional descriptions to ensure clarity and focus.
      //         </p>
      //       </div>
      //       <div className="column column-white">
      //         <form className="plan-form" onSubmit={handleFormSubmit}>
      //           <div className="form-group">
      //             <label htmlFor="title">Title:</label>
      //             <input type="text" id="title" name="sdp_title" value={formData.sdp_title} onChange={handleFormChange} placeholder="Enter Title" required />
      //           </div>
      //           <div className="form-group">
      //             <label htmlFor="estimatedYear">Estimated Year:</label>
      //             <input type="text" id="estimatedYear" name="est_year" value={formData.est_year} onChange={handleFormChange} placeholder="Enter Estimated Year" required />
      //           </div>
      //           <div className="form-group">
      //             <label htmlFor="planMode">Plan Mode:</label>
      //             <input type="text" id="planMode" name="plan_mode" value={formData.plan_mode} onChange={handleFormChange} placeholder="Enter Estimated Time" required />
      //           </div>
      //           <div className="form-group">
      //             <label htmlFor="startMonth">Start Month:</label>
      //             <input type="text" id="startMonth" name="str_month" value={formData.str_month} onChange={handleFormChange} placeholder="Enter Estimated Start Time" required />
      //           </div>
      //           <div className="form-group">
      //             <label htmlFor="endMonth">End Month:</label>
      //             <input type="text" id="endMonth" name="end_month" value={formData.end_month} onChange={handleFormChange} placeholder="Enter Estimated End Time" required />
      //           </div>
      //           <div className="form-group">
      //             <label htmlFor="description">Description:</label>
      //             <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleFormChange} placeholder="Enter Additional Description"></textarea>
      //           </div>
      //           <button type="submit" className="submit-button">Submit</button>
      //         </form>
      //         {loading && <p>Loading...</p>}
      //         {successMessage && (
      //             <p className="success-message">{successMessage}</p>
      //           )}
      //           {errorMessage && (
      //             <p className="error-message">{errorMessage}</p>
      //           )}
      //       </div>
      //     </div>
      //   </div>
      // )
        : (
          <>
            <div className="text-section" style={{ animation: slides[currentSlide].animation }}>
              <h1>{slides[currentSlide].title}</h1>
              <p>{slides[currentSlide].description}</p>
              {currentSlide === 0 && slides[currentSlide].Button && ( // Render button only on the first slide
                  <MyButton onClick={nextSlide}>{slides[currentSlide].Button}</MyButton>
              )}
            </div>
            <div className="image-section">
              {slides[currentSlide].image && (
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  style={{ animation: slides[currentSlide].animation }}
                />
              )}
            </div>
            
            
          </>
        )
        }
        
      </div>
    </div>
  );
  
}
export default MilestoneOne;
