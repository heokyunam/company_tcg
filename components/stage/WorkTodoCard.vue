<template>
    <div class="work-container card-container">
        <div class="work-todo card" v-if="card && card.stat" @click="onClick(card)">
            <div class="name">{{ card.stat.name }}</div>
            <div class="stat">
                <div class="social">{{ card.stat.social_condition }}</div>
                <div class="develop">{{ card.stat.develop_condition }}</div>
            </div>
        </div>
        <!-- <div class="employee card" v-if="card?.stat.social_condition == 0">
            <div class="name">테스트</div>
            <div class="stat">
                <div class="social">테</div>
                <div class="develop">스트</div>
            </div>
        </div>
        <div class="employee card">
            <div class="name">테스트</div>
            <div class="stat">
                <div class="social">테</div>
                <div class="develop">스트</div>
            </div>
        </div> -->
        <div class="employee card" v-for="employee in card.assignedEmployees" :key="employee.name">
            <div class="name">{{ employee.name }}</div>
            <div class="stat">
                <div class="social">{{ employee.social_enery }}</div>
                <div class="develop">{{ employee.develop_energy }}</div>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
    import { useDrag, WorkCard } from "~~/pinia/stage/drag";

    const { card } = defineProps({
        card: WorkCard
    })

    const onClick = (card: WorkCard) => {
        const { assignWork } = useDrag();

        assignWork(card);
    }
</script>
<style lang='scss'>
    .work-container.card-container {
        width: 80px;
        height: 400px;
        display: flex;
        flex-direction: column-reverse;

        .card {
            width: auto;
        }

        .work-todo {
            height: 100px;
            .name {
                font-size: 0.7em;
            }
        }
    }
</style>