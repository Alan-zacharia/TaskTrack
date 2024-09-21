import React from "react";

const Statistics = () => {
  return (
    <section className="flex flex-col  justify-center gap-5">
      <div className="flex justify-center gap-5">
        <h1 className="text-black text-left">Statistics</h1>
      </div>
      <div className="w-[50%] h-20 flex mx-auto bg-white rounded-lg"></div>
      <div className="flex justify-center gap-5">
        <div className="w-[460px] h-[300px] bg-white  rounded-lg"></div>
        <div className="w-[460px] h-[300px] bg-white  rounded-lg"></div>
      </div>
    </section>
  );
};

export default Statistics;
