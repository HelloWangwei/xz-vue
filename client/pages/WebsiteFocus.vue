<template>
    <div class="websiteFocus">
        <sitelistbox @change="change" :websites="websites" :website="website"  v-if="!sitesNone"></sitelistbox>
        <siteSort @rangeKeywordSearch="searchByRange"
                  @changeTimeSort='changeTimeSort'
                  @exportInfo="exportInfo"
                  :flag="flag" :fuzzySearch="true"   v-if="!sitesNone"></siteSort>
        <articleList :res="res"   v-if="!sitesNone"></articleList>
        <paging :totalPage="totalPage" :page="page" @pageChange="pageChange"   v-if="!sitesNone"></paging>



        <div class="topicsNone" v-if="sitesNone">


            <div>
                <h3 style="width: 95%; margin:30px auto;text-align:center;color:#1695d5">还没有关注网站</h3>
                <p style="width: 95%; margin:0 auto;text-align: center;">在<router-link style="display: inline-block;font-size:15px;font-weight:600;cursor:pointer;border-bottom: 1px solid #4284f3;"  :to="{ name: 'siteFocusSet' }">网站关注设置</router-link>中，可以看到系统推荐的网站，您可以进行关注。</p>

            </div>

            <div style="font-size:20px; margin:20px auto;margin-top:50px;  vertical-align: middle;width: 95%;">
                <h3 style="color:#1695d5">系统推荐</h3>

            </div>

            <div style=" margin:20px auto;  vertical-align: middle;border-top: 1px solid #666;width: 95%;"></div>

            <!-- infolist数据 -->
            <section class="recommend" style="width: 95%; margin: 0px auto; min-height: 21px;">
                <ul style="margin:0;padding:0;">

                    <li v-for="(site,index) in websites"
                            style="margin:0;padding:20px 20px;width:25%;float:left;list-style: none">
                        <h5 style="font-size:15px;font-weight:bold;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin-top: 10px;margin-bottom: 10px;">{{site.name}}</h5>
                        <span style="display:block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{site.url}}</span>
                    </li>



                    <li style="clear:both;list-style: none"></li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    import conf from './../Conf';

    import sitelistbox from './../components/sitelistbox.vue';
    import articleList from './../components/articleList.vue';
    import paging from './../components/paging.vue';
    import siteSort from './../components/siteSort.vue';

    export default{
        data(){
            return {
                website: '',
                totalPage: 0,
                page: 1,
                res: [],
                websites: [],
                urls: [],
                timeSort: 'desc',
                start: '',
                end: '',
                keyword: '',
                sort: '',
                flag: false,


                sitesNone:false,//判断有没有关注网站
            }
        },
        watch: {
            website: 'urlChangeSearch',
        },
        created: function () {
            let url = this.$route.params.website;
            if (url != undefined) {
                this.website = url;
                this.initWebsites();
            } else {
                this.init();
            }
        },
        components: {
            sitelistbox: sitelistbox,
            articleList: articleList,
            paging: paging,
            siteSort: siteSort,
        },
        methods: {
            init: function () {
                let body = {userid: sessionStorage.userInfo};
                let self = this;
                this.$http.post(conf.bathPath + '/info/WebsiteFocusInit', body).then((res) => {
                    if(res.data.totalPage){
                        self.res = res.data.res;
                        self.totalPage = Math.ceil(res.data.totalPage / 20);
                        self.websites = res.data.websites;
                        self.urls = res.data.urls;
                    }else{ //------------------------------没有关注,显示推荐关注页面
                        self.sitesNone = true;
                        self.websites = res.data.res;
                    }
                }, (err) => {
                    console.log(err);
                });
            },
            initWebsites: function () {
                let body = {userid: sessionStorage.userInfo};
                let self = this;
                this.$http.post(conf.bathPath + '/info/initWebsites', body).then((res) => {

                    self.websites = res.data.websites;
                    self.urls = res.data.urls;


                }, (err) => {
                    console.log(err);
                });
            },
            changeTimeSort: function (data) {
                this.timeSort = data;
                this.page = 1;
                this.commonChange();
            },
            searchByRange: function (data) {
                this.timeSort = data.timeSort;
                this.start = data.start;
                this.end = data.end;
                this.keyword = data.keyword;
                this.page = 1;
                this.commonChange();
            },
            urlChangeSearch: function () {
                this.page = 1;
                this.flag = true;

                this.keyword = '';
                this.commonChange();
                this.flag = this.website + 1; //  true -> false -> true 不好用， 然而'' == false -> true ，因此设置个 +1
            },
            commonChange: function () {
                let body = {
                    websites: this.urls,
                    website: this.website,
                    page: this.page,
                    sort: this.sort,
                    timeSort: this.timeSort,
                    start: this.start,
                    end: this.end,
                    keyword: this.keyword
                };
                let self = this;
                this.$http.post(conf.bathPath + '/info/getInfoList', body).then((res) => {
                    self.res = res.data.res;
                    self.totalPage = Math.ceil(res.data.total / 20);
                }, (err) => {
                    console.log(err);
                });
            },
            exportInfo:function(obj){
                let body = {
                    websites: this.urls,
                    website: this.website,
                    page: this.page,
                    sort: this.sort,
                    timeSort: this.timeSort,
                    start: this.start,
                    end: this.end,
                    keyword: this.keyword,
                    size:obj.sum
                };
                let self = this;
                this.$http.post(conf.bathPath + '/info/exportSites', body).then((res) => {
                    let datas = res.data.res;
                    let ShowLabel = datas.title;
                    let JSONData = datas.data;
                    if(obj.type=='excel'){
                        let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                        let excel = '<table>';
                        //设置表头
                        let row = "<tr>";
                        for (let i = 0, l = ShowLabel.length; i < l; i++) {
                            row += "<td>" + ShowLabel[i].value + '</td>';
                        }
                        //换行
                        excel += row + "</tr>";
                        //设置数据
                        for (let i = 0; i < arrData.length; i++) {
                            let row = "<tr>";

                            for (let index in arrData[i]) {
                                let value = arrData[i][index].value;
                                //=== "." ? "" : arrData[i][index].value;
                                row += '<td>' + value + '</td>';
                            }

                            excel += row + "</tr>";
                        }

                        excel += "</table>";

                        let excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
                        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
                        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
                        excelFile += '; charset=UTF-8">';
                        excelFile += "<head>";
                        excelFile += "<!--[if gte mso 9]>";
                        excelFile += "<xml>";
                        excelFile += "<x:ExcelWorkbook>";
                        excelFile += "<x:ExcelWorksheets>";
                        excelFile += "<x:ExcelWorksheet>";
                        excelFile += "<x:Name>";
                        excelFile += "{worksheet}";
                        excelFile += "</x:Name>";
                        excelFile += "<x:WorksheetOptions>";
                        excelFile += "<x:DisplayGridlines/>";
                        excelFile += "</x:WorksheetOptions>";
                        excelFile += "</x:ExcelWorksheet>";
                        excelFile += "</x:ExcelWorksheets>";
                        excelFile += "</x:ExcelWorkbook>";
                        excelFile += "</xml>";
                        excelFile += "<![endif]-->";
                        excelFile += "</head>";
                        excelFile += "<body>";
                        excelFile += excel;
                        excelFile += "</body>";
                        excelFile += "</html>";

                        let uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
                        let link = document.createElement("a");
                        link.href = uri;
                        link.style = "visibility:hidden";
                        link.download = obj.name + ".xls";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }else{
                        var uri = 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(JSON.stringify(datas));

                        var link = document.createElement("a");
                        link.href = uri;

                        link.style = "visibility:hidden";
                        link.download = obj.name + ".json";

                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }

                    this.changeExportLog(res.data.total);
                }, (err) => {
                    console.log(err);
                });
            },
            changeExportLog:function (sum) {
                let body = {
                    userid: sessionStorage.userInfo,
                    sum:sum
                };
                this.$http.post(conf.bathPath + '/info/changeExportLog', body).then((res)=>{
                },(err)=>{
                    console.log(err)
                });
            },
            change: function (url) {
                this.website = url;
            },
            pageChange: function (page) {
                this.page = page;
                this.commonChange();
            }
        }
    }

</script>

<style lang="css" scoped>

    .websiteFocus {
        width: 93%;
        margin: 0 auto;
    }
    .topicsNone a:hover{
        text-decoration: none;
    }
</style>