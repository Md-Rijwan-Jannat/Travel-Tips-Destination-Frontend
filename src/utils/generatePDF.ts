import jsPDF from "jspdf";
import { getImageBase64 } from "./generateBase64";
import { TPost } from "../types/post.type";

const getInitials = (name: string): string => {
  const initials = name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");

  return initials.slice(0, 2);
};

export const generatePDF = async (post: TPost) => {
  const doc = new jsPDF();
  let yOffset = 20;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(post.title, 105, yOffset, { align: "center" });

  yOffset += 10;
  doc.setLineWidth(0.5);
  doc.line(10, yOffset, 200, yOffset);
  yOffset += 10;

  // User profile image or initials
  if (post?.user?.image) {
    try {
      const userImageBase64 = await getImageBase64(post.user.image);

      await new Promise<void>((resolve, reject) => {
        const img = new Image();

        img.src = userImageBase64;
        img.onload = () => {
          doc.addImage(userImageBase64, "PNG", 90, yOffset, 30, 30, "", "FAST");
          doc.setDrawColor(0);
          doc.circle(105, yOffset + 15, 15, "S"); // Circular border
          resolve();
        };
        img.onerror = () => reject("Failed to load user image.");
      });
    } catch (error) {
      console.error("Failed to load user image:", error);
    }
  } else if (post?.user?.name) {
    const initials = getInitials(post.user.name);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(initials, 105, yOffset + 20, { align: "center" });
  }

  yOffset += 40;

  // User name centered
  if (post?.user?.name) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(post.user.name, 105, yOffset, { align: "center" });
  }

  yOffset += 10;

  // Post description
  const descriptionText = post?.description.replace(/<[^>]+>/g, "");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(descriptionText, 10, yOffset, { maxWidth: 180, align: "left" });

  yOffset += 40;

  // Post images
  if (post?.images && post.images.length > 0) {
    for (let i = 0; i < post.images.length; i++) {
      try {
        const imgBase64 = await getImageBase64(post.images[i]);
        const img = new Image();

        img.src = imgBase64;
        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;

            const maxWidth = 180;
            const scaleFactor = maxWidth / imgWidth;
            const scaledWidth = maxWidth;
            const scaledHeight = imgHeight * scaleFactor;

            doc.addImage(
              imgBase64,
              "PNG",
              10,
              yOffset,
              scaledWidth,
              scaledHeight
            );
            doc.rect(10, yOffset, scaledWidth, scaledHeight);

            yOffset += scaledHeight + 10;
            resolve();
          };
          img.onerror = () => reject("Failed to load image.");
        });
      } catch (error) {
        console.error(`Failed to add image ${post.images[i]} to PDF:`, error);
      }
    }
  }

  // Footer with date
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, 280);

  // Save PDF
  doc.save(`${post?.title}.pdf`);
};
