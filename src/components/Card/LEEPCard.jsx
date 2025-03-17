import React from "react";

import leepLogo from "../../assets/leep.png";

export const LEEPCard = () => {
  return (
    <div className="card">
      <img src={leepLogo} className="img-fluid w-100 rounded-lg" alt={leepLogo} />
    </div>
  );
};
