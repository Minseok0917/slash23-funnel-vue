<template>
    <RegisterHead />
    <div class="body">
        <div class="content">
            <label>
                <p>주소</p>
                <input type="text" v-model="address" />
            </label>
        </div>
        <div class="bottom">
            <button @click="$emit('step', { address })">보기</button>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import RegisterHead from "@components/RegisterHead.vue";

const props = defineProps({ state: Object });

const address = ref(props.state.address);
</script>
