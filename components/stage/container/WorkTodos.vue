<template>
    <div class="work-todos">
        <StageWorkTodoCard v-for="card in drag.workCards"
        :key="card.stat.name"
        :card="card"
        />
    </div>
</template>
<script lang='ts' setup>
    import { useDrag } from '~~/pinia/stage/drag';

    const { drag } = useDrag();

    
</script>
<style lang='scss'>
    .work-todos {
        display: flex;
    }
</style>