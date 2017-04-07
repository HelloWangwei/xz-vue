<template>
    <div class="websiteFocus">
        <searchbar @searchbykey="searchbykey" @keyWordHnit="keyWordHnit"></searchbar>

        <!------------------------搜索条-------------------------------------------------------------------------->
        <siteSort @rangeKeywordSearch="searchByRange"
                  @changeTime='changeTime'
                  @changeTimeSort='changeTimeSort' :flag="flag"></siteSort>
        <articleList :res="res"></articleList>
        <paging :totalPage="totalPage" :page="page" @pageChange="pageChange"></paging>
    </div>
</template>

<script>
    import _ from 'lodash';
    import conf from './../Conf';
    import searchbar from './../components/searchbar.vue';
    import articleList from './../components/articleList.vue';
    import paging from './../components/paging.vue';
    import siteSort from './../components/siteSort.vue';

    export default{
        data(){
            return {
                totalPage: 0,
                page: 1,
                res: [],
                urls: [],
                timeSort: 'desc',
                start: '',
                end: '',
                keyWord:'',//搜索条中的
                flag: false
            }
        },
        watch: {
            page: 'pageChangeSearch'
        },
        created: function () {
            this.keyWord = this.$route.params.keyword.replace('-wiki-', '.');
            this.commonChange();
        },
        components: {
            searchbar: searchbar,
            articleList: articleList,
            paging: paging,
            siteSort: siteSort,
        },
        methods: {
            searchbykey:function(keyWord){
                this.$router.push(location = conf.prePath+'/globalSearch/' + keyWord);
            },

            keyWordHnit:function(searchThis){
                let self = searchThis;
                _.debounce(//当发生改变时延迟100ms请求数据
                    function () {
                        self.$http.post(conf.bathPath + '/info/globalSearchHint', {keyword: self.keyWord}).then((res) => {
                            self.hints = res.data.res;
                            if(!self.hints){
                                self.hints=[]
                            }
                            self.hintShow = true;
                        },(err) => {
                            console.log(err);
                        })
                    }, 100)();
            },
            changeTime: function (data) {
                this.timeSort = data.timeSort;
                this.start = data.start;
                this.end = data.end;

            },
            changeTimeSort: function (timeSort) {
                this.timeSort = timeSort;
                this.start = '';
                this.end = '';
                this.commonChange();
            },
            searchByRange: function (data) {
                this.timeSort = data.timeSort;
                this.start = data.start;
                this.end = data.end;
                this.page = 1;

                this.commonChange();
            },

            pageChangeSearch: function () {

                this.commonChange();
            },
            commonChange: function () {
                let body = {
                    page: this.page,
                    timeSort: this.timeSort,
                    start: this.start,
                    end: this.end,
                    keyWord: this.keyWord,
                }
                console.log(body)
                let self = this;
                this.$http.post(conf.bathPath + '/info/globalSearch', body).then((res) => {
                    self.res = res.data.res;
                    self.totalPage = Math.ceil(res.data.total / 20);
                }, (err) => {
                    console.log(err);
                });
            },

            pageChange: function (page) {
                this.page = page;
            }
        }
    }

</script>

<style lang="css" scoped>

    .websiteFocus {
        width: 93%;
        margin: 0 auto;
    }
</style>