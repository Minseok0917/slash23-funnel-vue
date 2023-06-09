<template>
    <template v-if="currentStep">
        <component
            :is="currentStep.component"
            :state="state"
            @step="currentStep.onStep"
        ></component>
    </template>
</template>
<script setup>
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
</script>
