import { MatxLoadable } from "matx";
const Versions = MatxLoadable({
  loader: () => import("./Versions")
});

const versionRoutes = [
  {
    path: "/versions/Versions",
    component: Versions
  },
  {
    path: "/versions",
    component: Versions
  }
];
export default versionRoutes;
