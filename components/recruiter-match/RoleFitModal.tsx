"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RoleFitWizard } from "./RoleFitWizard";

const CLOSE_ANIMATION_MS = 240;

type RoleFitModalProps = {
  defaultOpen?: boolean;
  triggerLabel?: string;
  /** If set, the trigger navigates here instead of opening the modal in place. */
  openHref?: string;
  /** If set, closing the modal navigates here instead of just hiding it. */
  closeHref?: string;
};

export function RoleFitModal({
  defaultOpen = false,
  triggerLabel = "Check role fit",
  openHref,
  closeHref,
}: RoleFitModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(defaultOpen);
  const [closing, setClosing] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openModal = () => {
    if (openHref) {
      router.push(openHref);
      return;
    }
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(false);
    setOpen(true);
  };

  const closeModal = () => {
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      if (closeHref) {
        router.push(closeHref);
        return;
      }
      setOpen(false);
      setClosing(false);
      triggerRef.current?.focus();
    }, CLOSE_ANIMATION_MS);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    modalRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {!open && (
        <button
          ref={triggerRef}
          type="button"
          className="btn btn-primary"
          onClick={openModal}
        >
          {triggerLabel}
        </button>
      )}

      {open && (
        <div
          className={`rm-overlay ${closing ? "rm-overlay-closing" : ""}`}
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className={`rm-modal ${closing ? "rm-modal-closing" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="rm-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rm-modal-head">
              <h3 id="rm-title">role-fit-check</h3>
              <button
                type="button"
                className="rm-close"
                aria-label="Close"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
            <RoleFitWizard />
          </div>
        </div>
      )}
    </>
  );
}
