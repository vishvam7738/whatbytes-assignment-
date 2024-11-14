"use client";
import React, { useState, useEffect } from "react";
import PercentileComparisonChart from "../PercentileComp";
import DoughnutChart from "../DoughnutChart";
import UpdateForm from "../UpdateForm/page";
import { percentilesData } from "../usersData";
import chroma from "chroma-js";

export default function MainPage() {
  const [updated, setUpdated] = useState(false);
  const [details, setDetails] = useState({
    rank: 1,
    percentile: 30,
    currentScore: 10,
  });
  const [avgPercentile, setAvgPercentile] = useState(72);

  const calculateAveragePercentile = (data) => {
    let totalPercentile = 0;
    let totalUsers = 0;
    data.forEach(({ percentile, usersCount }) => {
      totalPercentile += percentile * usersCount;
      totalUsers += usersCount;
    });
    const res = totalUsers === 0 ? 0 : totalPercentile / totalUsers;
    setAvgPercentile(Math.round(res * 10) / 10);
  };

  useEffect(() => {
    calculateAveragePercentile(percentilesData);
  }, [percentilesData, details]);

  const syllabus = [
    {
      title: "HTML tools, Forms, History",
      percentage: "80%",
      color: "rgb(37 99 235)",
    },
    {
      title: "Tags & References in HTML",
      percentage: "60%",
      color: "rgb(249 115 22)",
    },
    {
      title: "Tables & References in HTML",
      percentage: "24%",
      color: "rgb(239 68 68)",
    },
    {
      title: "Tables & CSS Basics",
      percentage: "96%",
      color: "rgb(22 163 74)",
    },
  ];

  return (
    <div className="p-[35px] pt-[25px] border-l-[1px]">
      <h1 className="font-bold text-xl">Skill Test</h1>
      <div className="flex max-[678px]:flex-col">
        <div className="left-part mr-5">
          <div className="assignment-details py-3 ">
            <div className="border-[1px] rounded-md p-3 flex">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEc9A_S6BPxCDRp5WjMFEfXrpCu1ya2OO-Lw&s"
                className="h-[40px] mr-3"
              />
              <div className="">
                <h1 className="font-bold">Hyper Text Markup Language</h1>
                <p className="mr-8 text-gray-600">
                  Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
                </p>
              </div>
              <button
                onClick={() => setUpdated(true)}
                className="bg-blue-900 hover:bg-blue-700 rounded-lg text-white py-2 px-5 mt-2 border-2 border-black"
              >
                Update
              </button>

              {updated && (
                <UpdateForm setUpdated={setUpdated} setDetails={setDetails} />
              )}
            </div>
          </div>

          <div className="statistics border-[1px] rounded-md p-2 pl-4 mb-4 min-h-[120px]">
            <h1 className="font-bold">Quick Statistics</h1>
            <div className="flex">
              <div className="flex items-center border-r-[1px] w-[14vw] py-2 max-[678px]:w-[25vw]">
                <div className="h-[40px] w-[40px] rounded-full bg-gray-100 flex items-center justify-center mx-5">
                  <img
                    src="/trophy.png"
                    alt="rank-icon"
                    className="h-[20px] w-[20px]"
                  />
                </div>

                <div>
                  <h1 className="font-bold text-[18px]">{details.rank}</h1>
                  <p className="text-[12px] text-gray-500">YOUR RANK</p>
                </div>
              </div>
              <div className="flex items-center border-r-[1px] w-[16vw] py-2 max-[678px]:w-[25vw]">
                <div className="h-[40px] w-[40px] rounded-full bg-gray-100 flex items-center justify-center mx-5">
                  <img
                    src="/clipboard.png"
                    alt="rank-icon"
                    className="h-[20px] w-[17px]"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-[18px]">
                    {details.percentile}%
                  </h1>
                  <p className="text-[12px] text-gray-500">PERCENTILE</p>
                </div>
              </div>
              <div className="flex items-center w-[16vw] py-2 max-[678px]:w-[30vw]">
                <div className="h-[40px] w-[40px] rounded-full bg-gray-100 flex items-center justify-center mx-5">
                  <img
                    src="/check.png"
                    alt="rank-icon"
                    className="h-[42px] w-[30px]"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-[18px]">
                    {details.currentScore}/15
                  </h1>
                  <p className="text-[12px] text-gray-500">CORRECT ANSWERS</p>
                </div>
              </div>
            </div>
          </div>

          <div className="comparison-graph border-[1px] h-[34.5vw] rounded-md p-6 max-[678px]:h-[40vh] relative">
            <h1 className="font-bold">Comparison Graph</h1>
            <div className="text-md py-4 text-gray-600">
              <span className="font-bold">
                You scored {details.percentile}% percentile
              </span>{" "}
              which is{" "}
              {details.percentile >= avgPercentile ? "higher" : "lower"} than
              the average percentile {avgPercentile} of all the engineers who
              took this assessment
            </div>
            <PercentileComparisonChart
              userPercentile={Number(details.percentile)}
            />
            <div className="absolute top-8 right-4 h-[40px] w-[40px] rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-lg">📈</span>
            </div>
          </div>
        </div>

        <div className="right-part">
          <div className="syllabus-analysis border-[1px] p-6 rounded-md mt-3 max-[678px]:w-[90vw]">
            <h1 className="font-semibold text-lg">Syllabus Wise Analysis</h1>
            <div className="mt-4">
              {syllabus.map((item) => (
                <div className="item w-[23vw] mb-3 max-[678px]:w-[80vw]">
                  <h1 className="text-gray-600">{item.title}</h1>
                  <div className="flex items-center">
                    <div
                      className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-200"
                      style={{
                        backgroundColor: chroma(item.color).brighten(3).hex(), // Lighten the color
                      }}
                    >
                      <div
                        className={`bg-${item.color} h-2.5 rounded-full`}
                        style={{
                          width: item.percentage,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                    <p
                      className={`pl-6 text-${item.color} font-bold`}
                      style={{ color: item.color }}
                    >
                      {item.percentage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="question-analysis mt-3 border-[1px] rounded-md p-6">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-lg">Question Analysis</h1>
              <p className="text-blue-600 font-bold">10/15</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-md py-3 text-gray-600">
                <span className="font-bold">
                  You scored {details.currentScore} question out of 15.{" "}
                </span>
                However, it still needs some improvements.
              </div>

              <div className="pie-chart h-[25vh]">
                <DoughnutChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
