<template>
    <section class="register">
        <Funnel :step="step" :steps="steps" :state="state" />
        <pre class="mermaid">{{ m }}</pre>
    </section>
</template>
<script setup>
import { Funnel, useFunnel } from "@functions/funnel";
import { onMounted } from "vue";
import RegisterName from "./RegisterName.vue";
import RegisterAddress from "./RegisterAddress.vue";
import RegisterSuccess from "./RegisterSuccess.vue";
import mermaid from "mermaid";

const m = `
    graphe TD
        A[Enter Chart Definition] --> B(Preview)
        B --> C{decide}
        C --> D[Keep]
        C --> E[Edit Definition]
        E --> B
        D --> F[Save Image and Code]
        F --> B 
`;

// onMounted(() => {
mermaid.initialize({ startOnLoad: true });
// });
const { step, steps, state } = useFunnel({
    stepName: "name",
    state: {
        name: "",
        address: "",
    },
    steps: ({ setStep, setState }) => [
        {
            stepName: "name",
            component: RegisterName,
            onStep({ name }) {
                setState({ ...state.value, name });
                setStep("address");
            },
        },
        {
            stepName: "address",
            component: RegisterAddress,
            onStep({ address }) {
                setState({ ...state.value, address });
                setStep("success");
            },
        },
        {
            stepName: "success",
            component: RegisterSuccess,
        },
    ],
});
</script>
