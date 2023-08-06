<template>
    <div class="applicants">
        <StageEmployee v-for="card in drag.applicantCards"
        :key="card.stat.name"
        :card="card"
        />
    </div>
</template>
<script lang="ts" setup>
    import { DragReactive, useDrag } from '~~/pinia/stage/drag';

    const { drag } = useDrag() as {drag: DragReactive};

    
</script>
<style lang="scss">
    .applicants {
        display: flex;
    }
</style>