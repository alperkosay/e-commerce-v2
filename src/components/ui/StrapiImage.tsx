import { Media } from "@/services/api/types";
import Image from "next/image";
import React from "react";

export default function StrapiImage({
  media,
  alt,
  className,
}: {
  media?: Media;
  alt?: string;
  className?: string;
}) {
  if (!media) {
    return (
      <Image
        src={"https://dummyimage.com/720x400&w=384&q=75"}
        width={720}
        height={400}
        alt={"not found"}
        className={className}
      />
    );
  }

  return (
    <Image
      src={process.env.NEXT_PUBLIC_MEDIA_PREFIX + media.attributes.url}
      width={media.attributes.width}
      height={media.attributes.height}
      alt={alt ?? media.attributes.alternativeText}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={className}
      // quality={90}
    />
  );
}
