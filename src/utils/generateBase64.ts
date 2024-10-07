export const getImageBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      } else {
        reject("Canvas context is not available.");
      }
    };

    img.onerror = () => reject("Failed to load image.");
    img.src = url;
  });
};
