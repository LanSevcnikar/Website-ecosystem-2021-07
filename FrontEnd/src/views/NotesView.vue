<template>
    <div class="row g-0">
        <div class="col-3">
            <notes-side></notes-side>
        </div>
        <div class="col-9">
            <div class="row g-0">
                <div class="col">
                    <notes></notes>
                </div>
                <div class="col child-outlet">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Notes from '../components/Notes.vue'
import NotesSide from '../components/NotesSide.vue'

export default {
    components: {
        Notes,
        NotesSide,
    }
}
</script>

<style scoped>
.child-outlet:empty{
    flex: unset;
}
</style>