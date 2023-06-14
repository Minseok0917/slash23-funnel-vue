<template>
    <div v-html="mermaidHTML"></div>
</template>
<script setup>
import { ref, onMounted, nextTick } from "vue";
import mermaid from "mermaid";
const mermaidHTML = ref("");
const m = `
    graph TD
        A[첫번째] --> | onClick | B[두번째]
        A[첫번째] --> | onClick | C[세번째]
        B[두번째] --> | onClick | C[세번째]

        click A callback;
`;

onMounted(async () => {
    mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "forest",
    });
    const { svg, bindFunctions } = await mermaid.render("mermaid-funnel", m);
    mermaidHTML.value = svg;
    nextTick(() => {
        const $mermaidFunnel = document.getElementById("mermaid-funnel");
        bindFunctions($mermaidFunnel);
    });
});

window.callback = async (stepName) => {
    console.log(stepName, 1);
};
</script>
