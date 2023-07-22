

<template>
    <div class="employee" v-if="stat">
        <div class="name">{{ stat.name }}</div>
        <div class="social">{{ stat.social_enery }}</div>
        <div class="develop">{{ stat.develop_energy }}</div>
    </div>
</template>
<script lang='ts' setup>
    import { EmployeeStats } from "~~/composables/dummy";
    
    const { stat } = defineProps({
        stat: EmployeeStats
    })
</script>
<style lang='scss'>
    
</style>