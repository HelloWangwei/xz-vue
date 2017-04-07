<template>
    <div class="maincontainer">
        <relatedEntities @force="force" :types="types" :searchValue="keyword" :charthide="false"></relatedEntities>
        <hr class="soften">
        <div class="entityarticle">
            <div class="col-sm-3">
                <entitiesBar @chosedInfos="chosedInfos" :pentities="entities" :pchosedList="chosedList" :pkeyword="keyword"></entitiesBar>
            </div>
            <div class="col-sm-9">
                <articleList :res="infos"></articleList>
            </div>
        </div>
        <paging :totalPage="totalPage" :page="page" @pageChange="pageChange"></paging>
    </div>
</template>

<script>
    import conf from './../Conf';
    import relatedEntities from './../components/relatedEntities.vue';
    import entitiesBar from './../components/entitiesBar.vue';
    import articleList from './../components/articleList.vue';
    import paging from './../components/paging.vue';

    export default{
        data(){
            return {
                keyword:'',
                types:[],
                infos:[],
                totalPage: 0,
                page: 1,
                entities:[],
                chosedList:[],
                idList:['program','person','organization','tech','location','country']
            }
        },
        watch: {
            page: 'infoSearch'
        },
        created: function () {
            this.keyword = this.$route.params.keyword;
            this.types = this.$route.params.types;
            let body = {
                types:this.types,
                keyword:this.keyword
            }
            this.$http.post(conf.bathPath + '/info/relatedSearch', body).then((res) => {
                this.infos = res.data.infos;
                this.entities = res.data.entities;
                this.chosedList = res.data.chosedList;
                this.totalPage = Math.ceil(res.data.total / 20);
            }, (err) => {
                console.log(err);
            });
        },
        components: {
            entitiesBar: entitiesBar,
            relatedEntities:relatedEntities,
            articleList:articleList,
            paging:paging
        },
        methods: {
            chosedInfos: function (chosedList) {
                this.page = 1;
                this.chosedList = chosedList;
                this.infoSearch();
            },
            pageChange: function (page){
                this.page = page;
            },
            infoSearch: function(){
                let sum = 0;
                for(let obj of this.chosedList){
                        sum += obj.list.length;
                }
                if(sum == 0){
                    let body = {
                        page:this.page,
                        types:this.types,
                        keyword:this.keyword
                    }
                    this.$http.post(conf.bathPath + '/info/getSearchInfos', body).then((res) => {
                        this.infos = res.data.infos;
                        this.totalPage = Math.ceil(res.data.total / 20);
                    }, (err) => {
                        console.log(err);
                    });
                }else{
                    let body = {
                        page:this.page,
                        keyword:this.keyword,
                        types:this.chosedList
                    }
                    this.$http.post(conf.bathPath + '/info/getEntityInfos', body).then((res) => {
                        this.infos = res.data.infos;
                        this.totalPage = Math.ceil(res.data.total / 20);
                    }, (err) => {
                        console.log(err);
                    });
                    }
            },
            force:function(){
                sessionStorage.entities = JSON.stringify(this.entities);
                sessionStorage.chosedList = JSON.stringify(this.chosedList);
                window.open(conf.prePath+'/force/' + this.keyword, '_blank');
            }
        },

    }

</script>

<style scoped>
    body{
        background-color: #fafafa !important;
    }
    .maincontainer{
        width: 100%;
        padding-left: 3.5%;
        padding-right: 3.5%;
    }
    @media (min-width:768px) and (max-width: 992px){
        .entityarticle {
            width: 95%;
            min-width:750px;
            overflow: hidden;
        }
    }

    @media (min-width: 992px){


        .entityarticle {
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
        }
    }
    hr.soften {
        height: 1px;
        margin: 30px 0;
        background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0),
        rgba(0, 0, 0, .2), rgba(0, 0, 0, 0));
        background-image: -moz-linear-gradient(left, rgba(0, 0, 0, 0),
        rgba(0, 0, 0, .2), rgba(0, 0, 0, 0));
        background-image: -ms-linear-gradient(left, rgba(0, 0, 0, 0),
        rgba(0, 0, 0, .2), rgba(0, 0, 0, 0));
        background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0),
        rgba(0, 0, 0, .2), rgba(0, 0, 0, 0));
        border: 0;
    }
</style>
<style lang="css">

    .maincontainer .entityarticle .picture{
        width:31% !important;
    }
    .maincontainer .entityarticle .artinfo{
        width:69% !important;
    }
    .maincontainer .entityarticle .picture .artimg {
        overflow: hidden;
        float: left;
        max-height: 250px;
    }
    .maincontainer .entityarticle .picture .artimg img {
        width: 100%;
        cursor: pointer;
    }
    .maincontainer .entityarticle .artinfo>a{
        margin: 0px;
        font-size: 28px !important;
        padding-bottom: 15px;
    }
    .maincontainer .entityarticle .articlelist ul li{
        padding: 20px 50px;
    }
    .maincontainer .entityarticle .keyterms a{
        color: #337ab7 !important;
    }
</style>
