


<template>
    <div class="employee-container card-container">
        <div class="employee card" v-if="card && card.empty === false" @click="onClick(card)"
            :class="{selected: card.selected}">
            <div class="name">{{ card.name }}</div>
            <div class="stat">
                <div class="social">S{{ card.social_enery }}</div>
                <div class="develop">D{{ card.develop_energy }}</div>
            </div>
        </div>
        <div class="empty" v-else>
        </div>
    </div>
</template>
<script lang='ts' setup>
    import { ApplicantCard, useDrag } from "~~/pinia/stage/drag";

    const { card } = defineProps({
        card: ApplicantCard
    })

    const onClick = (card: ApplicantCard) => {
        const { activateEmployee } = useDrag();

        activateEmployee(card);
    }

</script>
<style lang='scss'>
    .card-container {
        display: flex;

        &.employee-container {
            width: 80px;
            height: 80px;
        }

        .employee.card {
            height: 100px;
        }

        .card {
            border: 1px solid black;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            width: 100%;

            .stat {
                display: flex;
                justify-content: space-between;
                width: 100%;
            }

            &.selected {
                border-width: 3px;
            }
        }
    }
</style>