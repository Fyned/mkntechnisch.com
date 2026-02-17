"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Play, ZoomIn, ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import LightboxGallery from "@/components/ui/LightboxGallery";
import { projects, type ProjectImage, type ProjectVideo } from "@/lib/project-data";

type Filter = "all" | "videos";

const ITEMS_PER_PAGE = 12;

export default function ProjectsContent() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<Filter>("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("all") },
    { key: "videos", label: t("videos") },
  ];

  // Combine all project images and videos into a single gallery
  const { images, videos, lightboxSlides } = useMemo(() => {
    const allImages: (ProjectImage & { projectId: string })[] = [];
    const allVideos: (ProjectVideo & { projectId: string })[] = [];

    for (const project of projects) {
      for (const img of project.images) {
        allImages.push({ ...img, projectId: project.id });
      }
      for (const vid of project.videos) {
        allVideos.push({ ...vid, projectId: project.id });
      }
    }

    const imgs = filter === "videos" ? [] : allImages;
    const vids = allVideos;

    // Build lightbox slides (images first, then videos)
    const slides = [
      ...imgs.map((img) => ({
        src: img.full,
        width: img.width,
        height: img.height,
      })),
      ...vids.map((vid) => ({
        type: "video" as const,
        sources: [{ src: vid.src, type: "video/mp4" }],
      })),
    ];

    return { images: imgs, videos: vids, lightboxSlides: slides };
  }, [filter]);

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="pt-24 sm:pt-32 min-h-screen">
      {/* Header */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="text-mkn-red text-sm uppercase tracking-[0.3em] mb-2 font-medium">
              {t("subtitle")}
            </p>
            <h1 className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl lg:text-6xl tracking-wider text-foreground">
              {t("title")}
            </h1>
            <div className="w-16 h-0.5 bg-mkn-red mx-auto mt-4 transform -skew-x-12" />
          </AnimatedSection>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === key
                    ? "bg-mkn-red text-white shadow-lg shadow-mkn-red/20"
                    : "bg-surface text-muted hover:text-foreground hover:bg-surface-hover"
                }`}
              >
                {label}
                {key === "videos" && (
                  <span className="ml-1.5 text-xs opacity-60">
                    ({projects.reduce((sum, p) => sum + p.videos.length, 0)})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Images grid */}
          {filter !== "videos" && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4 mb-6">
              {visibleImages.map((img, index) => (
                <div key={`${img.projectId}-${img.filename}`} className="break-inside-avoid">
                  <button
                    onClick={() => openLightbox(index)}
                    className="group relative w-full overflow-hidden rounded-lg block cursor-pointer"
                  >
                    <Image
                      src={img.thumb}
                      alt={`MKN Technisch project`}
                      width={400}
                      height={Math.round(400 * (img.height / img.width))}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={img.blurDataURL}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 bg-mkn-red/80 rounded-full flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Videos grid */}
          {videos.length > 0 && (
            <>
              {filter === "all" && (
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-wider mb-4 mt-10 text-foreground">
                  {t("videos")}
                </h3>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((vid, index) => (
                  <button
                    key={`${vid.projectId}-${vid.filename}`}
                    onClick={() => openLightbox(images.length + index)}
                    className="group relative aspect-video overflow-hidden rounded-lg bg-themed-card cursor-pointer"
                  >
                    <video
                      src={vid.src}
                      className="w-full h-full object-cover"
                      preload="metadata"
                      muted
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-mkn-red/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Load more button */}
          {filter !== "videos" && hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                className="inline-flex items-center gap-2 bg-surface hover:bg-surface-hover text-muted hover:text-foreground px-6 py-3 rounded-lg font-medium transition-all"
              >
                {t("loadMore")}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <LightboxGallery
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </div>
  );
}
