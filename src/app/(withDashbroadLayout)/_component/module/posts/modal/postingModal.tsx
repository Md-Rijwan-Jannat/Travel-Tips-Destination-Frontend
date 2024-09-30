"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Avatar } from "@nextui-org/avatar";
import { useDisclosure } from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { TUser } from "@/src/types";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { IoIosImages } from "react-icons/io";
import { Select, SelectItem } from "@nextui-org/select";

// Custom interface for post data
interface PostData {
  images: string[];
  title: string;
  description: string;
  status: string;
  reportCount: number;
}

interface TPostModalProps {
  userInfo: TUser | undefined;
}

const PostModal = ({ userInfo }: TPostModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // React Hook Form setup
  const { handleSubmit, control, setValue, watch } = useForm<PostData>({
    defaultValues: {
      images: [],
      title: "",
      description: "",
      status: "FREE",
      reportCount: 0,
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews: string[] = [];

    // Image preview
    files.forEach((file) => {
      previews.push(URL.createObjectURL(file));
    });
    setImagePreviews(previews);

    // Upload to Cloudinary (replace this with your Cloudinary upload logic)
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_preset"); // Set your Cloudinary upload preset here

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/your_cloudinary_id/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        return data.secure_url;
      })
    );

    // Set the uploaded images to the form
    setValue("images", uploadedImages);
  };

  const removeImagePreview = (index: number) => {
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const onSubmit = (data: PostData) => {
    console.log("Form Data:", data);
    onOpenChange();
  };

  return (
    <>
      {/* Clicking the input field opens the modal */}
      <div className="flex items-center gap-4 w-full md:w-[550px] md:ml-4">
        <div className="flex items-center gap-2">
          <Avatar
            className="text-xl"
            src={userInfo?.image || undefined}
            name={userInfo?.name.charAt(0).toUpperCase()}
            alt="User Avatar"
            size="md"
          />
          <div>
            <p className="whitespace-nowrap text-xs">{userInfo?.name}</p>
            <span className="text-xs text-default-400 whitespace-nowrap">
              Create post{" "}
            </span>
          </div>
        </div>
        <input
          type="text"
          placeholder={`What's on your mind, ${userInfo?.name}?`}
          onClick={onOpen}
          className="cursor-pointer w-full px-3 py-2 border rounded-full text-xs focus:border-default-300"
        />
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center gap-2">
              <Avatar
                className="text-xl"
                src={userInfo?.image || undefined}
                name={userInfo?.name.charAt(0).toUpperCase()}
                alt="User Avatar"
                size="md"
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
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Title"
                    fullWidth
                    className="mb-4"
                    variant="underlined"
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder={`What's on your mind, ${userInfo?.name}?`}
                    rows={4}
                    fullWidth
                    variant="underlined"
                  />
                )}
              />

              {/* Status Selector */}
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Select post type"
                    className="max-w-xs"
                    variant="underlined"
                  >
                    <SelectItem key="FREE">Free</SelectItem>
                    <SelectItem key="PREMIUM">Premium</SelectItem>
                  </Select>
                )}
              />

              {/* Image Preview with Remove Option */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImagePreview(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Image Upload */}
              <label htmlFor="image">
                <IoIosImages
                  className="text-pink-500 cursor-pointer "
                  size={22}
                />
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  multiple
                  onChange={handleFileChange}
                  className="mt-4 cursor-pointer hidden"
                />
              </label>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Post
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostModal;
