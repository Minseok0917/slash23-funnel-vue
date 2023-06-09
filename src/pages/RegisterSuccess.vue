<template>
    <div class="body">
        <div class="content">
            <div class="center">
                <div>
                    <div class="image-box">
                        <img src="/images/happy.jpg" alt="happy" />
                    </div>
                    <h1>{{ state.name }}님 지금 만나러갑니다</h1>
                    <p>{{ state.address }}</p>
                    <div class="btn-container">
                        <button type="button" @click="router.push('/')">
                            확인 했습니다
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
    state: Object,
});
</script>
