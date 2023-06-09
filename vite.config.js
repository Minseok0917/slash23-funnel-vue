import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const resolveAlias = Object.fromEntries(
    Object.entries({
        "@components": "./src/components",
        "@composables": "./src/composables",
        "@cstore": "./src/composable/store",
        "@directive": "./src/directive",
        "@pages": "./src/pages",
        "@api": "./src/api",
        "@plugins": "./src/plugins",
        "@router": "./src/router",
        "@stores": "./src/stores",
        "@scss": "./src/assets/scss",
        "@utils": "./src/utils",
    }).map(([key, value]) => [key, path.resolve(__dirname, value)])
);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: resolveAlias,
    },
    server: {
        host: true,
    },
});
