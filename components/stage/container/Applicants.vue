<template>
    <div class="applicants">
        <StageEmployee v-for="stat in dummyEmployeeStats"
        :key="stat.name"
        :stat="new EmployeeStats(stat)"
        />
    </div>
</template>
<script lang="ts" setup>
    import { dummyEmployeeStats } from '~~/composables/dummy';
</script>
<style lang="scss">
    .applicants {
        display: flex;
    }
</style>