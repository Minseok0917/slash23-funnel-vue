import { useState } from "@composables/useState";
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useFunnel({ stepName, steps, state: initialState }) {
    const route = useRoute();
    const router = useRouter();
    const [step, setStep] = useState(route.query.step || stepName);
    const [state, setState] = useState(initialState);
    const routeQueryStep = computed(() => route.query.step);

    function updateQueryStep(stepName) {
        setStep(stepName);
        router.push({ query: { step: stepName } });
    }

    watch(routeQueryStep, setStep);
    router.replace({ query: { step: step.value } });

    return {
        step,
        state,
        steps: steps({ setState, setStep: updateQueryStep }),
    };
}
