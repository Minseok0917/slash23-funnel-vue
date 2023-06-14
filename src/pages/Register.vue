<template>
    <section class="register">
        <Funnel :step="step" :steps="steps" :state="state" />
    </section>
</template>
<script setup>
import { Funnel, useFunnel } from "@functions/funnel";
import RegisterName from "./RegisterName.vue";
import RegisterAddress from "./RegisterAddress.vue";
import RegisterSuccess from "./RegisterSuccess.vue";

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
            onStepMADM({ name }) {
                setState({ ...state.value, name });
                setStep("success");
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
<script></script>
