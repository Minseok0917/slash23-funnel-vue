<template>
    <div id="funnel-flow-chart" v-show="isFlowChart">
        <div v-html="mermaidHTML"></div>
        <div class="button-container">
            <button type="button" @click="isFlowChart = false">CLOSE</button>
        </div>
    </div>
    <button
        id="funnel-flow-chart-open"
        v-if="!isFlowChart"
        @click="isFlowChart = true"
    >
        OPEN
    </button>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, computed, onMounted, nextTick } from "vue";
import mermaid from "mermaid";

const props = defineProps({ steps: Object });
const route = useRoute();
const router = useRouter();

const steps = computed(() => props.steps);
const currentStep = computed(() => route.query.step);
const mermaidText = computed(
    () => `graph TD
        ${steps.value
            .map((step) => {
                const stepName = step.stepName;
                const handlers = Object.entries(step)
                    .filter(([key]) => key.match(/^on.*/))
                    .map(([key, value]) => [
                        key,
                        `${value}`
                            .match(/setStep\((.*)\)/)[1]
                            .replace(/[^a-zㄱ-핳0-9]/gi, ""),
                    ]);
                const lines = handlers
                    .map(
                        ([handleName, nextStepName]) =>
                            `${stepName} --> | ${handleName} | ${nextStepName}`
                    )
                    .join("\n");
                return `${lines}
                click ${stepName} meramidCallback`;
            })
            .join("\n")}
        style ${
            currentStep.value
        } fill:#ffcc3feb, storke:#fe5656, stroke-width:1px, font-weight:bold
    `
);
const isFlowChart = ref(false);
const mermaidHTML = ref("");

async function flowChartRender() {
    const { svg, bindFunctions } = await mermaid.render(
        "mermaid-funnel",
        mermaidText.value
    );
    mermaidHTML.value = svg;
    nextTick(() => {
        const $mermaidFunnel = document.getElementById("mermaid-funnel");
        bindFunctions($mermaidFunnel);
    });
}
onMounted(flowChartRender);
watch(mermaidText, flowChartRender);

mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "forest",
});

window.meramidCallback = async (stepName) => {
    router.replace({ query: { step: stepName } });
};
</script>
