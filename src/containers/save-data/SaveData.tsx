import React, { useEffect, useState } from "react";
import "./SaveData.scss"

type SaveDataType = {
  isSaving: boolean;
  lastSaved: number;
};
const SaveData = ({ isSaving, lastSaved }: SaveDataType) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000 * 5);
    return () => {
      window.clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="save-data__wrapper">
      {isSaving ? (
        <div className="save-data__spinner">
          <div className="spinner"></div>
          <div>Saving</div>
        </div>
      ) : (
        <div>
          Last Saved{" "}
          {currentTime - lastSaved < 0 ? 0 : (currentTime - lastSaved) / 1000}s
          ago
        </div>
      )}
    </div>
  );
};

export default SaveData;
