


<template>
    <div class="employee card" v-if="card && card.stat" @click="onClick(card)"
        :class="{selected: card.selected}">
        <div class="name">{{ card.stat.name }}</div>
        <div class="stat">
            <div class="social">{{ card.stat.social_enery }}</div>
            <div class="develop">{{ card.stat.develop_energy }}</div>
        </div>
    </div>
</template>
<script lang='ts' setup>
    import { useDrag } from '~~/pinia/stage/drag';
    import { ApplicantCard } from "~~/pinia/stage/drag";

    const { card } = defineProps({
        card: ApplicantCard
    })

    const onClick = (card: ApplicantCard) => {
        const { activateEmployee } = useDrag();

        activateEmployee(card);
    }

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

        &.selected {
            border-width: 3px;
        }
    }
</style>