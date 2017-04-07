<template>
    <div style="min-height:40px;">
        <div class="page" v-if="pages>1">
            <i></i>
            <b href="" class="page_lf" @click="pageLeft">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </b>

            <div class="page_input">
                <input type="text" :value="current_page" ref="pageInput" @keydown.enter="pageJump"/> <i>/</i>
                <span v-cloak>{{pages}}</span>
            </div>
            <b href="" class="page_rt" @click="pageRight">
                <span class="glyphicon glyphicon-chevron-right"></span>
            </b>
        </div>
    </div>
</template>

<script>

    export default{

        data() {
            return {
                current_page: 1,//当前页
                pages: 1,//总页数
                docs: [],
            }
        },
        props: ['totalPage', 'page'],
        watch: {
            totalPage: 'changePages',
            page: 'changePage'
        },
        computed: {},
        methods: {
            changePages: function () {
                this.pages = this.totalPage;
            },
            changePage: function () {
                this.current_page = this.page;
            },
            pageLeft: function () {
                this.limitPage('up');
            },
            pageRight: function () {
                this.limitPage('down');
            },
            pageJump: function () {
                this.limitPage('enter');
            },
            limitPage: function (paging) {
                if (!this.pages) {
                    return;
                }//如果总页数为0不能翻页
                let pageInput = this.$refs.pageInput.value;
                if (paging == 'up') {
                    pageInput--;
                }//左翻页
                if (paging == 'down') {
                    pageInput++;
                }//右翻页
                if (isNaN(pageInput) || pageInput < 1 || pageInput > this.pages) {
                    pageInput = this.current_page;
                    this.$refs.pageInput.value = pageInput;
                }
                this.$emit('pageChange', pageInput);
                window.scroll(0,0);
            }
        },

    }
</script>
<style scoped>
    /******翻页***********************************/
    .page {
        font-weight: 900;
        height: 40px;
        text-align: center;
        color: #888;
        margin: 20px auto 0;
        background: #f2f2f2;
    }


    .page > div, .page > b {
        height: 40px;
        display: inline-block;
        margin: 0 5px;
        vertical-align: bottom;
    }

    .page > b > span {
        font-size: 18px;
        line-height: 40px;
        padding: 0 10px;
        cursor: pointer;
    }

    .page > b:hover > span {
        color: #ccc;
    }

    .page > b:active > span {
        color: #aaa;
    }

    .page > div > i, .page > div > span {
        font-size: 15px;
        vertical-align: middle;
    }

    .page > div > input {
        font-size: 15px;
        vertical-align: sub;
        color: #888;
        background: rgba(255, 255, 255, 0.3);
        margin: 9px 5px 0 0;
        font-weight: 900;
        overflow: visible;
        width: 57px;
        padding: 2px;
        text-align: center;
        border: none;
        background: #fff;
        border-radius: 3px;
        outline: none;
    }
</style>