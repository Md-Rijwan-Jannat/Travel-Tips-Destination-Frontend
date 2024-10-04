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
import { Editor } from "@tinymce/tinymce-react";
import CButton from "@/src/components/ui/CButton/CButton";
import { primaryColor } from "@/src/styles/button";
import { GoVerified } from "react-icons/go";

interface PostData {
  images: string[];
  title: string;
  description: string;
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
      category: "Other",
    },
  });

  const images = watch("images");
  const title = watch("title");
  const description = watch("description");

  // Watch TinyMCE content manually
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    if (title || editorContent || images.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [title, editorContent, images]);

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
    const postData = { ...data, description: editorContent };

    console.log("postData=>", postData);
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

      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
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

              {/* Category Select */}
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full mt-4"
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

              {imagePreviews.length > 0 && (
                <div className="mt-4 flex flex-wrap w-full gap-4">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="relative">
                      <Image
                        alt="Preview Image"
                        className="rounded-md"
                        height={200}
                        src={preview}
                        width={200}
                      />
                      <FaX
                        className="absolute top-1 right-1 p-1 rounded-full bg-default-100 cursor-pointer"
                        onClick={removeImagePreview}
                      />
                    </div>
                  ))}
                </div>
              )}

              <label htmlFor="file-upload">
                <input
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                  type="file"
                />
                <div className="my-4 flex items-center gap-2 cursor-pointer">
                  <IoIosImages className="text-xl" />
                  <span className="text-sm">Upload a photo</span>
                </div>
              </label>
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
