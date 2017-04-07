<template>
    <div>
        <div class="topicclassify">
            <h5>专题分类<span class="closetree glyphicon glyphicon-remove-circle" @click="closetree"></span></h5>
            <ul class="topictabs">
                 <li v-for="(one,index) in arr1" :id="one.id" class="minfirst" @click="showmintab2(one.id,$event)">{{one.name}}</li>
            </ul>
            <div class="mintab2" v-if="mintabs2">
                <ul class="tab2ul">
                    <li :id="two.id" class="m" :class="{checkedli:index==nowIndex}" v-for="(two,index) in arr2" @click="showmintab3(two.id,index)">{{two.name}}</li>
                    <!--<li class="m">航空母舰</li>-->
                    <!--<li class="m">巡洋舰</li>-->
                </ul>
            </div>
            <div class="mintabright"  v-if="mintabsright">
                <div class="mintab3"  v-if="mintabs3">
                    <ul class="tab3ul">
                        <li :id="three.id" class="c" v-for="(three,index) in arr3" @click="showmintab4(three.id)" >
                            <div class="btn btn-xs msgname btn-info"><span class="tp_name">{{three.name}}</span></div>
                        </li>
                        <!--<li class="c"><div class="btn btn-xs msgname btn-info"><span class="tp_name">11102</span></div></li>-->
                        <!--<li class="c"><div class="btn btn-xs msgname btn-info"><span class="tp_name">11103</span></div></li>-->
                    </ul>
                </div>
                <div class="thirdtab" v-if="minlast">
                    <div class="mintab4" v-if="mintabs4">
                        <ul class="tab4ul">
                            <li :id="four.id" class="content" v-for="(four,index) in arr4" @click="showmintab5(four.id,index)">{{four.name}}</li>
                            <!--<li class="content" @click="showmintab5()">22202</li>-->
                        </ul>
                    </div>
                    <div class="mintab5" v-if="mintabs5">
                        <ul class="tab5ul">
                            <li class="content" v-for="(five,index) in arr5"  @click="chosefollow(index,five.id)">
                                <div class="minsdiv"><span class="tp_name">{{five.name}}</span><span class="tp_update">(0)</span><span class="followup" :class="{followdown:topicChecked[index]}" > </span></div>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    import conf from './../Conf';
    import babelParent from './../components/babelParent.vue';
    import entitiesBar from './../components/entitiesBar.vue';
    import d3Circle from './../components/d3Circle.vue';


    export default{
        data(){
            return {
                jsonArr: [{"name":"舰船","pId":"0","id":"1"},{"name":"潜艇","pId":"1","id":"101"}, {"name":"航空母舰","pId":"1","id":"102"}, {"name":"巡洋舰","pId":"1","id":"103"}, {"name":"快艇","pId":"1","id":"104"}, {"name":"反潜舰艇","pId":"1","id":"105"}, {"name":"战列舰","pId":"1","id":"106"}, {"name":"驱逐舰","pId":"1","id":"107"}, {"name":"护卫舰","pId":"1","id":"108"}, {"name":"水雷战舰艇","pId":"1","id":"109"}, {"name":"军用水下航行器","pId":"1","id":"110"}, {"name":"舰船分系统","pId":"1","id":"111"}, {"name":"船体结构构件","pId":"1","id":"112"}, {"name":"舰船舱室","pId":"1","id":"113"}, {"name":"船体设备","pId":"1","id":"114"}, {"name":"舰船防险救生设备","pId":"1","id":"115"}, {"name":"舰艇三防装备","pId":"1","id":"116"}, {"name":"舰船勤务","pId":"1","id":"117"}, {"name":"通用辅助型舰艇","pId":"1","id":"118"}, {"name":"医疗船","pId":"1","id":"119"}, {"name":"人员运输","pId":"1","id":"120"}, {"name":"机械化登陆艇","pId":"1","id":"121"}, {"name":"船坞式登陆舰","pId":"1","id":"122"}, {"name":"中型登陆舰","pId":"1","id":"123"}, {"name":"通用水雷战舰艇","pId":"1","id":"124"}, {"name":"通用猎雷和扫雷舰艇","pId":"1","id":"125"}, {"name":"海岸布雷艇","pId":"1","id":"126"}, {"name":"远洋扫雷艇","pId":"1","id":"127"}, {"name":"近岸巡逻舰","pId":"1","id":"128"}, {"name":"通用巡逻舰","pId":"1","id":"129"}, {"name":"核潜艇","pId":"101","id":"10101"}, {"name":"常规动力潜艇","pId":"101","id":"10102"}, {"name":"弹道导弹潜艇","pId":"101","id":"10103"}, {"name":"攻击型潜艇","pId":"101","id":"10104"}, {"name":"单壳体潜艇","pId":"101","id":"10105"}, {"name":"双壳体潜艇","pId":"101","id":"10106"}, {"name":"个半壳体潜艇","pId":"101","id":"10107"}, {"name":"混合壳潜艇","pId":"101","id":"10108"}, {"name":"大型潜艇","pId":"101","id":"10109"}, {"name":"中型潜艇","pId":"101","id":"10110"}, {"name":"小型潜艇","pId":"101","id":"10111"}, {"name":"微型潜艇","pId":"101","id":"10112"}, {"name":"航母","pId":"102","id":"10201"}, {"name":"舰载机","pId":"102","id":"10202"}, {"name":"反潜航空母舰","pId":"102","id":"10203"}, {"name":"攻击航空母舰","pId":"102","id":"10204"}, {"name":"轻型航空母舰","pId":"102","id":"10205"}, {"name":"中型航空母舰","pId":"102","id":"10206"}, {"name":"大型航空母舰","pId":"102","id":"10207"}, {"name":"航空母舰特种装置","pId":"102","id":"10208"}, {"name":"核动力航空母舰","pId":"102","id":"10209"}, {"name":"常规动力航空母舰","pId":"102","id":"10210"}, {"name":"多用途航空母舰","pId":"102","id":"10211"}, {"name":"载机巡洋舰","pId":"102","id":"10212"}, {"name":"导弹航空母舰","pId":"102","id":"10213"}, {"name":"常规动力巡洋舰","pId":"103","id":"10301"}, {"name":"导弹巡洋舰","pId":"103","id":"10302"}, {"name":"多用途巡洋舰","pId":"103","id":"10303"}, {"name":"轻型巡洋舰","pId":"103","id":"10304"}, {"name":"大型巡洋舰","pId":"103","id":"10305"}, {"name":"核动力巡洋舰","pId":"103","id":"10306"}, {"name":"联合动力巡洋舰","pId":"103","id":"10307"}, {"name":"反潜巡洋舰","pId":"103","id":"10308"}, {"name":"防空巡洋舰","pId":"103","id":"10309"}, {"name":"直升机巡洋舰","pId":"103","id":"10310"}, {"name":"火炮巡洋舰","pId":"103","id":"10311"}, {"name":"通用巡洋舰","pId":"103","id":"10312"}, {"name":"导弹快艇","pId":"104","id":"10401"}, {"name":"鱼雷快艇","pId":"104","id":"10402"}, {"name":"护卫艇","pId":"104","id":"10403"}, {"name":"猎潜艇","pId":"105","id":"10501"}, {"name":"防空驱逐舰","pId":"107","id":"10701"}, {"name":"导弹驱逐舰","pId":"107","id":"10702"}, {"name":"多用途驱逐舰","pId":"107","id":"10703"}, {"name":"反潜驱逐舰","pId":"107","id":"10704"}, {"name":"通用驱逐舰","pId":"107","id":"10705"}, {"name":"护卫驱逐舰","pId":"107","id":"10706"}, {"name":"护航驱逐舰","pId":"107","id":"10707"}, {"name":"直升机驱逐舰","pId":"107","id":"10708"}, {"name":"远洋护卫舰","pId":"108","id":"10801"}, {"name":"轻型护卫舰","pId":"108","id":"10802"}, {"name":"导弹护卫舰","pId":"108","id":"10803"}, {"name":"反潜护卫舰","pId":"108","id":"10804"}, {"name":"防空护卫舰","pId":"108","id":"10805"}, {"name":"多用途护卫舰","pId":"108","id":"10806"}, {"name":"近海护卫舰","pId":"108","id":"10807"}, {"name":"隐身护卫舰","pId":"108","id":"10808"}, {"name":"通用护卫舰","pId":"108","id":"10809"}, {"name":"轻护卫舰","pId":"108","id":"10810"}, {"name":"直升机护卫舰","pId":"108","id":"10811"}, {"name":"布雷舰艇","pId":"109","id":"10901"}, {"name":"反水雷舰艇","pId":"109","id":"10902"}, {"name":"水下作战平台","pId":"110","id":"11001"}, {"name":"有人水下航行器","pId":"110","id":"11002"}, {"name":"深潜救援器","pId":"110","id":"11003"}, {"name":"舰船推进系统","pId":"111","id":"11101"}, {"name":"舰船电力系统","pId":"111","id":"11102"}, {"name":"舰船作战指挥系统","pId":"111","id":"11103"}, {"name":"舰船辅助系统","pId":"111","id":"11104"}, {"name":"船体结构","pId":"112","id":"11201"}, {"name":"船体","pId":"112","id":"11202"}, {"name":"船体构件","pId":"112","id":"11203"}, {"name":"舱面属具","pId":"114","id":"11401"}, {"name":"舵设备","pId":"114","id":"11402"}, {"name":"系泊设备","pId":"114","id":"11403"}, {"name":"甲板机械","pId":"114","id":"11404"}, {"name":"拖曳设备","pId":"114","id":"11405"}, {"name":"桅樯设备","pId":"114","id":"11406"}, {"name":"潜艇艇员救生设备","pId":"115","id":"11501"}, {"name":"潜艇损管器材","pId":"115","id":"11502"}, {"name":"深潜器","pId":"115","id":"11503"}, {"name":"潜水器","pId":"115","id":"11504"}, {"name":"舰艇消防设备","pId":"115","id":"11505"}, {"name":"两栖人员运输艇","pId":"120","id":"12001"}, {"name":"船坞式两栖运输舰","pId":"120","id":"12002"}, {"name":"核动力潜艇","pId":"10101","id":"1010101"}, {"name":"奥斯卡级潜艇","pId":"10101","id":"1010102"}, {"name":"北风之神","pId":"10101","id":"1010103"}, {"name":"洛杉矾级核动力攻击潜艇","pId":"10101","id":"1010104"}, {"name":"阿尔法级核潜艇","pId":"10101","id":"1010105"}, {"name":"北风之神级战略核潜艇","pId":"10101","id":"1010106"}, {"name":"核动力攻击型潜艇","pId":"10101","id":"1010107"}, {"name":"常规潜艇","pId":"10102","id":"1010201"}, {"name":"张保皋级","pId":"10102","id":"1010202"}, {"name":"李阡号","pId":"10102","id":"1010203"}, {"name":"崔茂宣号","pId":"10102","id":"1010204"}, {"name":"朴伟号","pId":"10102","id":"1010205"}, {"name":"李从茂号","pId":"10102","id":"1010206"}, {"name":"李舜臣号","pId":"10102","id":"1010207"}, {"name":"罗大勇号","pId":"10102","id":"1010208"}, {"name":"李亿祺号","pId":"10102","id":"1010209"}, {"name":"209级","pId":"10102","id":"1010210"}, {"name":"\u201c天蝎座\u201d级","pId":"10102","id":"1010211"}, {"name":"战略导弹潜艇","pId":"10103","id":"1010301"}, {"name":"反舰潜艇","pId":"10104","id":"1010401"}, {"name":"反潜潜艇","pId":"10104","id":"1010402"}, {"name":"鱼雷潜艇","pId":"10104","id":"1010403"}, {"name":"\u201c柯林斯\u201d级","pId":"10104","id":"1010404"}, {"name":"\u201c宋\u201d级","pId":"10104","id":"1010405"}, {"name":"\u201c阿戈塔斯\u201d级","pId":"10104","id":"1010406"}, {"name":"反潜航母","pId":"10203","id":"1020301"}, {"name":"攻击航母","pId":"10204","id":"1020401"}, {"name":"无敌号航空母舰","pId":"10205","id":"1020501"}, {"name":"无敌号","pId":"10205","id":"1020502"}, {"name":"皇家方舟号","pId":"10205","id":"1020503"}, {"name":"皇家方舟号航空母舰","pId":"10205","id":"1020504"}, {"name":"中型航母","pId":"10206","id":"1020601"}, {"name":"大型航母","pId":"10207","id":"1020701"}, {"name":"重型航母","pId":"10207","id":"1020702"}, {"name":"航母特种装置","pId":"10208","id":"1020801"}, {"name":"弹射系统","pId":"10208","id":"1020802"}, {"name":"阻拦装置","pId":"10208","id":"1020803"}, {"name":"飞机升降机","pId":"10208","id":"1020804"}, {"name":"机库","pId":"10208","id":"1020805"}, {"name":"进场引导系统","pId":"10208","id":"1020806"}, {"name":"福特号航空母舰","pId":"10209","id":"1020901"}, {"name":"企业级航空母舰","pId":"10209","id":"1020902"}, {"name":"尼米兹级航空母舰","pId":"10209","id":"1020903"}, {"name":"企业级","pId":"10209","id":"1020904"}, {"name":"尼米兹级","pId":"10209","id":"1020905"}, {"name":"戴高乐级","pId":"10209","id":"1020906"}, {"name":"福特级","pId":"10209","id":"1020907"}, {"name":"戴高乐航空母舰","pId":"10209","id":"1020908"}, {"name":"库兹涅佐夫号航空母舰","pId":"10209","id":"1020909"}, {"name":"库兹涅佐夫级","pId":"10209","id":"1020910"}, {"name":"阿斯图里亚斯亲王号航空母舰","pId":"10210","id":"1021001"}, {"name":"差克里·纳吕贝特号航空母舰","pId":"10210","id":"1021002"}, {"name":"凯沃尔号航空母舰","pId":"10210","id":"1021003"}, {"name":"戈尔什科夫号","pId":"10210","id":"1021004"}, {"name":"伊丽莎白女王级","pId":"10210","id":"1021005"}, {"name":"维拉特号","pId":"10210","id":"1021006"}, {"name":"圣保罗号航空母舰","pId":"10210","id":"1021007"}, {"name":"维拉特号航空母舰","pId":"10210","id":"1021008"}, {"name":"圣保罗号","pId":"10210","id":"1021009"}, {"name":"加里波第号","pId":"10210","id":"1021010"}, {"name":"凯沃尔号","pId":"10210","id":"1021011"}, {"name":"小鹰级航母","pId":"10210","id":"1021012"}, {"name":"戈尔什科夫号航空母舰","pId":"10210","id":"1021013"}, {"name":"伊丽莎白女王级航空母舰","pId":"10210","id":"1021014"}, {"name":"加里波第号航空母舰","pId":"10210","id":"1021015"}, {"name":"小鹰级","pId":"10210","id":"1021016"}, {"name":"基辅级","pId":"10210","id":"1021017"}, {"name":"阿斯图里亚斯亲王号","pId":"10210","id":"1021018"}, {"name":"差克里·纳吕贝特号","pId":"10210","id":"1021019"}, {"name":"多用途航母","pId":"10211","id":"1021101"}, {"name":"提康德罗加级巡洋舰","pId":"10302","id":"1030201"}, {"name":"光荣级巡洋舰","pId":"10302","id":"1030202"}, {"name":"班布里奇","pId":"10302","id":"1030203"}, {"name":"提康德罗加","pId":"10302","id":"1030204"}, {"name":"光荣","pId":"10302","id":"1030205"}, {"name":"喀拉级导弹巡洋舰","pId":"10302","id":"1030206"}, {"name":"班布里奇级核动力巡洋舰","pId":"10302","id":"1030207"}, {"name":"喀拉","pId":"10302","id":"1030208"}, {"name":"导弹直升机巡洋舰","pId":"10302","id":"1030209"}, {"name":"基洛夫级核动力巡洋舰","pId":"10305","id":"1030501"}, {"name":"基洛夫","pId":"10305","id":"1030502"}, {"name":"导弹艇","pId":"10401","id":"1040101"}, {"name":"地效翼导弹艇","pId":"10401","id":"1040102"}, {"name":"水翼导弹艇","pId":"10401","id":"1040103"}, {"name":"鱼雷艇","pId":"10402","id":"1040201"}, {"name":"护卫艇","pId":"10403","id":"1040301"}, {"name":"炮艇","pId":"10403","id":"1040302"}, {"name":"巡逻艇","pId":"10403","id":"1040303"}, {"name":"猎潜艇","pId":"10501","id":"1050101"}, {"name":"太刀风级驱逐舰","pId":"10701","id":"1070101"}, {"name":"美国导弹驱逐舰","pId":"10702","id":"1070201"}, {"name":"日本导弹驱逐舰","pId":"10702","id":"1070202"}, {"name":"广开土大王级驱逐舰","pId":"10702","id":"1070203"}, {"name":"忠武公李舜臣级驱逐舰","pId":"10702","id":"1070204"}, {"name":"现代级导弹驱逐舰","pId":"10702","id":"1070205"}, {"name":"拉吉普特","pId":"10702","id":"1070206"}, {"name":"广开土大王","pId":"10702","id":"1070207"}, {"name":"世宗大王","pId":"10702","id":"1070208"}, {"name":"忠武公李舜臣","pId":"10702","id":"1070209"}, {"name":"现代","pId":"10702","id":"1070210"}, {"name":"拉吉普特级驱逐舰","pId":"10702","id":"1070211"}, {"name":"世宗大王级驱逐舰","pId":"10702","id":"1070212"}, {"name":"村雨","pId":"10703","id":"1070301"}, {"name":"高波","pId":"10703","id":"1070302"}, {"name":"德里","pId":"10703","id":"1070303"}, {"name":"村雨级多用途驱逐舰","pId":"10703","id":"1070304"}, {"name":"高波级多用途驱逐舰","pId":"10703","id":"1070305"}, {"name":"德里级驱逐舰","pId":"10703","id":"1070306"}, {"name":"无畏级驱逐舰","pId":"10704","id":"1070401"}, {"name":"白根","pId":"10704","id":"1070402"}, {"name":"山云","pId":"10704","id":"1070403"}, {"name":"白根级驱逐舰","pId":"10704","id":"1070404"}, {"name":"山云级导弹驱逐舰","pId":"10704","id":"1070405"}, {"name":"蔚山","pId":"10802","id":"1080201"}, {"name":"猎豹级护卫舰","pId":"10802","id":"1080202"}, {"name":"别佳级护卫舰","pId":"10802","id":"1080203"}, {"name":"库里什","pId":"10802","id":"1080204"}, {"name":"别佳","pId":"10802","id":"1080205"}, {"name":"蔚山级护卫舰","pId":"10802","id":"1080206"}, {"name":"库里什轻型护卫舰","pId":"10802","id":"1080207"}, {"name":"夕张","pId":"10803","id":"1080301"}, {"name":"阿武隈","pId":"10803","id":"1080302"}, {"name":"佩里","pId":"10803","id":"1080303"}, {"name":"戈达瓦里","pId":"10803","id":"1080304"}, {"name":"塔尔瓦","pId":"10803","id":"1080305"}, {"name":"布拉马普特拉","pId":"10803","id":"1080306"}, {"name":"石狩级导弹护卫舰","pId":"10803","id":"1080307"}, {"name":"夕张级导弹护卫舰","pId":"10803","id":"1080308"}, {"name":"阿武隈级导弹护卫舰","pId":"10803","id":"1080309"}, {"name":"佩里级导弹护卫舰","pId":"10803","id":"1080310"}, {"name":"戈达瓦里级导弹护卫舰","pId":"10803","id":"1080311"}, {"name":"塔尔瓦级护卫舰","pId":"10803","id":"1080312"}, {"name":"布拉马普特拉级护卫舰","pId":"10803","id":"1080313"}, {"name":"石狩","pId":"10803","id":"1080314"}, {"name":"筑后","pId":"10804","id":"1080401"}, {"name":"浦项","pId":"10804","id":"1080402"}, {"name":"筑后级护卫舰","pId":"10804","id":"1080403"}, {"name":"浦项级护卫舰","pId":"10804","id":"1080404"}, {"name":"无畏级","pId":"10808","id":"1080801"}, {"name":"守卫","pId":"10808","id":"1080802"}, {"name":"什瓦里克","pId":"10808","id":"1080803"}, {"name":"无畏级隐形护卫舰","pId":"10808","id":"1080804"}, {"name":"守卫级隐身护卫舰","pId":"10808","id":"1080805"}, {"name":"什瓦里克级隐身护卫舰","pId":"10808","id":"1080806"}, {"name":"布雷舰","pId":"10901","id":"1090101"}, {"name":"猎雷舰艇","pId":"10902","id":"1090201"}, {"name":"猎扫雷舰艇","pId":"10902","id":"1090202"}, {"name":"扫雷舰艇","pId":"10902","id":"1090203"}, {"name":"破雷舰艇","pId":"10902","id":"1090204"}, {"name":"炸雷舰艇","pId":"10902","id":"1090205"}, {"name":"反水雷支援舰","pId":"10902","id":"1090206"}, {"name":"船端结构","pId":"11201","id":"1120101"}, {"name":"甲板结构","pId":"11201","id":"1120102"}, {"name":"舷侧结构","pId":"11201","id":"1120103"}, {"name":"船底结构","pId":"11201","id":"1120104"}, {"name":"舰体","pId":"11202","id":"1120201"}, {"name":"船底板","pId":"11203","id":"1120301"}, {"name":"龙骨","pId":"11203","id":"1120302"}, {"name":"舱口","pId":"11203","id":"1120303"}, {"name":"肋骨","pId":"11203","id":"1120304"}, {"name":"纵骨","pId":"11203","id":"1120305"}, {"name":"纵桁","pId":"11203","id":"1120306"}, {"name":"船体","pId":"11401","id":"1140101"}, {"name":"天幕设备","pId":"11401","id":"1140102"}, {"name":"系船设备","pId":"11403","id":"1140301"}, {"name":"锚链","pId":"11403","id":"1140302"}, {"name":"起锚机","pId":"11403","id":"1140303"}, {"name":"系缆设备","pId":"11403","id":"1140304"},{"name":"F-35","pId":"1010101","id":"ddb033b2-598f-4c09-be80-c96ec167cc6a"},{"name":"无人系统技术","pId":"1010101","id":"c56413f3-90a9-43a4-b671-4ac61e717b02"},{"name":"航空","pId":"0","id":"2"},{"name":"军用","pId":"2","id":"201"},{"name":"美国","pId":"201","id":"20101"},{"name":"攻击机","pId":"20101","id":"2010101"},{"name":"F-35","pId":"2010101","id":"ddb033b2-598f-4c09-be80-c96ec167cc6a"}],
//                followUp:true,
                arr1:[],
                arr2:[],
                arr3:[],
                arr4:[],
                arr5:[],
                showmintab2id:'',
                nowIndex:-1,
                treedIndex:-1,//记录了被选中的专题
                isfollowdown:false,
                topicChecked:[],//选中专题

                topicids:[],
            }
        },
        created: function () {
//            this.followUp = this.followup;
            this.init();
        },
        props: ['mintabsright','mintabs2','mintabs3','mintabs4','mintabs5','minlast','openTree'],
        watch:{
        },
        methods:{
            init:function () {
                for(let data of this.jsonArr){
                    if(data.pId=='0'){
                        this.arr1.push(data);
                    }
                }

                for(let data of this.jsonArr){
                    if(data.pId==this.arr1[0].id){
                        this.arr2.push(data);
                    }
                }
            },
            closetree:function () {
                this.$emit('closeshiptree');
            },
            showmintab2:function (id,e) {
                $(e.target).parent('.topictabs').prepend($(e.target));
                this.arr2=[];
                this.nowIndex=-1;
                for(let data of this.jsonArr){
                    if(data.pId==id){
                        this.arr2.push(data);
                    }
                }
                this.$emit('showTab2');
            },
            showmintab3:function (id,index) {
                this.$emit('showTab3');
                this.nowIndex=index;
                this.arr3=[];
                for(let data of this.jsonArr){
                    if(data.pId==id){
                        this.arr3.push(data);
                    }
                }
            },
            showmintab4:function (id) {
                this.$emit('showTab4');
                this.arr4=[];
                for(let data of this.jsonArr){
                    if(data.pId==id){
                        this.arr4.push(data);
                    }
                }
            },
            showmintab5:function (id) {
                this.topicChecked=[];
                this.topicids = [];
                this.arr5=[];
                for(let data of this.jsonArr){
                    if(data.pId==id){
                        this.arr5.push(data);
                        this.topicChecked.push(data.id);
                        this.topicids.push(data.id);
                    }
                }

                this.$emit('showTab5',this.topicChecked);
                console.log(JSON.stringify(this.topicChecked));
                console.log(JSON.stringify(this.topicids));
            },
            chosefollow:function (index,id) {
                if (this.topicChecked[index]) {
                    this.$delete(this.topicChecked, index);
                } else {
                    this.$set(this.topicChecked, index, id);
                }

                let count = 0;
                for(let str of this.topicChecked){
                    if(str!=null){
                        count++;
                    }
                }

                let ids=[];
                if(count==0){
                    ids = this.topicids;
                }else{
                    ids = this.topicChecked;
                }

                this.$emit('serchTopicByid',ids);
            },
        }
    }
