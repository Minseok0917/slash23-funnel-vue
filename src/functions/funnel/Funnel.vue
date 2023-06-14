<template>
    <template v-if="currentStep">
        <component
            :is="currentStep.component"
            :state="state"
            v-on="currentStepHandlers"
        ></component>
    </template>
    <FunnelFlowChart :steps="steps" />
</template>
<script setup>
import FunnelFlowChart from "./FunnelFlowChart.vue";
import { computed } from "vue";

const props = defineProps({
    step: String,
    steps: Object,
    state: Object,
});

const currentStep = computed(() => {
    const { step, steps } = props;
    return steps.find(({ stepName }) => stepName === step);
});

const currentStepHandlers = computed(() => {
    return Object.fromEntries(
        Object.entries(currentStep.value)
            .filter(([name]) => name.match(/^on.+/))
            .map(([name, value]) => [name.replace("on", ""), value])
    );
});
</script>
