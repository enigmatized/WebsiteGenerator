import { useEffect, useRef } from "react";
import ePub from "epubjs";

export default function BookReader({ file }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    const book = ePub(file);

    // “continuous” manager + “scrolled” flow keeps loading
    const rendition = book.renderTo(viewerRef.current, {
      width:  "100%",
      height: "80vh",
      manager: "continuous",
      flow:    "scrolled",      // or "scrolled-doc" in older builds
    });

    rendition.display();        // first spine item

    /* 👇  Lazy-preload the next chapter whenever the user relocates */
    book.ready.then(() => {
      rendition.on("relocated", ({ start }) => {
        const next = start.index + 1;
        if (next < book.spine.length) {
          book.spine.get(next).load();   // silent preload
        }
      });
    });

    return () => book.destroy();
  }, [file]);

  return <div ref={viewerRef} style={{ overflow: "auto" }} />;
}
