"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Pagination } from "@nextui-org/pagination";
import { useGetAllPaymentsDetailsQuery } from "@/src/redux/features/adminManagement/payment";
import PaymentTable from "./paymentTable";
import Empty from "@/src/components/ui/empty";
import TableSkeleton from "@/src/components/ui/skeleton/tableSkeleton";

export default function ManagePayments() {
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch payments with pagination
  const queryParams = {
    limit: limit.toString(),
    page: page.toString(),
  };

  const {
    data: paymentsData,
    isLoading,
    isError,
  } = useGetAllPaymentsDetailsQuery(queryParams);

  const payments = paymentsData?.data || [];
  const meta = paymentsData?.meta;

  // Handle page change
  const handlePageChange = (newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  return (
    <div className="flex w-full flex-col">
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <Tabs aria-label="Payment Categories">
            <Tab key="all-payments" title="All Payments">
              <PaymentTable payments={payments} isLoading={isLoading} />
            </Tab>
          </Tabs>

          {/* Pagination for Payments */}

          {meta?.total > meta?.limit && (
            <>
              {" "}
              <div className="mt-10 flex justify-center items-start">
                <Pagination
                  color="default"
                  variant="flat"
                  showControls
                  total={meta?.totalPage || 1}
                  page={page}
                  className="mb-5 px-5 py-1 mx-3 border-none shadow-none rounded-full bg-default-50"
                  onChange={handlePageChange}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
