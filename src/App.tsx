import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ListView from "./pages/ListView/ListView";
import GalleryView from "./pages/GalleryView/GalleryView";
import DetailView from "./pages/DetailView/DetailView";

// For GitHub Pages deployment per README:
const BASENAME = "/mp2"; // change to "/<your-github-repo-name>"
export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Layout>
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/pokemon/:id" element={<DetailView />} />
          <Route path="*" element={<div>Not found. <Link to="/">Go Home</Link></div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
