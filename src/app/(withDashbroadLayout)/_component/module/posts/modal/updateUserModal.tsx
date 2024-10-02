"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useUpdateMyProfileMutation } from "@/src/redux/features/user/userApi";
import { GoPencil } from "react-icons/go";
import { Input } from "@nextui-org/input";
import { IoIosImages } from "react-icons/io";
import GlassLoader from "@/src/components/shared/glassLoader";
import { useForm, SubmitHandler } from "react-hook-form";

interface CloudinaryResponse {
  secure_url: string;
}

interface UpdateUserModalProps {
  defaultName: string;
  defaultImage: string | undefined;
  userId: string;
}

interface FormInputs {
  name: string;
  imageFile: File | null;
  country: string;
  address: string;
}

export default function UpdateUserModal({
  defaultName,
  defaultImage,
  userId,
}: UpdateUserModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState<string>(defaultImage || "");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      name: defaultName,
      imageFile: null,
      country: "",
      address: "",
    },
  });

  // Initialize the mutation
  const [updateMyProfileFn, { isLoading }] = useUpdateMyProfileMutation();

  // Watch for image file changes to display preview
  const imageFile = watch("imageFile");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (file) {
      setValue("imageFile", file);
      setImage(URL.createObjectURL(file));
    }
  };

  // Function to upload the image to Cloudinary
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    setIsUploading(true);
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "travel-tips");
    formData.append("cloud_name", "Travel-tips&-destination-guides-images");

    const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

    try {
      const res = await fetch(`${cloudinaryUrl}`, {
        method: "POST",
        body: formData,
      });

      const data: CloudinaryResponse = await res.json();
      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      setIsUploading(false);
      return data.secure_url;
    } catch (error) {
      setIsUploading(false);
      toast.error("Cloudinary upload failed");
      throw error;
    }
  };

  // Form submission handler
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let uploadedImageUrl = image;

    if (data.imageFile) {
      try {
        uploadedImageUrl = await uploadImageToCloudinary(data.imageFile);
      } catch (error) {
        return;
      }
    }

    const updateData = {
      name: data.name,
      country: data.country,
      address: data.address,
      image: uploadedImageUrl,
    };

    try {
      const res = await updateMyProfileFn({
        data: updateData,
        id: userId,
      }).unwrap();

      if (res?.success) {
        toast.success("Profile updated successfully!");
        onOpenChange();
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <Button
        isIconOnly
        size="sm"
        radius="full"
        className="bg-default-50 hover:bg-default-100"
        startContent={<GoPencil size={18} />}
        onPress={onOpen}
      />
      <Modal
        hideCloseButton
        className="m-2"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {(isLoading || isUploading) && <GlassLoader />}
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <div className="flex flex-col gap-4 mt-3">
                <div className="flex items-center justify-center mt-3">
                  {image && (
                    <Image
                      src={image}
                      alt="Image Preview"
                      className="w-24 h-24 object-cover rounded-full mt-2"
                      width={500}
                      height={500}
                    />
                  )}
                </div>
                {/* Name Input */}
                <Input
                  type="text"
                  {...register("name")}
                  variant="flat"
                  label="Name"
                  className="bg-opacity-0"
                  placeholder="Enter your name"
                />
                <Input
                  type="text"
                  {...register("address")}
                  variant="flat"
                  label="Address"
                  className="bg-opacity-0"
                  placeholder="Enter your address"
                />
                <Input
                  type="text"
                  {...register("country")}
                  variant="flat"
                  label="Country"
                  className="bg-opacity-0"
                  placeholder="Enter your country"
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center gap-8">
              <div>
                <label htmlFor="image">
                  <IoIosImages
                    className="text-pink-500 cursor-pointer"
                    size={32}
                  />
                </label>
                <input
                  className="hidden"
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <Button
                className="bg-primaryColor text-default-200"
                radius="full"
                type="submit"
                isLoading={isSubmitting || isUploading || isLoading}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}