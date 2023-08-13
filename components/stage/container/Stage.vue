<template>
    <div class="stage">
        <div class="solved-work">
            <div class="label">
                Done
            </div>
        </div>
        <StageContainerWorkTodos />
        <div class="mt-100 mb-50">
            <StageContainerApplicants />
        </div>
        <StagePlayer />
        <button @click="endTurn">턴 종료</button>
    </div>
</template>
<script lang='ts' setup>
    import { useDrag } from "~~/pinia/stage/drag";

    const { onInit, endTurn } = useDrag();

    onMounted(() => {
        onInit();
    })
</script>
<style lang='scss'>
    .stage {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        // padding-top: 200px;

        .solved-work {
            width: 80px;
            height: 80px;
            border: 1px dashed black;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .mt-100 {
            margin-top: 100px;
        }

        .mb-50 {
            margin-bottom: 50px;
        }
    }
</style>