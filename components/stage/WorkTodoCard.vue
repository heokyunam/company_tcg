<template>
    <div class="work-todo card" v-if="stat">
        <div class="name">{{ stat.name }}</div>
        <div class="stat">
            <div class="social">{{ stat.social_condition }}</div>
            <div class="develop">{{ stat.develop_condition }}</div>
        </div>
    </div>
</template>
<script lang='ts' setup>
    import { WorkStat } from "~~/composables/dummy";

    const { stat } = defineProps({
        stat: WorkStat
    })
</script>
<style lang='scss'>
    .work-todo {
        .name {
            font-size: 0.7em;
        }
    }
</style>