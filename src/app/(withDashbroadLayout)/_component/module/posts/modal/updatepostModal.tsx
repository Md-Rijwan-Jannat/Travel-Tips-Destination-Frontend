"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";

import { useUpdatePostMutation } from "@/src/redux/features/post/postApi";
import { TUser, TPost } from "@/src/types";
import GlassLoader from "@/src/components/shared/glassLoader";
import { Editor } from "@tinymce/tinymce-react";
import CButton from "@/src/components/ui/CButton/CButton";
import { primaryColor } from "@/src/styles/button";

interface TUpdatePostModalProps {
  userInfo: TUser | undefined;
  postData: TPost;
  isOpen: boolean;
  onOpenChange: () => void;
}

const UpdatePostModal = ({
  userInfo,
  postData,
  isOpen,
  onOpenChange,
}: TUpdatePostModalProps) => {
  const [updatePostFn, { isLoading }] = useUpdatePostMutation();
  const [isError, setIsError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState(
    postData.description || ""
  );

  const { handleSubmit, control, setValue, reset, watch } = useForm<TPost>({
    defaultValues: {
      title: postData.title,
      description: postData.description,
      status: postData.status || "FREE",
      reportCount: postData.reportCount || 0,
    },
  });

  const title = watch("title");

  useEffect(() => {
    if (title || editorContent) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [title, editorContent]);

  const onSubmit = async (data: TPost) => {
    const updatedPostData = { ...data, description: editorContent };

    try {
      const res = await updatePostFn({
        id: postData._id,
        data: updatedPostData,
      });

      if (res?.data?.success) {
        reset();
        onOpenChange();
        toast.success("Post updated successfully");
        setIsError("");
      } else {
        throw new Error("Post update failed");
      }
    } catch (error: any) {
      setIsError(error.message || "Failed to update post");
      toast.error("Failed to update post");
    }
  };

  return (
    <>
      {isLoading && <GlassLoader />}
      <Modal
        placement="center"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="m-2">
          <ModalHeader>
            <div className="flex items-center gap-2">
              <Avatar
                alt="User Avatar"
                className="text-xl"
                name={userInfo?.name.charAt(0).toUpperCase()}
                size="md"
                src={userInfo?.image || undefined}
              />
              <div>
                <p className="whitespace-nowrap text-xs">{userInfo?.name}</p>
                <span className="text-xs text-default-400 whitespace-nowrap">
                  Public
                </span>
              </div>
            </div>
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              {isError && (
                <p className="text-center text-red-500 text-xs">{isError}</p>
              )}
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    fullWidth
                    className="mb-4"
                    placeholder="Title"
                    variant="underlined"
                  />
                )}
              />

              <div className="my-4">
                <Editor
                  apiKey="64e5lcmocwpj39ir0p4qoisls2ieanvm3swq9dmxmc2k4upn"
                  init={{
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                    height: 250,
                    emoticons_append: {
                      custom_mind_blown: {
                        keywords: ["mind", "blown"],
                        char: "🤯",
                      },
                    },
                  }}
                  value={editorContent}
                  onEditorChange={(content) => setEditorContent(content)}
                />
              </div>

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full mt-4"
                    label="Select post type"
                    variant="underlined"
                  >
                    <SelectItem key="FREE">Free</SelectItem>
                    <SelectItem key="PREMIUM">Premium</SelectItem>
                  </Select>
                )}
              />
            </ModalBody>
            <ModalFooter>
              <CButton type="submit" bgColor={primaryColor} text="Save" />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdatePostModal;
