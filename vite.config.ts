import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});



// vite.config.ts
// import { defineConfig } from "vite";
// import { reactRouter } from "@react-router/dev/vite";
// import tailwindcss from "@tailwindcss/vite";
// import tsconfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
//   publicDir: "public",
//   server: {
//     fs: { allow: ["public"] }, // let Vite serve files in /public
//   },
// });

// vite.config.ts
// import { defineConfig } from "vite";
// import { reactRouter } from "@react-router/dev/vite";
// import tailwindcss from "@tailwindcss/vite";
// import tsconfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
//   publicDir: "public",
//   server: {
//     fs: {
//       allow: [
//         "public",         // already allowed
//         "app",            // 👈 add this
//         ".",              // allow project root
//       ],
//     },
//   },
// });


