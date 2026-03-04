"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Play, ZoomIn, ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import LightboxGallery from "@/components/ui/LightboxGallery";
import { projects } from "@/lib/project-data";

const PROJECTS_PER_PAGE = 2;
const GRID_THUMBS = 11;

interface LightboxSlide {
  src?: string;
  width?: number;
  height?: number;
  type?: "video";
  sources?: { src: string; type: string }[];
}

export default function ProjectsContent() {
  const t = useTranslations("projects");
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState<LightboxSlide[]>([]);

  const hasMore = visibleCount < projects.length;
  const visibleProjects = projects.slice(0, visibleCount);

  const openProjectLightbox = useCallback(
    (projectIndex: number, slideIndex: number) => {
      const project = projects[projectIndex];
      const slides: LightboxSlide[] = [
        ...project.images.map((img) => ({
          src: img.full,
          width: img.width,
          height: img.height,
        })),
        ...project.videos.map((vid) => ({
          type: "video" as const,
          sources: [{ src: vid.src, type: "video/mp4" }],
        })),
      ];
      setLightboxSlides(slides);
      setLightboxIndex(slideIndex);
      setLightboxOpen(true);
    },
    []
  );

  return (
    <div className="pt-24 sm:pt-32 min-h-screen">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-mkn-red text-sm uppercase tracking-[0.3em] mb-2 font-medium">
              {t("subtitle")}
            </p>
            <h1 className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl lg:text-6xl tracking-wider text-foreground">
              {t("title")}
            </h1>
            <div className="w-16 h-0.5 bg-mkn-red mx-auto mt-4 transform -skew-x-12" />
          </AnimatedSection>
        </div>
      </section>

      {/* Projects */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {visibleProjects.map((project, projectIndex) => {
              const gridImages = project.images.slice(0, GRID_THUMBS);
              const totalSlides =
                project.images.length + project.videos.length;
              const shownCount = gridImages.length + project.videos.length;
              const remainingCount = totalSlides - shownCount;

              return (
                <AnimatedSection key={project.id}>
                  {/* Project header */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-[family-name:var(--font-bebas-neue)] text-5xl leading-none text-mkn-red/15 select-none tabular-nums">
                      {String(projectIndex + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted uppercase tracking-widest whitespace-nowrap">
                      {project.images.length} {t("photos")}
                      {project.videos.length > 0
                        ? ` · ${project.videos.length} video`
                        : ""}
                    </span>
                  </div>

                  {/* Instagram-style grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-1.5">
                    {gridImages.map((img, i) => (
                      <button
                        key={img.filename}
                        onClick={() =>
                          openProjectLightbox(projectIndex, i)
                        }
                        className="group relative aspect-square overflow-hidden rounded-sm sm:rounded"
                      >
                        <Image
                          src={img.thumb}
                          alt="MKN Technisch project"
                          fill
                          priority={projectIndex === 0 && i < 6}
                          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          placeholder="blur"
                          blurDataURL={img.blurDataURL}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ZoomIn className="w-5 h-5 text-white drop-shadow-lg" />
                        </div>
                      </button>
                    ))}

                    {/* Video thumbnails */}
                    {project.videos.map((vid, vidIndex) => (
                      <button
                        key={vid.filename}
                        onClick={() =>
                          openProjectLightbox(
                            projectIndex,
                            project.images.length + vidIndex
                          )
                        }
                        className="group relative aspect-square overflow-hidden rounded-sm sm:rounded"
                      >
                        <video
                          src={vid.src}
                          className="w-full h-full object-cover"
                          preload="metadata"
                          muted
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-9 h-9 bg-mkn-red/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Play
                              className="w-4 h-4 text-white ml-0.5"
                              fill="white"
                            />
                          </div>
                        </div>
                      </button>
                    ))}

                    {/* +X more */}
                    {remainingCount > 0 && (
                      <button
                        onClick={() =>
                          openProjectLightbox(projectIndex, GRID_THUMBS)
                        }
                        className="group relative aspect-square overflow-hidden rounded-sm sm:rounded"
                      >
                        {project.images[GRID_THUMBS] && (
                          <Image
                            src={project.images[GRID_THUMBS].thumb}
                            alt=""
                            fill
                            sizes="16vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            placeholder="blur"
                            blurDataURL={
                              project.images[GRID_THUMBS].blurDataURL
                            }
                          />
                        )}
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-[family-name:var(--font-bebas-neue)] text-3xl text-white leading-none">
                            +{remainingCount}
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Load more projects */}
          {hasMore && (
            <div className="text-center mt-16">
              <button
                onClick={() =>
                  setVisibleCount((prev) => prev + PROJECTS_PER_PAGE)
                }
                className="inline-flex items-center gap-2 bg-surface hover:bg-surface-hover border border-border hover:border-mkn-red/40 text-muted hover:text-foreground px-8 py-3 rounded-lg font-medium transition-all duration-200"
              >
                {t("loadMore")}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <LightboxGallery
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </div>
  );
}
