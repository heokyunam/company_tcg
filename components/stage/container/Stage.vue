<template>
    <div class="stage">
        <StageContainerWorkTodos />
        <div class="mt-100 mb-50">
            <StageContainerApplicants />
        </div>
        <StagePlayer />
    </div>
</template>
<script lang='ts' setup>
    import { useDrag } from "~~/pinia/stage/drag";

    const { onInit } = useDrag();

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
        padding-top: 200px;

        .mt-100 {
            margin-top: 100px;
        }

        .mb-50 {
            margin-bottom: 50px;
        }
    }
</style>