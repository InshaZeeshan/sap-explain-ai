import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MainLayout } from "./components/layout/MainLayout";
import { Home } from "./pages/Home";
import { SearchResults } from "./pages/SearchResults";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;