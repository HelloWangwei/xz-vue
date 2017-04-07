<template>
    <div>
        <section class="info_srarch">
            <div class="info_srarch_heade">
                <div class="input">
                    <input autocomplete="off" type="text" class="searchInp" v-model="keyWord" placeholder=" 知识库搜索"
                           @blur="hintHide"
                           @focus="hints.length!=0&&(hintShow = true)"
                           @keyup="keyWordHnit"
                           @keydown.enter="search"
                           @keydown.down="hintDown()"
                           @keydown.up="hintUp()"/>
                    <div>
                        <button class="btn btn-info" @click="searchbykey">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                    <div class="search_search_hint" v-show="hintShow">
                        <ul @mouseover="hintHideCan=false" @mouseout="hintHideCan=true">
                            <li v-for="(hint,index) in hints" :class="{curr:hintNow==index}"
                                @click="hintToInput(hint)"
                                @mouseover="mouseoverHint(index)"
                                @enter="mouseoverHint(index)">
                                {{hint}}
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
        <!-- 提示输入不为空 -->
        <div class="modal fade bs-example-modal-sm " tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">搜索信息有误!</h4>
                    </div>
                    <div class="modal-body">
                        搜索内容不可为空！
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';


    export default{
        data(){
            return {
                keyWord: '',//输入框
                keyWordOld: '',
                hints: [],//输入框中返回的搜索提示
                hintNow: -1,
                hintShow: false,
                hintHideCan: true,
            }
        },
        created: function () {
            if (this.$route.params.keyword) {
                this.keyWord = decodeURI(this.$route.params.keyword.replace('-wiki-', '.'));
            }
        },
        watch: {
            hints: function () {
                if (this.hints.length == 0) {
                    this.hintShow = false;
                }
            }
        },
        methods: {
            keyWordHnit: function () {
                if (this.keyWordOld == this.keyWord) {
                    return;
                }
                this.keyWordOld = this.keyWord;
                if(arguments[0].keyCode.keyCode==38 || arguments[0].keyCode.keyCode==40)return;
                if(this.keyWord!=''){
                    this.$emit('keyWordHnit', this);
                }else{
                    this.hintShow=false;
                    this.hints=[];
                }
            },
            search: function () {
                if (this.hintNow != -1) {
                    this.keyWord = this.hints[this.hintNow]
                }
                this.searchbykey();
            },
            searchbykey: function () {//查询
                if (this.keyWord == '') {
                    $('.bs-example-modal-sm').modal();
                } else {
                    let keyword = this.keyWord.replace('.', '-wiki-');
                    this.$emit('searchbykey', keyword);
                }
            },
            hintHide: function () {
                if (this.hintHideCan) {
                    this.hintShow = false;
                }
            },
            hintToInput: function (hint) {
                this.keyWord = hint;
                this.hintShow = false;
            },

            hintDown: function (input) {
                if (!this.hintShow) {
                    return
                }
                this.hintNow++;
                this.keyWord = this.hints[this.hintNow];
                if (this.hintNow == this.hints.length) this.hintNow = -1;
            },
            hintUp: function (input) {
                if (!this.hintShow) {
                    return
                }
                this.hintNow--;
                this.keyWord = this.hints[this.hintNow];
                if (this.hintNow == -2) this.hintNow = this.hints.length - 1;
            },
            //鼠標在hint上面移動時,hint選中效果
            mouseoverHint: function (index) {
                this.hintNow = index;
            },

        },
    }

</script>

<style lang="css" scoped>
    .info_srarch {
        width: 100%;
        padding: 0;
        margin: 60px auto;
    }

    .info_srarch_heade {
        width: 100%;
        text-align: center;
    }

    .info_srarch_heade > div {
        position: relative;
        width: 56.5%;
        margin: 0 auto;
    }

    .info_srarch_heade > div > input {
        outline: none;
        text-indent: 5px;
        box-sizing: border-box;
        height: 40px;
        width: 100%;
        font-family: 'Arial', 'STHeitiSC-Light', 'Heiti SC Light', 'Heiti SC', 'STHeiti', 'Microsoft YaHei';
        font-size: 14px;
        font-weight: 600;
        padding-left: 5px;
        border: 1px solid #38f;
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
        color: #38f;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #38f;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #38f;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #38f;
    }

    .info_srarch_heade > div > input:hover, .info_srarch_heade > div > input:focus {
        border: 2px solid #38f;
    }

    .btn-info {
        position: absolute;
        top: 0;
        right: 0;
        border: 1px solid #38f;
        border-radius: 0;
        background: #38f;
        text-align: center;
        padding: 0 27px;
        line-height: 38px;
        font-weight: 600;
        font-size: 15px;
    }

    .search_search_hint {
        position: relative;
        width: 100%;
        z-index: 100;
    }

    .search_search_hint > ul {
        border: 1px solid #777;
        list-style: none;
        padding: 0;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 14px;
        width: 100%;
        background: #fff;
    }

    .search_search_hint > ul > li {
        text-align: left;
        padding: 5px 0;
        padding-left: 10px;
    }

    .curr {
        background: #efefef;
    }


</style>