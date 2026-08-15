// Pages
import Home from "./pages/Home.svelte";
import Me from "./pages/Me.svelte";
import Work from "./pages/Work.svelte";
import Works from "./pages/Works.svelte";
import Info from "./pages/Info.svelte";
import InfoDetail from "./pages/InfoDetail.svelte";
import InfoCategory from "./pages/InfoCategory.svelte";
import Huuud from "./pages/Huuud.svelte";

// Common Components
import NotFound from "./components/common/NotFound.svelte";

export const routes = {
  "/": Home,
  "/me": Me,
  "/bitpet": Work,
  "/works": Works,
  "/huuud": Huuud,
  "/info": Info,
  "/info/:id": InfoDetail,
  "/info/categories/:categoryId": InfoCategory,
  "*": NotFound,
};
