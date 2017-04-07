<template>
    <div>
        <footer>
            <div class="hei">
                <span>Copyright 2016</span>
            </div>
        </footer>
    </div>

</template>
<script>
    export default{}

</script>
<style scoped>
    footer {
        width: 100%;
    }
    footer>div.hei {
        color: #fff;
        width: 100%;
        background-color: #464646;
        height: 90px;
        position: relative;
    }
    footer>div.hei>span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>