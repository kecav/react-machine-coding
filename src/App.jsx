import { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import "./App.css";

const PROJECTS = [
  { title: "InteractiveGrid", loader: () => import("./components/interactive-grid") },
  { title: "ProductBill", loader: () => import("./components/product-bill") },
  { title: "TabForm", loader: () => import("./components/tab-form") },
  { title: "ProgressBar", loader: () => import("./components/progress-bar") },
  { title: "OTPInput", loader: () => import("./components/otp-input") },
  { title: "Pagination", loader: () => import("./components/pagination") },
  { title: "PaginatedProducts", loader: () => import("./components/paginated-products") },
  { title: "AutoComplete", loader: () => import("./components/autocomplete") },
  { title: "TicTacToe", loader: () => import("./components/tic-tac-toe") },
  { title: "Chips", loader: () => import("./components/chips") },
  { title: "Countdown", loader: () => import("./components/countdown") },
  { title: "NestedCheckbox", loader: () => import("./components/nested-checkbox") },
  { title: "FolderStructure", loader: () => import("./components/folder-structure") },
];

const AllProjects = () => {
  return (
    <div className="all-projects">
      {PROJECTS.map(({ title }, i) => (
        <Link to={`/project/${i}`} key={i}>
          <button className="project-btn">{title}</button>
        </Link>
      ))}
    </div>
  );
};

const ProjectLoader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const idx = Number(id);
  if (isNaN(idx) || idx < 0 || idx >= PROJECTS.length) {
    return <div>Project not found</div>;
  }
  const SelectedComponent = lazy(PROJECTS[idx].loader);

  return (
    <>
      <button className="back-btn" onClick={() => navigate("/")}>
        {"<"}
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <SelectedComponent />
      </Suspense>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllProjects />} />
        <Route path="/project/:id" element={<ProjectLoader />} />
      </Routes>
    </Router>
  );
}

export default App;