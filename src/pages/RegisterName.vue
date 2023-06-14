<template>
    <RegisterHead />
    <div class="body">
        <div class="content">
            <label>
                <p>이름</p>
                <input type="text" v-model="name" />
            </label>
        </div>
        <div class="bottom">
            <button @click="$emit('step', { name })">다음</button>
        </div>
    </div>
</template>
<script setup>
import RegisterHead from "@components/RegisterHead.vue";
import { ref } from "vue";

const props = defineProps({ state: Object });

const name = ref(props.state.name);
</script>
