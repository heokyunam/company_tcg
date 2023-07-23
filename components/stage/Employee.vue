

<template>
    <div class="employee card" v-if="stat">
        <div class="name">{{ stat.name }}</div>
        <div class="stat">
            <div class="social">{{ stat.social_enery }}</div>
            <div class="develop">{{ stat.develop_energy }}</div>
        </div>
    </div>
</template>
<script lang='ts' setup>
    import { EmployeeStats } from "~~/composables/dummy";
    
    const { stat } = defineProps({
        stat: EmployeeStats
    })
</script>
<style lang='scss'>
    .card {
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 50px;
        height: 80px;
        padding: 10px;

        .stat {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
    }
</style>