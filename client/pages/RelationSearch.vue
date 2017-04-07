<template>
    <div>
        <relationEntities></relationEntities>
        <div id="portrait">
            <div class="portrait col-sm-12 insimg ">
                <img class="pic" @click="showSwiper(0)" src="./../static/img/instanceimga-3.jpg" alt="">
                <img class="picr" @click="showSwiper(1)" src="./../static/img/instanceimga-4.jpg" alt="">
            </div>
            <div class="swipermain" v-if="isDisplay">
                <swiper :imgWidth="1050" :imgList="imgList" :initIndex="nowindex" :loop="true"
                        @closeSwiper="closeSwiper"></swiper>
            </div>
        </div>
    </div>
</template>

<script>
    import conf from './../Conf';
    import relationEntities from './../components/relatedEntities.vue';
    import swiper from './../components/swiper.vue';

    import image3 from './../static/img/instanceimga-3.jpg';
    import image4 from './../static/img/instanceimga-4.jpg';

    export default {
        name: 'portrait',
        data () {
            return {
                imgList: [
                    {
                        img: image3
                    },
                    {
                        img: image4
                    }
                ],
                isDisplay: false,
                nowindex:0
            }
        },
        components: {
            swiper: swiper,
            relationEntities: relationEntities,
        },
        methods: {
            showSwiper: function (index) {
                this.nowindex =index;
                this.isDisplay = true;
            },
            closeSwiper(){
                this.isDisplay = false;

            },
        }
    }

</script>

<style lang="css" scoped>
    .portrait {
        padding: 0 22%;
        margin-bottom: 80px;
    }

    .insimg img {
        display: inline-block;
        width: 48%;
        margin-top: 30px;
        cursor: pointer;
    }

    .swipermain {
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0px;
        z-index: 10000;
        width: 100%;
        height: 100%;
        padding: 7% 25%;
    }
</style>