<template>
    <div class="box">
        <searchbar @searchbykey="searchbykey" @keyWordHnit="keyWordHnit"></searchbar>
    </div>
</template>

<script>
    import searchbar from '../components/searchbar.vue';
    import conf from './../Conf';
    import _ from 'lodash';
    export default{
        data(){
            return {}
        },
        components: {
            searchbar: searchbar,
        },
        methods: {
            searchbykey: function (keyword) {
                this.$router.push(location = conf.prePath+'/KnowledgeBaseResult/' + keyword);
            },
            keyWordHnit:function(searchThis){
                let self = searchThis;
                _.debounce(//当发生改变时延迟500ms请求数据
                    function () {
                        self.$http.jsonp(conf.wikiPath + self.keyWord, {headers: {'Api-User-Agent': 'Example/1.0'}}).then((res) => {
                            self.hints = res.data[1];
                        if (!self.hints) {
                            self.hints = []
                        }
                        self.hintShow = true;
                    }, (err) => {
                            console.log(err);
                        });
                    }, 100)()
            }
        }

    }

</script>

<style lang="css" scoped>


    .box {
        padding-top: 120px;
    }


</style>