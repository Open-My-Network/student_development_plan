import React from "react";

export const GreetingCard = ({ title, image, path, description, btnText }) => {
  const handleButtonClick = () => {};
  return (
    <div className="card">
      <div className="row ">
        <div className="col-lg-5 col-md-5 col-sm-12 mb-3 mb-md-0 p-5">
          <p className="h2 text-dark">{title}</p>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button className="btn btn-success" onClick={handleButtonClick}>
            {btnText}
          </button>
        </div>
        <div className="col-md-7 col-lg-7 col-sm-12">
          <img src={image} className="img-fluid w-100 rounded-lg" alt={title} />
        </div>
      </div>
    </div>
  );
};
