"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  useGetAllUserForAnalyticsQuery,
  useGetAlPremiumUserForAnalyticsQuery,
} from "@/src/redux/features/adminManagement/manageUserApi";
import {
  useGetAllDislikesQuery,
  useGetAllLikesQuery,
} from "@/src/redux/features/adminManagement/manageReactsApi";
import {
  useGetAllPostsNormalForAnalyticsQuery,
  useGetAllPostsPremiumForAnalyticsQuery,
} from "@/src/redux/features/adminManagement/managePostApi";
import {
  FaMoneyBillWave,
  FaUserShield,
  FaUsers,
  FaThumbsUp,
  FaThumbsDown,
  FaCrown,
  FaRegNewspaper,
} from "react-icons/fa";
import { useGetAllPaymentsDatForAnalyticsQuery } from "@/src/redux/features/adminManagement/payment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SocialMediaAnalytics() {
  // Fetch all the required data using the queries
  const { data: paymentsData, isLoading: loadingPayments } =
    useGetAllPaymentsDatForAnalyticsQuery(undefined);
  const { data: premiumUsersData, isLoading: loadingPremiumUsers } =
    useGetAlPremiumUserForAnalyticsQuery(undefined);
  const { data: allUsersData, isLoading: loadingAllUsers } =
    useGetAllUserForAnalyticsQuery(undefined);
  const { data: likesData, isLoading: loadingLikes } =
    useGetAllLikesQuery(undefined);
  const { data: dislikesData, isLoading: loadingDislikes } =
    useGetAllDislikesQuery(undefined);
  const { data: premiumPostsData, isLoading: loadingPremiumPosts } =
    useGetAllPostsPremiumForAnalyticsQuery(undefined);
  const { data: normalPostsData, isLoading: loadingNormalPosts } =
    useGetAllPostsNormalForAnalyticsQuery(undefined);

  const loading =
    loadingPayments ||
    loadingPremiumUsers ||
    loadingAllUsers ||
    loadingLikes ||
    loadingDislikes ||
    loadingPremiumPosts ||
    loadingNormalPosts;

  // Data lengths for analytics
  const analyticsData = loading
    ? {
        payments: 0,
        premiumUsers: 0,
        allUsers: 0,
        likes: 0,
        dislikes: 0,
        premiumPosts: 0,
        normalPosts: 0,
      }
    : {
        payments: paymentsData?.data?.length || 0,
        premiumUsers: premiumUsersData?.data?.length || 0,
        allUsers: allUsersData?.data?.length || 0,
        likes: likesData?.data?.length || 0,
        dislikes: dislikesData?.data?.length || 0,
        premiumPosts: premiumPostsData?.data?.length || 0,
        normalPosts: normalPostsData?.data?.length || 0,
      };

  // Chart Data
  const chartData = {
    labels: [
      "Badge Sells",
      "Premium Users",
      "Total Users",
      "Likes",
      "Dislikes",
      "Premium Posts",
      "Normal Posts",
    ],
    datasets: [
      {
        label: "Analytics Data",
        data: [
          analyticsData.payments,
          analyticsData.premiumUsers,
          analyticsData.allUsers,
          analyticsData.likes,
          analyticsData.dislikes,
          analyticsData.premiumPosts,
          analyticsData.normalPosts,
        ],
        backgroundColor: [
          "#68D391", // Green gradient for Payments
          "#63B3ED", // Blue gradient for Premium Users
          "#F6E05E", // Yellow gradient for Total Users
          "#F687B3", // Pink gradient for Likes
          "#FC8181", // Red gradient for Dislikes
          "#B794F4", // Purple gradient for Premium Posts
          "#A0AEC0", // Gray gradient for Normal Posts
        ],
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-default-50 p-3 rounded-lg mt-5">
      <h3 className="text-xl font-bold mb-4 text-pink-400">
        Social Media Analytics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Payments */}
        <div className="bg-gradient-to-br from-green-400 to-green-200 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaMoneyBillWave className="text-3xl mr-3" />
          <div>Total Badge Selling: {analyticsData.payments}</div>
        </div>

        {/* Premium Users */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-200 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaUserShield className="text-3xl mr-3" />
          <div>Total Premium Users: {analyticsData.premiumUsers}</div>
        </div>

        {/* Total Users */}
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-200 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaUsers className="text-3xl mr-3" />
          <div>Total Users: {analyticsData.allUsers}</div>
        </div>

        {/* Likes */}
        <div className="bg-gradient-to-br from-pink-400 to-pink-200 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaThumbsUp className="text-3xl mr-3" />
          <div>Total Likes: {analyticsData.likes}</div>
        </div>

        {/* Dislikes */}
        <div className="bg-gradient-to-br from-red-400 to-red-200 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaThumbsDown className="text-3xl mr-3" />
          <div>Total Dislikes: {analyticsData.dislikes}</div>
        </div>

        {/* Premium Posts */}
        <div className="bg-gradient-to-br from-purple-400 to-purple-200 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaCrown className="text-3xl mr-3" />
          <div>Total Premium Posts: {analyticsData.premiumPosts}</div>
        </div>

        {/* Normal Posts */}
        <div className="bg-gradient-to-br from-gray-400 to-gray-200 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaRegNewspaper className="text-3xl mr-3" />
          <div>Total Normal Posts: {analyticsData.normalPosts}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Social Media Analytics Overview",
              },
            },
          }}
        />
      </div>
    </div>
  );
}