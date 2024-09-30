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
import Image from "next/image";
import { FaX } from "react-icons/fa6";
import { useCreatePostMutation } from "@/src/redux/features/post/postApi";
import { toast } from "sonner";
import GlassLoader from "@/src/components/shared/glassLoader";
import CButton from "@/src/components/ui/CButton/CButton";
import { primaryColor } from "@/src/styles/button";

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
  const [createPostFn, { isLoading }] = useCreatePostMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isError, setIsError] = useState<string>();

  // React Hook Form setup with validation rules
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<PostData>({
    defaultValues: {
      images: [],
      title: "",
      description: "",
      status: "FREE",
      reportCount: 0,
    },
  });

  const images = watch("images");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews: string[] = [];

    files.forEach((file) => {
      previews.push(URL.createObjectURL(file));
    });
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);

    // Upload images to Cloudinary and get URLs
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "travel-tips");
        formData.append("cloud_name", "Travel-tips&-destination-guides-images");

        const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

        const res = await fetch(`${cloudinaryUrl}`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        return data.secure_url;
      })
    );

    setValue("images", [...images, ...uploadedImages]);
  };

  const removeImagePreview = (index: number) => {
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);

    const newImageUrls = [...images];
    newImageUrls.splice(index, 1);
    setValue("images", newImageUrls);
  };

  const onSubmit = async (data: PostData) => {
    if (data.title) {
      try {
        const res = await createPostFn(data);
        toast.success("Post created successfully");
        if (res?.data?.success) {
          reset({
            images: [],
            title: "",
            description: "",
            status: "FREE",
            reportCount: 0,
          });
          setImagePreviews([]);
          onOpenChange();
          setIsError("");
        }
      } catch (error: any) {
        console.log(error);
        setIsError(error.message);
        toast.error("Failed to create post");
      }
    } else {
      setIsError("Please add something");
    }
  };

  return (
    <>
      {isLoading && <GlassLoader />}
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

      <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
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
              <p className="text-center text-red-500 text-xs">
                {isError && isError}
              </p>
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
                    className="w-full"
                    variant="underlined"
                  >
                    <SelectItem key="FREE">Free</SelectItem>
                    <SelectItem key="PREMIUM">Premium</SelectItem>
                  </Select>
                )}
              />

              {/* Image Preview with Remove Option */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 flex flex-wrap w-full gap-4">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="relative">
                      <Image
                        src={preview}
                        alt={`Preview ${idx + 1}`}
                        className="w-[100px] h-[70px] rounded-lg border-dashed object-cover object-center p-0.5"
                        width={500}
                        height={500}
                      />
                      <div className="absolute top-1 right-1">
                        <button
                          type="button"
                          onClick={() => removeImagePreview(idx)}
                          className="text-pink-500 bg-default-100 rounded-full p-1 border border-default-100 text-xs cursor-pointer size-5 flex items-center justify-center"
                        >
                          <FaX size={8} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Image Upload */}
              <div className="mt-4">
                <label htmlFor="image">
                  <IoIosImages
                    className="text-pink-500 cursor-pointer "
                    size={25}
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
              </div>
            </ModalBody>
            <ModalFooter>
              <CButton bgColor={primaryColor} type="submit" text="Post" />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostModal;
