"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { primaryColor, secondaryColor } from "@/src/styles/button";
import CButton from "../ui/CButton/CButton";
import { useTheme } from "next-themes";

interface TThemeModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const ThemeModal = ({ isOpen, onOpenChange }: TThemeModalProps) => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    onOpenChange(); // Close modal after selecting the theme
  };

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="m-2">
        <ModalHeader>Choose a Theme</ModalHeader>
        <ModalBody>
          <div className="flex flex-row gap-3 mb-10">
            <CButton
              size="md"
              bgColor={theme === "light" ? primaryColor : secondaryColor}
              text="Light Mode"
              onClick={() => handleThemeChange("light")}
            />
            <CButton
              size="md"
              bgColor={theme === "dark" ? primaryColor : secondaryColor}
              text="Dark Mode"
              onClick={() => handleThemeChange("dark")}
            />
            <CButton
              size="md"
              bgColor={theme === "system" ? primaryColor : secondaryColor}
              text="System"
              onClick={() => handleThemeChange("system")}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ThemeModal;
