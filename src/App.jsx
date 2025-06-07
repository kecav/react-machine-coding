import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useLocation,
  Outlet,
} from "react-router-dom";
import "./App.css";

// Separate lists for components and hooks
const COMPONENTS = [
  {
    title: "InteractiveGrid",
    loader: () => import("./components/interactive-grid"),
  },
  { title: "ProductBill", loader: () => import("./components/product-bill") },
  { title: "TabForm", loader: () => import("./components/tab-form") },
  { title: "ProgressBar", loader: () => import("./components/progress-bar") },
  { title: "OTPInput", loader: () => import("./components/otp-input") },
  { title: "Pagination", loader: () => import("./components/pagination") },
  {
    title: "PaginatedProducts",
    loader: () => import("./components/paginated-products"),
  },
  { title: "AutoComplete", loader: () => import("./components/autocomplete") },
  { title: "TicTacToe", loader: () => import("./components/tic-tac-toe") },
  { title: "Chips", loader: () => import("./components/chips") },
  { title: "Countdown", loader: () => import("./components/countdown") },
  {
    title: "NestedCheckbox",
    loader: () => import("./components/nested-checkbox"),
  },
  {
    title: "FolderStructure",
    loader: () => import("./components/folder-structure"),
  },
  {
    title: "Toasts",
    loader: () => import("./components/toasts"),
  },
];

const HOOKS = [
  { title: "useBooleanHook", loader: () => import("./components/useBoolean") },
];

const AllComponents = () => {
  const sortedComponents = COMPONENTS.slice().sort((c1, c2) =>
    c1.title.localeCompare(c2.title)
  );
  return (
    <div className="all-projects">
      {sortedComponents.map(({ title }, i) => (
        <Link
          to={`/components/${COMPONENTS.findIndex((c) => c.title === title)}`}
          key={title}
        >
          <button className="project-btn">{title}</button>
        </Link>
      ))}
    </div>
  );
};

const AllHooks = () => (
  <div className="all-projects">
    {HOOKS.map(({ title }, i) => (
      <Link to={`/hooks/${i}`} key={i}>
        <button className="project-btn">{title}</button>
      </Link>
    ))}
  </div>
);

const ComponentLoader = () => {
  const { id } = useParams();
  const idx = Number(id);
  if (isNaN(idx) || idx < 0 || idx >= COMPONENTS.length) {
    return <div>Component not found</div>;
  }
  const SelectedComponent = lazy(COMPONENTS[idx].loader);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SelectedComponent />
    </Suspense>
  );
};

const HookLoader = () => {
  const { id } = useParams();
  const idx = Number(id);
  if (isNaN(idx) || idx < 0 || idx >= HOOKS.length) {
    return <div>Hook not found</div>;
  }
  const SelectedHook = lazy(HOOKS[idx].loader);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SelectedHook />
    </Suspense>
  );
};

const Home = () => (
  <div className="all-projects">
    <Link to="/components">
      <button className="project-btn">All Components</button>
    </Link>
    <Link to="/hooks">
      <button className="project-btn">All Hooks</button>
    </Link>
  </div>
);

// Layout with back button (except on root)
const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRoot = location.pathname === "/";
  return (
    <div className="layout">
      {!isRoot && (
        <button className="back-btn" onClick={() => navigate(-1)}>
          {"<"}
        </button>
      )}
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/components" element={<AllComponents />} />
          <Route path="/components/:id" element={<ComponentLoader />} />
          <Route path="/hooks" element={<AllHooks />} />
          <Route path="/hooks/:id" element={<HookLoader />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
