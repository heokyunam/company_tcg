<template>
    <div class="work-todo card" v-if="card && card.stat">
        <div class="name">{{ card.stat.name }}</div>
        <div class="stat">
            <div class="social">{{ card.stat.social_condition }}</div>
            <div class="develop">{{ card.stat.develop_condition }}</div>
        </div>
    </div>
</template>
<script lang='ts' setup>
    import { WorkCard } from "~~/pinia/stage/drag";

    const { card } = defineProps({
        card: WorkCard
    })
</script>
<style lang='scss'>
    .work-todo {
        .name {
            font-size: 0.7em;
        }
    }
</style>