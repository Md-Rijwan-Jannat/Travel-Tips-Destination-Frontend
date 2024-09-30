interface PostImageProps {
  images: string[];
  altText: string;
}

export default function PostImage({ images, altText }: PostImageProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="mt-4">
      <img
        src={images[0]}
        alt={altText}
        className="w-full h-48 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
      />
    </div>
  );
}
