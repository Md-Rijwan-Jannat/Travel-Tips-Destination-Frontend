'use client';

import React, { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/tabs';
import { Pagination } from '@nextui-org/pagination';
import {
  useGetAllUsersQuery,
  useGetAllPremiumUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from '@/src/redux/features/adminManagement/manageUserApi';
import { TUser } from '@/src/types';
import UserTable from './userTable';
import Empty from '@/src/components/ui/empty';
import TableSkeleton from '@/src/components/ui/skeleton/tableSkeleton';

export default function AllUsers() {
  // Separate page states for both tabs
  const [pageAll, setPageAll] = useState(1);
  const [pagePremium, setPagePremium] = useState(1);
  const limit = 10; // Limit for pagination

  // Fetch all users with pagination
  const {
    data: allUsersData,
    isLoading: isLoadingAllUsers,
    isError: isErrorAllUsers,
  } = useGetAllUsersQuery({
    sort: '-createdAt',
    limit: limit.toString(),
    page: pageAll.toString(),
  });

  // Fetch premium users with pagination
  const {
    data: premiumUsersData,
    isLoading: isLoadingPremiumUsers,
    isError: isErrorPremiumUsers,
  } = useGetAllPremiumUsersQuery({
    page: pagePremium,
    limit,
  });

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  // Destructure user data
  const allUsers: TUser[] = allUsersData?.data || [];
  const premiumUsers: TUser[] = premiumUsersData?.data || [];
  const metaAll = allUsersData?.meta;
  const metaPremium = premiumUsersData?.meta;

  // Feedback states
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleStatusUpdate = async (userId: string, newStatus: string) => {
    try {
      const res = await updateUserStatus({
        userId,
        status: newStatus,
      }).unwrap();

      if (res?.data?.success) {
        setFeedbackMessage('User status updated successfully!');
        setIsSuccess(true);
      }
    } catch (error) {
      setFeedbackMessage('Failed to update user status. Please try again.');
      setIsSuccess(false);
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      const res = await updateUserRole({ userId, role: newRole }).unwrap();

      if (res?.data?.success) {
        setFeedbackMessage('User role updated successfully!');
        setIsSuccess(true);
      }
    } catch (error) {
      setFeedbackMessage('Failed to update user role. Please try again.');
      setIsSuccess(false);
    }
  };

  const handlePageChangeAll = (newPage: number) => {
    setPageAll(newPage);
  };

  const handlePageChangePremium = (newPage: number) => {
    setPagePremium(newPage);
  };

  return (
    <div className="flex w-full flex-col">
      {isLoadingPremiumUsers || isLoadingAllUsers ? (
        <TableSkeleton />
      ) : (
        <>
          <Tabs aria-label="User Categories">
            {/* All Users Tab */}
            <Tab key="normal" title="Normal Users">
              <UserTable
                users={allUsers}
                handleStatusUpdate={handleStatusUpdate}
                handleRoleUpdate={handleRoleUpdate}
                isLoading={isLoadingAllUsers}
              />
              {/* Pagination for All Users */}
              {metaAll?.total > metaAll?.limit && (
                <div className="mt-10 flex justify-center items-start">
                  <Pagination
                    color="default"
                    variant="flat"
                    showControls
                    total={metaAll?.totalPage || 1}
                    page={pageAll}
                    className="mb-5 px-5 py-1 mx-3 border-none shadow-none rounded-full bg-default-50"
                    onChange={handlePageChangeAll}
                  />
                </div>
              )}
            </Tab>
            {/* Premium Users Tab */}
            <Tab key="premium" title="Premium Users">
              <UserTable
                users={premiumUsers}
                handleStatusUpdate={handleStatusUpdate}
                handleRoleUpdate={handleRoleUpdate}
                isLoading={isLoadingPremiumUsers}
              />
              {/* Pagination for Premium Users */}
              {metaPremium?.total > metaPremium?.limit && (
                <div className="mt-10 flex justify-center items-start">
                  <Pagination
                    color="default"
                    variant="flat"
                    showControls
                    total={metaPremium?.totalPage || 1}
                    page={pagePremium}
                    className="mb-5 px-5 py-1 mx-3 border-none shadow-none rounded-full bg-default-50"
                    onChange={handlePageChangePremium}
                  />
                </div>
              )}
            </Tab>
          </Tabs>
        </>
      )}
    </div>
  );
}
