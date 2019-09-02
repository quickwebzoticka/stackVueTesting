<template>
    <div class="button">
        <button @click="btnClicked">
            <slot>Send</slot>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        customTitle: String,
        payload: Number
    },
    methods: {
        btnClicked () {
            this.$emit('btnClicked', this.payload)
        }
    }
}
</script>

<style scoped lang="scss">
    .button {
        padding: 10px 0;
    }
    button {
        background: transparent;
        color: #3eaf7c;
        transition: .3s;
        border: 1px solid #3eaf7c;
        cursor: pointer;
        width: 200px;
        height: 40px;
        outline: none;

        &:hover {
            color: #FFFFFF;
            background: #3eaf7c;
        }
    }
</style>