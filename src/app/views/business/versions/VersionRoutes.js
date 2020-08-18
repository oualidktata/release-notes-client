import { MatxLoadable } from "matx";
const Versions = MatxLoadable({
  loader: () => import("./Versions")
});
const Main = MatxLoadable({
  loader: () => import("../versions/lab-folder/Main")
});

const versionRoutes = [
  {
    path: "/versions/Versions",
    component: Versions
  },
  {
    path: "/versions/lab-folder/Main",
    component: Main
  },
  {
    path: "/versions",
    component: Versions
  },
];
export default versionRoutes;
