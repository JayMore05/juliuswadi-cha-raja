"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

interface GalleryLightboxProps {
  images: {
    id: string;
    image_url: string;
    title?: string;
  }[];

  index: number;
  open: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({
  images,
  index,
  open,
  onClose,
}: GalleryLightboxProps) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      plugins={[Zoom]}
      slides={images.map((image) => ({
        src: image.image_url,
        title: image.title,
      }))}
    />
  );
}