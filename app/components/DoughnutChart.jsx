"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Custom plugin to add an image in the center
const centerImagePlugin = {
  id: "centerImage",
  beforeDraw: (chart) => {
    const { width, height, ctx } = chart;
    ctx.restore();

    // Create an image instance
    const img = new Image();
    img.src = "/bullseye.png"; // Replace with the path to your image

    // Adjust the size and position
    const imageSize = height / 5; // Set image size relative to chart height
    const xPos = (width - imageSize) / 2; // Center the image horizontally
    const yPos = (height - imageSize) / 2; // Center the image vertically

    // Draw the image once it’s fully loaded
    img.onload = () => {
      ctx.drawImage(img, xPos, yPos, imageSize, imageSize);
    };

    ctx.save();
  },
};

const DoughnutChart = () => {
  const data = {
    labels: ["Blue", "#808080"],
    datasets: [
      {
        label: "My First Dataset",
        data: [70, 30],
        backgroundColor: ["#2563eb", "#d7e7fc"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
      // Register the centerImagePlugin here
      centerImage: centerImagePlugin,
    },
    responsive: true,
  };

  return <Doughnut data={data} options={options} plugins={[centerImagePlugin]} />;
};

export default DoughnutChart;
