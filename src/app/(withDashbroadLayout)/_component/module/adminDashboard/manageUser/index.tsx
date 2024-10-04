"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Pagination } from "@nextui-org/pagination";
import {
  useGetAllUsersQuery,
  useGetAllPremiumUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "@/src/redux/features/adminManagement/manageUserApi";
import { TUser } from "@/src/types";
import UserTable from "./userTable";

export default function AllUsers() {
  const [page, setPage] = useState(1);
  const limit = 10; // Limit for pagination

  const queryParams = {
    sort: "-createdAt",
    limit: limit.toString(),
    page: page.toString(),
  };

  // Fetch all users with pagination
  const {
    data: allUsersData,
    isLoading: isLoadingAllUsers,
    isError: isErrorAllUsers,
  } = useGetAllUsersQuery(queryParams);

  // Fetch premium users
  const {
    data: premiumUsersData,
    isLoading: isLoadingPremiumUsers,
    isError: isErrorPremiumUsers,
  } = useGetAllPremiumUsersQuery({ page, limit });

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  // Destructure user data
  const allUsers: TUser[] = allUsersData?.data || [];
  const premiumUsers: TUser[] = premiumUsersData?.data || [];
  const meta = allUsersData?.meta;

  // Feedback states
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleStatusUpdate = async (userId: string, newStatus: string) => {
    try {
      const res = await updateUserStatus({
        userId,
        status: newStatus,
      }).unwrap();

      console.log("ststus ==>", res);

      if (res?.data?.success) {
        setFeedbackMessage("User status updated successfully!");
        setIsSuccess(true);
      }
    } catch (error) {
      setFeedbackMessage("Failed to update user status. Please try again.");
      setIsSuccess(false);
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      const res = await updateUserRole({ userId, role: newRole }).unwrap();

      if (res?.data?.success) {
        setFeedbackMessage("User role updated successfully!");
        setIsSuccess(true);
      }
    } catch (error) {
      setFeedbackMessage("Failed to update user role. Please try again.");
      setIsSuccess(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Update page state
  };

  return (
    <div className="flex w-full flex-col">
      {isErrorAllUsers || isErrorPremiumUsers ? (
        <div>Error loading users. Please try again.</div>
      ) : (
        <>
          <Tabs aria-label="User Categories">
            {/* Premium Users Tab */}
            <Tab key="premium" title="Premium Users">
              <UserTable
                users={premiumUsers}
                handleStatusUpdate={handleStatusUpdate}
                handleRoleUpdate={handleRoleUpdate}
                isLoading={isLoadingPremiumUsers}
              />
            </Tab>

            {/* All Users Tab */}
            <Tab key="normal" title="Normal Users">
              <UserTable
                users={allUsers}
                handleStatusUpdate={handleStatusUpdate}
                handleRoleUpdate={handleRoleUpdate}
                isLoading={isLoadingAllUsers}
              />
            </Tab>
          </Tabs>

          {/* Pagination for All Users */}
          <div className="mt-10 flex justify-center items-start">
            <Pagination
              color="default"
              variant="flat"
              showControls
              total={meta?.totalPage || 1} // Total number of pages from the response meta
              page={page} // Current page
              className="mb-5 px-5 py-1 mx-3 border-none shadow-none rounded-full bg-[#F4F4F5]"
              onChange={handlePageChange} // Update page on change
            />
          </div>
        </>
      )}
    </div>
  );
}
