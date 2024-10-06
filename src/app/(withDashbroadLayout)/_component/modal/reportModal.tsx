import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { TPost } from "@/src/types";
import { Textarea } from "@nextui-org/input";
import { useReportPostMutation } from "@/src/redux/features/post/postApi";
import CButton from "@/src/components/ui/CButton/CButton";
import { primaryColor } from "@/src/styles/button";
import GlassLoader from "@/src/components/shared/glassLoader";
import { toast } from "sonner";

interface TReportModalProps {
  post: TPost;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ReportModal({
  post,
  isOpen,
  onOpenChange,
}: TReportModalProps) {
  const [reason, setReason] = useState<string>("");
  const [reportPost, { isLoading, isError }] = useReportPostMutation();

  const handleReportSubmit = async () => {
    try {
      const res = await reportPost({ postId: post?._id, reason }).unwrap();

      if (res.success) {
        toast.success("Report submitted successfully.");
        setReason("");
      }

      onOpenChange();
    } catch (error) {
      console.error("Failed to submit the report:", error);
    }
  };

  return (
    <Modal
      size="lg"
      placement="center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      {isLoading && <GlassLoader />}
      <ModalContent className="m-2">
        <ModalHeader>
          <h2 className="text-xl font-bold">Report Post</h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <p className="text-sm text-default-600">
              Please describe the reason for reporting this post:
            </p>

            {/* Reason Input */}
            <Textarea
              label="Reason for Reporting"
              placeholder="Enter the reason for reporting this post"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
            />

            {/* Submit Button */}
            <ModalFooter>
              <CButton
                onClick={handleReportSubmit}
                bgColor={primaryColor}
                text="Submit"
              />
            </ModalFooter>

            {/* Display success/error messages */}
            {isError && (
              <p className="text-red-500">Failed to report the post.</p>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