</script>

<style scoped>
    .topicclassify{
        min-height: 80px;
    }
    .topicclassify>h5{
        text-align: right;
        font-size: 16px;
        font-weight: 600;
        background: #fff;
        padding: 7px;
        margin: 0;
    }
    .topictabs {
        background: #333;
        color: #fff;
        margin-bottom: 0px;
        padding: 0;
        overflow: hidden;
    }
    .topictabs a{
        color:#fff;
    }
    .topictabs > li {
        float: right;
        font-size: 16px;
        display: block;
        text-align: center;
        cursor: pointer;
        background: #000;
        border-right: 2px solid #fff;
        width: 90px;
        padding: 4px;
    }
    .topictabs > li:first-child{
        width:240px;
        font-weight: 600;
    }
    .topictabs > li a{
        padding: 0px 3px;
    }
    .topictabs > li.active > a, .topictabs > li.active > a:hover, .topictabs > li.active > a:focus {
        font-weight: 600;
        font-size: 16px;
    }
    .topictabs > li > a:hover {
        font-weight: 600;
    }
    .topictabs> li > a:hover, .topictabs> li > a:focus {
        text-decoration: none;
    }
    .topictabs a:hover, .topictabs a:focus {
        text-decoration: none;
    }
    .msgname{
        margin-top: 8px;
    }
    .minsdiv{
        display: inline-block;
        position: relative;
        margin: 4px 10px;
    }
    .followup {
        width: 22px;
        height: 22px;
        position: absolute;
        top: -8px;
        right: -18px;
        background: url(../static/img/gou.png) no-repeat 4px 4px;
        z-index: 50;
        cursor: pointer;
    }
    .followdown{
        width: 22px;
        height: 22px;
        position: absolute;
        top: -8px;
        right: -18px;
        background: url(../static/img/gou2.png) no-repeat 4px 4px;
        z-index: 50;
        cursor: pointer;
    }
    #mintabsa ul,#mintabs2 ul,#mintabsb ul,#mintabs2 ul,#mintabs3 ul,#mintabsc ul {
        padding:0px;
    }
    #mintabsa ul li,#mintabs2 ul li,#mintabsb ul li,#mintabs2 ul li,#mintabs3 ul li,#mintabsc ul li{
        float:left;
        margin:3px 5px;
    }
    .tp_name a{
        color:#fff;
    }
    .closetree{
        margin-left: 81px;
        cursor: pointer;
    }
    .mintabright{
        position: absolute;
        top: 62px;
        right: 240px;
        background: #f5f5f5;
        padding: 10px;
        width: 600px;
        height: 455px;
    }
    .mintab2{
        width: 240px;
        height: 454px;
        overflow-y: scroll;
        overflow-x: hidden;
        border-bottom: 1px solid #ddd;
        position: absolute;
        top: 62px;
        right: 0px;
        background: #fff;
    }
    .tab2ul{
        margin:0px;
        padding:0px;
    }
    .tab2ul li{
        text-align: center;
        padding: 4px;
        margin-bottom: 4px;
        cursor: pointer;
    }
    .tab3ul,.tab4ul,.tab5ul{
        margin:8px 0px;
        padding:0px;
    }
    .tab3ul li,.tab4ul li,.tab5ul li{
        display: inline-block;
        margin:5px;
        cursor: pointer;
    }
    .tab4ul{
        border-top: 1px solid #fff;
        padding: 5px;
    }
    .tab4ul>li{
        font-weight: 600;
        margin: 5px 2px;
        padding-right: 5px;
        border-right: 2px solid #333;
    }
    .tab4ul>li:last-child {
        border-right: none;
    }
    .checkedli{
        background: #f5f5f5;
    }
</style>
