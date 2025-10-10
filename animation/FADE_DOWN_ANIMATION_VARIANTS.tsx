"use client";

import { InView } from "@/components/ui/in-view";

export default function FADE_DOWN_ANIMATION_VARIANTS({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      viewOptions={{ margin: "0px 0px -200px 0px", once: true }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      {children}
    </InView>
  );
}
