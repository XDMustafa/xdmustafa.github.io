import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppProvider, useRoute } from "@/lib/app";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { PostPage } from "@/pages/Post";

function App() {
  const [page, slug] = useRoute();
  // A new post starts at the top; home keeps the browser's own scroll.
  useEffect(() => {
    if (page === "post") window.scrollTo(0, 0);
  }, [page, slug]);
  return <Layout>{page === "post" && slug ? <PostPage slug={slug} /> : <Home />}</Layout>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
