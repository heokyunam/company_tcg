<template>
    <div class="player">
        <div class="profile">
            PLAYER
        </div>
        <div class="stat">
            <div class="heart">
                {{ player.heart }}
            </div>
            <div class="gold">
                {{ player.gold }}
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
    import { usePlayer } from '~~/pinia/stage/player';

    const { player } = usePlayer();
</script>
<style lang='scss'>
    .player {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100px;
        
        .stat {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
</style>