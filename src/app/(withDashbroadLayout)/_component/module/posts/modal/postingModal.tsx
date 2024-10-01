"use client";

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
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { IoIosImages } from "react-icons/io";
import { Select, SelectItem } from "@nextui-org/select";
import Image from "next/image";
import { FaX } from "react-icons/fa6";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";

import { useCreatePostMutation } from "@/src/redux/features/post/postApi";
import { TUser } from "@/src/types";
import GlassLoader from "@/src/components/shared/glassLoader";


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
  const [isError, setIsError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: {},
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
  const title = watch("title");
  const description = watch("description");

  useEffect(() => {
    // Check if any of the fields have values
    if (title || description || images.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [title, description, images]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews: string[] = [];

    files.forEach((file) => {
      previews.push(URL.createObjectURL(file));
    });

    // Limit to single image upload
    const limitedPreviews = previews.slice(0, 1);

    setImagePreviews(limitedPreviews);

    try {
      const uploadedImages = await Promise.all(
        files.slice(0, 1).map(async (file) => {
          const formData = new FormData();

          formData.append("file", file);
          formData.append("upload_preset", "travel-tips");
          formData.append(
            "cloud_name",
            "Travel-tips&-destination-guides-images"
          );

          const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

          const res = await fetch(`${cloudinaryUrl}`, {
            method: "POST",
            body: formData,
          });

          const data = await res.json();

          return data.secure_url;
        })
      );

      setValue("images", uploadedImages);
    } catch (error) {
      setIsError("Failed to upload image");
    }
  };

  const removeImagePreview = () => {
    setImagePreviews([]);
    setValue("images", []);
  };

  const onSubmit = async (data: PostData) => {
    // Check if all fields are empty
    // if (!data.title && !data.description && data.images.length === 0) {
    //   setIsError("Add something");
    //   return;
    // }

    try {
      const res = await createPostFn(data);

      if (res?.data?.success) {
        setImagePreviews([]);
        reset();
        onOpenChange();
        toast.success("Post created successfully");
        setIsError("");
      } else {
        throw new Error("Post creation failed");
      }
    } catch (error: any) {
      setIsError(error.message || "Failed to create post");
      toast.error("Failed to create post");
    }
  };

  return (
    <>
      {isLoading && <GlassLoader />}
      <div className="flex items-center gap-4 w-full md:w-[500px] md:ml-4">
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
              Create post{" "}
            </span>
          </div>
        </div>
        <input
          className="cursor-pointer w-full px-3 py-2 border rounded-full text-xs focus:border-default-300"
          placeholder={`What's on your mind, ${userInfo?.name}?`}
          type="text"
          onClick={onOpen}
        />
      </div>

      <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
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
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    fullWidth
                    placeholder={`What's on your mind, ${userInfo?.name}?`}
                    rows={4}
                    variant="underlined"
                  />
                )}
              />

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

              {imagePreviews.length > 0 && (
                <div className="mt-4 flex flex-wrap w-full gap-4">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="relative">
                      <Image
                        alt={`Preview ${idx + 1}`}
                        className="w-[100px] h-[70px] rounded-lg border-dashed object-cover object-center p-0.5"
                        height={500}
                        src={preview}
                        width={500}
                      />
                      <div className="absolute top-1 right-1">
                        <button
                          className="text-pink-500 bg-default-100 rounded-full p-1 border border-default-100 text-xs cursor-pointer size-5 flex items-center justify-center"
                          type="button"
                          onClick={removeImagePreview}
                        >
                          <FaX size={8} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4">
                <label htmlFor="image">
                  <IoIosImages
                    className="text-pink-500 cursor-pointer "
                    size={25}
                  />
                  <input
                    multiple
                    accept="image/*"
                    className="mt-4 cursor-pointer hidden"
                    id="image"
                    type="file"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex items-center justify-end gap-2 w-full">
                <Button
                  className="bg-pink-500"
                  isDisabled={!isFormValid}
                  size="sm"
                  type="submit"
                >
                  Post
                </Button>
              </div>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostModal;
