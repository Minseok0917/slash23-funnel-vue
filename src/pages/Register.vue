<template>
    <section class="register">
        <Funnel :step="step" :steps="steps" :state="state" />
    </section>
</template>
<script setup>
import { useState } from "@composables/useState";
import { watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Funnel from "@components/Funnel.vue";
import RegisterName from "./RegisterName.vue";
import RegisterAddress from "./RegisterAddress.vue";
import RegisterSuccess from "./RegisterSuccess.vue";

const route = useRoute();
const router = useRouter();
const [step, setStep] = useState("name");
const [state, setState] = useState({
    name: "",
    address: "",
});

function setRouteStep(stepName) {
    setStep(stepName);
    router.push({ query: { step: stepName } });
}

const queryStep = computed(() => route.query.step);
watch(queryStep, setStep);
!queryStep.value && router.replace({ query: { step: step.value } });
queryStep.value && setStep(queryStep.value);

const steps = [
    {
        stepName: "name",
        component: RegisterName,
        onStep({ name }) {
            setState({ ...state.value, name });
            setRouteStep("address");
        },
    },
    {
        stepName: "address",
        component: RegisterAddress,
        onStep({ address }) {
            setState({ ...state.value, address });
            setRouteStep("success");
        },
    },
    {
        stepName: "success",
        component: RegisterSuccess,
    },
];
</script>
