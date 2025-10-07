import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ListView from "./pages/ListView/ListView";
import GalleryView from "./pages/GalleryView/GalleryView";
import DetailView from "./pages/DetailView/DetailView";
import NotFound from "./pages/NotFound/NotFound";

// For GitHub Pages deployment per README:
const BASENAME = "/mp2"; // change to "/<your-github-repo-name>"
export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ListView />} />
          <Route path="gallery" element={<GalleryView />} />
          <Route path="pokemon/:id" element={<DetailView />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
