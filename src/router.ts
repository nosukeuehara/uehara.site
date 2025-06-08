// Pages
import Home from "./pages/Home.svelte";
import Me from "./pages/Me.svelte";
import Works from "./pages/Works.svelte";
import Ramble from "./pages/Ramble.svelte";
import Info from "./pages/Info.svelte";
import InfoDetail from "./pages/InfoDetail.svelte";

// Common Components
import NotFound from "./components/common/NotFound.svelte";

export const routes = {
  "/": Home,
  "/me": Me,
  "/works": Works,
  "/ramble": Ramble,
  "/info": Info,
  "/info/:id": InfoDetail,
  "*": NotFound,
};