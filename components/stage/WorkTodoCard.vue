<template>
    <div class="work-container card-container" v-if="card">
        <div class="work-todo card" v-if="card.stat" @click="onClick(card)"
            :class="card.css_class"
            >
            <div class="name">{{ card.stat.name }}</div>
            <div class="stat">
                <div class="social" :class="card.social_status">
                    S{{ card.social_point }}
                </div>
                <div class="develop" :class="card.develop_status">
                    D{{ card.develop_point }}
                </div>
            </div>
        </div>
        <div class="employee card" v-for="employee in card.assignedEmployees" :key="employee.name">
            <div class="name">{{ employee.name }}</div>
            <div class="stat">
                <div class="social">S{{ employee.social_enery }}</div>
                <div class="develop">D{{ employee.develop_energy }}</div>
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

            &.solved {
                transition-property: all;
                transition-duration: 10s;
                transform: translate(0px, -300px);
            }

            .name {
                font-size: 0.7em;
            }

            .stat {
                font-weight: 700;

                div {
                    padding: 5px;
                }

                .idle {
                    color: grey;
                }
                .proceeding {
                    color: grey;
                }
                .solved {
                    color: white;
                }

                .social {
                    background-color: #F9D857;
                }

                .develop {
                    background-color: #274374;
                }
            }
        }
    }
</style>