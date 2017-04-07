<template>
    <div>
        <div class="keywordTop">
            <div class="event-part">
                <div class="part-bg">
                    <img src="../static/img/keyword_background.png">
                </div>
                <div class="maskopacity"></div>
                <div class="part-box">
                    <span>{{$route.params.keyword}}</span>
                </div>
            </div>
        </div>
        <articleList :res="res"  style="margin:0 auto;width:93%;"></articleList>
        <paging :totalPage="totalPage" :page="page" @pageChange="pageChange"  style="margin:0 auto;width:93%;"></paging>
    </div>

</template>

<script>
    import articleList from './../components/articleList.vue';
    import paging from './../components/paging.vue';
    import conf from './../Conf';

    export default{
        data(){
            return {
                keyword: '',
                totalPage: 0,
                page: 1,
                type:'',
                res: []
            }
        },
        watch: {},
        created: function () {
            this.keyword = this.$route.params.keyword;
            this.type = this.$route.params.type;

            this.commonSearch(this.keyword,this.type,this.page);
        },
        components: {
            articleList: articleList,
            paging: paging,
        },
        methods: {
            pageChange:function (page) {
                this.page = page;

                this.commonSearch(this.keyword,this.type,this.page);
            },
            commonSearch:function (keyword,type,page) {
                let self = this;
                this.$http.post(conf.bathPath + '/info/keywordSearch', {keyword:keyword,type:type,page:page}).then((res) => {
                    self.res = res.data.res;
                    self.totalPage = Math.ceil(res.data.total / 20);
            }, (err)=>{
                    console.log(err);
                });
            }
        }
    }

</script>

<style scoped>
    .keywordTop {
        margin: 0;
        padding: 0;
        position: relative;
        height: 300px;
        font-weight: 500;
        font-size: 30px;
    }

    .event-part {
        background-size: cover;
    }

    .part-bg > img {
        width: 100%;
        height: 100%;
        position: absolute;
        -webkit-filter: blur(7px);
    }

    .maskopacity {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.6;
        background-color: #000;
    }

    .part-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 640px;
        margin: 0 auto;
        z-index: 1;
        border: 2px solid #fbfbfb;
        border-radius: 50%;
        width: 150px;
        height: 150px;
    }

    .part-box > span {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #6bacdf;
        line-height: 150px;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;
    }

</style>