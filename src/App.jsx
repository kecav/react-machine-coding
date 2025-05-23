import { useState, Suspense, lazy } from "react";
import "./App.css";

const PROJECTS = [
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
];

const AllProjects = ({ setShow }) => {
  const onClickHandler = (index) => {
    setShow(index);
  };

  return (
    <div className="all-projects">
      {PROJECTS.map(({ title }, i) => (
        <button
          className="project-btn"
          key={i}
          onClick={() => onClickHandler(i)}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

function App() {
  const [show, setShow] = useState(-1);

  if (show === -1) return <AllProjects setShow={setShow} />;

  // Dynamically load the selected component
  const SelectedComponent = lazy(PROJECTS[show].loader);

  return (
    <>
      <button className="back-btn" onClick={() => setShow(-1)}>
        {"<"}
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <SelectedComponent />
      </Suspense>
    </>
  );
}

export default App;

// import { useState } from "react";
// import "./App.css";
// import InteractiveGrid from "./components/interactive-grid";
// import ProductBill from "./components/product-bill";
// import TabForm from "./components/tab-form";
// import ProgressBar from "./components/progress-bar";
// import OTPInput from "./components/otp-input";
// import Pagination from "./components/pagination";
// import PaginatedProducts from "./components/paginated-products";
// import AutoComplete from "./components/autocomplete";
// import TicTacToe from "./components/tic-tac-toe";
// import Chips from "./components/chips";

// const PROJECTS = [
//   { title: "InteractiveGrid", component: <InteractiveGrid /> },
//   { title: "ProductBill", component: <ProductBill /> },
//   { title: "TabForm", component: <TabForm /> },
//   { title: "ProgressBar", component: <ProgressBar /> },
//   { title: "OTPInput", component: <OTPInput /> },
//   { title: "Pagination", component: <Pagination /> },
//   { title: "PaginatedProducts", component: <PaginatedProducts /> },
//   { title: "AutoComplete", component: <AutoComplete /> },
//   { title: "TicTacToe", component: <TicTacToe /> },
//   { title: "Chips", component: <Chips /> },
// ];

// const AllProjects = ({ setShow }) => {
//   const onClickHandler = (index) => {
//     setShow(index);
//   };

//   return (
//     <div className="all-projects">
//       {PROJECTS.map(({ title }, i) => {
//         return (
//           <button
//             className="project-btn"
//             key={i}
//             onClick={() => onClickHandler(i)}
//           >
//             {title}
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// function App() {
//   const [show, setShow] = useState(-1);

//   if (show === -1) return <AllProjects setShow={setShow} />;

//   return PROJECTS[show].component;
// }

// export default App;
