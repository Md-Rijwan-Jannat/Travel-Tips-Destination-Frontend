"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { Avatar } from "@nextui-org/avatar";
import { Tooltip } from "@nextui-org/tooltip";
import { TPayment } from "@/src/types";
import GlassLoader from "@/src/components/shared/glassLoader";

type PaymentTableProps = {
  payments: TPayment[];
  isLoading: boolean;
};

const PaymentTable: React.FC<PaymentTableProps> = ({ payments, isLoading }) => {
  return (
    <>
      <Table className="overflow-x-auto" aria-label="Payment Table">
        <TableHeader>
          <TableColumn>Transition ID</TableColumn>
          <TableColumn>Customer Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Date</TableColumn>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment._id}>
              <TableCell>
                <p className="whitespace-nowrap">{payment.transitionId}</p>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Tooltip content={payment?.user?.role}>
                    <Avatar
                      name={payment?.user?.name?.charAt(0)?.toUpperCase()}
                      src={payment?.user?.image || undefined}
                      size="sm"
                      className="mr-2"
                    />
                  </Tooltip>
                  <p className="whitespace-nowrap"> {payment?.user?.name}</p>
                </div>
              </TableCell>
              <TableCell>{payment.customerEmail}</TableCell>
              <TableCell>${payment.amount}</TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  variant="flat"
                  color={payment.status === "Paid" ? "success" : "danger"}
                >
                  {payment.status}
                </Chip>
              </TableCell>
              <TableCell>
                {new Date(payment.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PaymentTable;
