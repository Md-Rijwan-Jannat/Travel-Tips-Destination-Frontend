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
import { Input } from "@nextui-org/input";
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
import CButton from "@/src/components/ui/CButton/CButton";
import { primaryColor } from "@/src/styles/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's styles
import { GoVerified } from "react-icons/go";
import { useUser } from "@/src/hooks/useUser";
import Link from "next/link";

interface PostData {
  images: string[];
  title: string;
  description: string; // Description will now be the HTML content from Quill
  status: string;
  reportCount: number;
  category: string;
}

interface TPostModalProps {
  userInfo: TUser | undefined;
}

const categoriesList = [
  "Adventure",
  "Exploration",
  "Business Travel",
  "Other",
  "Culture",
  "Wildlife",
  "Beaches",
  "Mountaineering",
  "Sports",
  "Road Trip",
  "City Tours",
  "Photography",
];

const PostModal = ({ userInfo }: TPostModalProps) => {
  const [createPostFn, { isLoading }] = useCreatePostMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isError, setIsError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  // current user

  const { handleSubmit, control, setValue, reset, watch } = useForm<PostData>({
    defaultValues: {
      images: [],
      title: "",
      description: "",
      status: "FREE",
      reportCount: 0,
      category: "Other",
    },
  });

  const images = watch("images");
  const title = watch("title");

  useEffect(() => {
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

    setImagePreviews(previews);

    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
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

  const removeImagePreview = (index: number) => {
    const updatedPreviews = [...imagePreviews];

    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);

    const updatedImages = [...images];

    updatedImages.splice(index, 1);
    setValue("images", updatedImages);
  };

  const onSubmit = async (data: PostData) => {
    const postData = { ...data, description };

    try {
      const res = await createPostFn(postData);

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
      <div className="flex items-center gap-4 w-full md:w-[490px] xl:w-[590px] mx-auto">
        <div className="flex items-center gap-2">
          <Avatar
            as={Link}
            href={`/profile/${userInfo?._id}`}
            alt="User Avatar"
            className="text-xl"
            name={userInfo?.name.charAt(0).toUpperCase()}
            size="md"
            src={userInfo?.image || undefined}
          />
          <div>
            <Link href={`/profile/${userInfo?._id}`}>
              <p className="whitespace-nowrap text-xs flex items-center gap-1 mt-0.5 hover:underline">
                {userInfo?.name}{" "}
                {userInfo?.verified! && (
                  <GoVerified className="text-primaryColor" />
                )}
              </p>
            </Link>
            <span className="text-xs text-default-400 whitespace-nowrap">
              Create post{" "}
            </span>
          </div>
        </div>
        <input
          className="cursor-pointer w-full px-3 py-2 border border-default-100 rounded-full text-xs focus:border-default-300 focus:outline-none"
          placeholder={`${userInfo?.role === "USER" ? `What's on your mind, ${userInfo?.name}?` : `Admin announcement`}`}
          type="text"
          onClick={onOpen}
        />
      </div>

      <Modal
        size="lg"
        placement="center"
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
                <p className="whitespace-nowrap text-xs flex items-center gap-1 mt-0.5">
                  {userInfo?.name}{" "}
                  {userInfo?.verified! && (
                    <GoVerified className="text-primaryColor" />
                  )}
                </p>
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
                    placeholder="Title"
                    variant="underlined"
                  />
                )}
              />

              <div className="bg-default-50 text-default-100 rounded-lg p-2 border border-default-300">
                <ReactQuill
                  className="bg-default-50 text-default-700 placeholder:text-default-700"
                  value={description}
                  onChange={setDescription}
                  placeholder="Write your post..."
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      ["image", "link"],
                      ["clean"], // remove formatting button
                    ],
                  }}
                  theme="snow"
                />
              </div>

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full"
                    label="Select post type"
                    variant="underlined"
                  >
                    <SelectItem key="FREE">Free</SelectItem>
                    <SelectItem key="PREMIUM">Premium</SelectItem>
                  </Select>
                )}
              />

              {/* Category Select */}
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full"
                    label="Select categories"
                    variant="underlined"
                    multiple
                  >
                    {categoriesList.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              {/* Image Upload */}
              <div className="">
                <label className="mt-4 cursor-pointer text-xs text-pink-400 my-5 flex gap-2 items-center ">
                  <IoIosImages className="text-2xl" />
                  <p>Upload Images</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <div className="flex flex-wrap mt-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative mr-2 mb-2">
                      <Image
                        src={preview}
                        alt="Image Preview"
                        width={100}
                        height={100}
                        className="rounded w-[100px] h-[80px] object-cover"
                      />
                      <button
                        className="absolute top-1 right-1 bg-pink-500 text-white rounded-full p-1 text-[8px]"
                        onClick={() => removeImagePreview(index)}
                      >
                        <FaX />
                      </button>
                    </div>
                  ))}
                </div>
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
