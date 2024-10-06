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
import TableSkeleton from "@/src/components/ui/skeleton/tableSkeleton";

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
        premiumPosts: premiumPostsData?.meta?.total || 0,
        normalPosts: normalPostsData?.meta?.total || 0,
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
          "#68D391",
          "#63B3ED",
          "#F6E05E",
          "#F687B3",
          "#FC8181",
          "#B794F4",
          "#A0AEC0",
        ],
      },
    ],
  };

  return (
    <div className="bg-default-50 p-3 rounded-lg mt-5">
      <h3 className="text-xl font-bold mb-4 text-pink-500/80">
        Social Media Analytics
      </h3>

      {loading && <TableSkeleton />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:5 mb-5">
        {/* Payments */}
        <div className="bg-gradient-to-br from-green-500/80 to-green-300/80 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaMoneyBillWave className="text-lg md:text-3xl mr-3" />
          <div className="text-sm md:text-lg">
            Total Badge Selling: {analyticsData.payments}
          </div>
        </div>

        {/* Premium Users */}
        <div className="bg-gradient-to-br from-blue-500/80 to-blue-300/80 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaUserShield className="text-lg md:text-3xl mr-3" />
          <div className="text-sm md:text-lg">
            Total Premium Users: {analyticsData.premiumUsers}
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-gradient-to-br from-yellow-500/80 to-yellow-300/80 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaUsers className="text-lg md:text-3xl mr-3" />
          <div className="text-sm md:text-lg">
            Total Users: {analyticsData.allUsers}
          </div>
        </div>

        {/* Likes */}
        <div className="bg-gradient-to-br from-pink-500/80 to-pink-300/80 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaThumbsUp className="text-lg md:text-3xl mr-3" />
          <div className="text-sm md:text-lg">
            Total Likes: {analyticsData.likes}
          </div>
        </div>

        {/* Dislikes */}
        <div className="bg-gradient-to-br from-red-500/80 to-red-300/80 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaThumbsDown className="text-lg md:text-3xl mr-3" />
          <div className="text-sm md:text-lg">
            Total Dislikes: {analyticsData.dislikes}
          </div>
        </div>

        {/* Premium Posts */}
        <div className="bg-gradient-to-br from-purple-500/80 to-purple-300/80 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaCrown className="text-lg md:text-3xl mr-3" />
          <div className="text-sm md:text-lg">
            Total Premium Posts: {analyticsData.premiumPosts}
          </div>
        </div>

        {/* Normal Posts */}
        <div className="bg-gradient-to-br from-gray-500/80 to-gray-300/80 px-5 py-6 text-center text-lg font-semibold rounded-xl shadow-md text-white flex items-center justify-center">
          <FaRegNewspaper className="text-lg md:text-3xl mr-3" />
          <div className="text-sm md:text-lg">
            Total Normal Posts: {analyticsData.normalPosts}
          </div>
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
