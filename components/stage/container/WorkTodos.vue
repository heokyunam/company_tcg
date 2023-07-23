<template>
    <div class="work-todos">
        <StageWorkTodoCard v-for="stat in dummyWorkStats"
        :key="stat.name"
        :stat="new WorkStat(stat)"
        />
    </div>
</template>
<script lang='ts' setup>
import { WorkStat } from '~~/composables/dummy';

    
</script>
<style lang='scss'>
    .work-todos {
        display: flex;
    }
</style>