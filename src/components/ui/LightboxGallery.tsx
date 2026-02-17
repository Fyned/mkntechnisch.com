"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface LightboxGalleryProps {
  open: boolean;
  close: () => void;
  index: number;
  slides: any[];
}

export default function LightboxGallery({
  open,
  close,
  index,
  slides,
}: LightboxGalleryProps) {
  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      plugins={[Zoom, Video, Thumbnails]}
      animation={{ fade: 250, swipe: 300 }}
      zoom={{
        maxZoomPixelRatio: 3,
        scrollToZoom: true,
      }}
      video={{
        autoPlay: true,
        controls: true,
      }}
      thumbnails={{
        position: "bottom",
        width: 80,
        height: 60,
        gap: 4,
      }}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
      }}
      carousel={{
        finite: false,
        preload: 2,
      }}
    />
  );
}
