import React, { useEffect, useState } from "react";
import TimeBackground from "../../components/timepage/TimeBackground";
import CreateButton from "../../components/common/CreateButton";
import PhotoList from "../../components/timepage/PhotoList";
import BestPhoto from "../../components/timepage/BestPhoto";
import trophy from "../../assets/icons/trophy.png";
import NavBar from "../../components/common/NavBar";

const TimePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date().getHours()); 

  useEffect(() => {
    setCurrentTime(new Date().getHours());
    console.log("현재 시간!", currentTime);
  }, []);

  return (
    <>
      <TimeBackground currentTime={currentTime} />
      {(currentTime >= 7 && currentTime < 10) || (currentTime >= 11 && currentTime < 14) || (currentTime >= 17 && currentTime < 20) ? (
        <div>
          <PhotoList />
          <CreateButton to="/time/upload" />
        </div>
      ) : (
        <div>
          <BestPhoto />
          <img src={trophy} alt="트로피" className="fixed bottom-[12vh] right-4 z-50 w-20 h-20" />
        </div>
      )}

      <NavBar />

    </>
  );
};

export default TimePage;