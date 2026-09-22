"use client";

import * as React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink, ImageIcon, PlayCircle, X } from "lucide-react";
import { works, companies, type WorkItem } from "@/data/works";
import { cn } from "@/lib/utils";

const filters = ["전체", ...companies];

// media 값과 무관하게, 실제 파일 확장자를 보고 이미지/영상 여부를 판단합니다.
// (프로젝트가 "video"로 분류돼 있어도 아직 이미지(포스터)만 넣어둔 경우를 안전하게 처리)
function isVideoFile(src?: string) {
  return Boolean(src && /\.(mp4|webm|mov|m4v)$/i.test(src));
}

export function WorksGrid() {
  const [active, setActive] = React.useState<string>("전체");
  const [preview, setPreview] = React.useState<WorkItem | null>(null);

  const filtered =
    active === "전체" ? works : works.filter((w) => w.company === active);

  // 이미지 팝업이 열려 있는 동안 배경 스크롤 방지
  React.useEffect(() => {
    document.body.style.overflow = preview ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [preview]);

  return (
    <div>
      <LayoutGroup>
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          총 {filtered.length}개 프로젝트
        </p>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((work, i) => {
              const clickable = Boolean(work.link) || Boolean(work.image);

              return (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, delay: i * 0.02 }}
                  className={cn(
                    "group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10",
                    clickable && "hover:-translate-y-1",
                  )}
                >
                  {/* 카드 전체를 클릭 영역으로 — 링크가 있으면 새 창, 없고 이미지가 있으면 팝업 */}
                  {work.link ? (
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10 rounded-2xl"
                      aria-label={`${work.title} 새 창에서 열기`}
                    />
                  ) : work.image ? (
                    <button
                      onClick={() => setPreview(work)}
                      className="absolute inset-0 z-10 rounded-2xl"
                      aria-label={`${work.title} 이미지 크게 보기`}
                    />
                  ) : null}

                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                      {work.company}
                    </span>
                    {work.link ? (
                      <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    ) : work.image ? (
                      isVideoFile(work.image) ? (
                        <PlayCircle className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                      ) : (
                        <ImageIcon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                      )
                    ) : null}
                  </div>

                  <h3 className="mb-3 text-lg font-bold leading-snug">
                    {work.title}
                  </h3>

                  <ul className="mb-5 flex-1 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                    {work.points.map((p, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {work.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* 링크가 없는 프로젝트를 클릭했을 때 뜨는 이미지 팝업 */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-6 backdrop-blur-sm"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              <button
                onClick={() => setPreview(null)}
                aria-label="닫기"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
              {preview.image ? (
                isVideoFile(preview.image) ? (
                  <video
                    src={preview.image}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[50vh] w-full bg-black object-contain"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview.image}
                    alt={preview.title}
                    className="max-h-[50vh] w-full object-contain"
                  />
                )
              ) : null}
              <div className="border-t border-border p-5">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  {preview.company}
                </p>
                <h3 className="text-lg font-bold">{preview.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
