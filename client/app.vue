<template>
    <div>
        <headComponent v-if="header"></headComponent>
        <div  id="main">
            <router-view></router-view>
        </div>

        <footerComponent id="footer" v-if="footer"></footerComponent>
    </div>
</template>

<script>
    import headComponent from './components/head.vue';
    import footerComponent from './components/footer.vue';

    export default {
        data(){
            return {
                header:this.$route.matched[1].name!='login',
                footer:this.$route.matched[1].name!='login',
            }
        },
        components: {
            headComponent: headComponent,
            footerComponent:footerComponent
        },
        watch: {
            $route:function(){
                this.header=(this.$route.matched[1].name!='login');
                this.footer=(this.$route.matched[1].name!='login');
            }
        },
        methods: {

        },

        updated:function(){
            footer()
        },

    }
    layui.use(['layer','laydate']);
    function footer(){//页面最小高度,保证footer在最下面
        document.querySelector('#main').style.minHeight=window.innerHeight-140+'px';
    }
    window.addEventListener('load', function () {
        footer();
    })
    window.addEventListener('resize', function () {
        footer();
    });


</script>
<style lang="css">
    h1, h2, h3, h4, h5, h6, p, span, button, input, a, img, dl, dt, dd, table, option, textarea {
        margin: 0;
        padding: 0;
        list-style: none;
        font-weight: normal;
        border: 0;
    }
    a {
        cursor: pointer;
    }
    body {
        font-family: 'Arial', 'STHeitiSC-Light', 'Heiti SC Light', 'Heiti SC', 'STHeiti', 'Microsoft YaHei', 'arial';
        font-weight: 200;
        color: #000;
        padding-top: 50px;
    }
    #main{
        overflow: hidden;
        min-height:400px;
        position: relative;
    }
    ul,li,ol{
        list-style: none;
    }
    img{
        max-width: 100%;
    }

</style>