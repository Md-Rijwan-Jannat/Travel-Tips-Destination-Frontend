import Image from "next/image";

interface PostImageProps {
  images: string[];
  altText: string;
}

export default function PostImage({ images, altText }: PostImageProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="mt-4">
      <Image
        alt={altText}
        className="w-full h-48 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
        height={500}
        src={images[0]}
        width={500}
      />
    </div>
  );
}
