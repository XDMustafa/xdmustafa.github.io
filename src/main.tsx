import { StrictMode, Suspense, lazy, useEffect } from "react";
import { createRoot } from "react-dom/client";
// Entry-point import: KaTeX styles must ship in the main bundle, not a lazy
// chunk (Rolldown's per-chunk CSS never made it into the deploy).
import "katex/dist/katex.min.css";
import "./index.css";
import { AppProvider, useRoute } from "@/lib/app";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";

// The post page carries KaTeX + the heavy blackbody content. Only fetched
// when a post is actually opened, so the home route ships without it.
const PostPage = lazy(() => import("@/pages/Post"));

function App() {
  const [page, slug] = useRoute();
  // A new post starts at the top; home keeps the browser's own scroll.
  useEffect(() => {
    if (page === "post") window.scrollTo(0, 0);
  }, [page, slug]);
  return (
    <Layout>
      {page === "post" && slug ? (
        <Suspense fallback={<div className="py-16 text-center text-muted-foreground">…</div>}>
          <PostPage slug={slug} />
        </Suspense>
      ) : (
        <Home />
      )}
    </Layout>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
