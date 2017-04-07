<template>
    <div>

        <svg id="babel" width="1000" height="800"/>
        <div id="htmleafContent" v-show="circle">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-2 -2 504 504" id="menu" style="transform-origin: 50% 50% 0px; transform: translate3d(0px, 0px, 0px); touch-action: none; -webkit-user-select: none;">

                <g id="symbolsContainer">    <symbol class="icon icon-" id="icon-1" viewBox="0 0 89 89"><!--Replace the contents of this symbol with the content of your icon--><text fill="#fff" x="50%" y="50%" dy=".3rem" text-anchor="middle" font-size="42px">实体</text></symbol>

                    <symbol class="icon icon-" id="icon-2" viewBox="0 0 89 89"><!--Replace the contents of this symbol with the content of your icon--><text fill="#fff" x="50%" y="50%" dy=".3em" text-anchor="middle" font-size="42px">wiki</text></symbol>

                    <symbol class="icon icon-" id="icon-3" viewBox="0 0 89 89"><!--Replace the contents of this symbol with the content of your icon--><text fill="#fff" x="50%" y="50%" dy=".3em" text-anchor="middle" font-size="42px">时评</text></symbol>

                    <symbol class="icon icon-" id="icon-4" viewBox="0 0 89 89"><!--Replace the contents of this symbol with the content of your icon--><text fill="#fff" x="50%" y="50%" dy=".3em" text-anchor="middle" font-size="42px">文献</text></symbol>

                    <symbol class="icon icon-" id="icon-5" viewBox="0 0 89 89"><!--Replace the contents of this symbol with the content of your icon--><text fill="#fff" x="50%" y="50%" dy=".3em" text-anchor="middle" font-size="42px">信息</text></symbol>

                    <symbol class="icon icon-" id="icon-6" viewBox="0 0 89 89"><!--Replace the contents of this symbol with the content of your icon--><text fill="#fff" x="50%" y="50%" dy=".3em" text-anchor="middle" font-size="42px">智库</text></symbol>
                </g>
                <g id="itemsContainer">
                    <a      :class="{active:circleactive=='entity'}" @mouseenter="circlemouseenter" @mouseleave="circlemouseleave"

                            @click="circleClick($event,'entity')" class="item" id="item-1" role="link" tabindex="0" xlink:href=" " xlink:title=" " transform="matrix(1,0,0,1,0,0)" data-svg-origin="250 250" style=""><path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 375,33.49364905389035 l-75,129.9038105676658 A100,100 0 0,1 350,250" class="sector"></path><use  xlink:href="#icon-1" width="90" height="89" x="349.2602233886719" y="122.5" transform="rotate(30 393.7602233886719 167)"></use></a>
                    <a      :class="{active:circleactive=='knowledgeBase'}" @mouseenter="circlemouseenter" @mouseleave="circlemouseleave"

                            @click="circleClick($event,'knowledgeBase')" class="item" id="item-2" role="link" tabindex="0" xlink:href=" " xlink:title=" " transform="matrix(0.5,-0.86602,0.86602,0.5,-91.5063509461097,341.5063509461096)" data-svg-origin="250 250" style=""><path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 375,33.49364905389035 l-75,129.9038105676658 A100,100 0 0,1 350,250" class="sector"></path><use xlink:href="#icon-2" width="90" height="89" x="349.2602233886719" y="122.5" transform="rotate(90 393.7602233886719 167)"></use></a>
                    <a      :class="{active:circleactive=='info'}" @mouseenter="circlemouseenter" @mouseleave="circlemouseleave"

                            @click="circleClick($event,'info')" class="item" id="item-3" role="link" tabindex="0" xlink:href=" " xlink:title=" " transform="matrix(-0.49999,-0.86602,0.86602,-0.49999,158.49364905389024,591.5063509461097)" data-svg-origin="250 250" style=""><path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 375,33.49364905389035 l-75,129.9038105676658 A100,100 0 0,1 350,250" class="sector"></path><use xlink:href="#icon-3" width="90" height="89" x="349.2602233886719" y="122.5" transform="rotate(150 393.7602233886719 167)"></use></a>
                    <a      :class="{active:circleactive=='article'}" @mouseenter="circlemouseenter" @mouseleave="circlemouseleave"

                            @click="circleClick($event,'article')" class="item" id="item-4" role="link" tabindex="0" xlink:href=" " xlink:title=" " transform="matrix(-1,0,0,-1,500,500)" data-svg-origin="250 250" style=""><path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 375,33.49364905389035 l-75,129.9038105676658 A100,100 0 0,1 350,250" class="sector"></path><use xlink:href="#icon-4" width="90" height="89" x="349.2602233886719" y="122.5" transform="rotate(210 393.7602233886719 167)"></use></a>
                    <a      :class="{active:circleactive=='review'}" @mouseenter="circlemouseenter" @mouseleave="circlemouseleave"

                            @click="circleClick($event,'review')" class="item" id="item-5" role="link" tabindex="0" xlink:href=" " xlink:title=" " transform="matrix(-0.5,0.86602,-0.86602,-0.5,591.5063509461097,158.4936490538905)" data-svg-origin="250 250" style=""><path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 375,33.49364905389035 l-75,129.9038105676658 A100,100 0 0,1 350,250" class="sector"></path><use xlink:href="#icon-5" width="90" height="89" x="349.2602233886719" y="122.5" transform="rotate(270 393.7602233886719 167)"></use></a>
                    <a      :class="{active:circleactive=='wiki'}" @mouseenter="circlemouseenter" @mouseleave="circlemouseleave"

                            @click="circleClick($event,'wiki')" class="item" id="item-6" role="link" tabindex="0" xlink:href=" " xlink:title=" " transform="matrix(0.5,0.86602,-0.86602,0.5,341.5063509461096,-91.5063509461097)" data-svg-origin="250 250" style=""><path fill="none" stroke="#111" d="M350,250 l150,0 A250,250 0 0,0 375,33.49364905389035 l-75,129.9038105676658 A100,100 0 0,1 350,250" class="sector"></path><use xlink:href="#icon-6" width="90" height="89" x="349.2602233886719" y="122.5" transform="rotate(330 393.7602233886719 167)"></use></a>
                </g>
                <g id="trigger" class="trigger menu-trigger" role="button">
                    <circle cx="250" cy="250" r="80"></circle>
                    <!-- menu button label or icon goes here -->
                </g>
            </svg>
        </div>
    </div>
</template>


<style>
    #babel .program line {
        stroke: #f5b921;
        stroke-opacity: 0.6;
    }

    #babel .person line {
        stroke: #46d5d7;
        stroke-opacity: 0.6;
    }

    #babel .organization line {
        stroke: #488f49;
        stroke-opacity: 0.6;
    }

    #babel .tech line {
        stroke: #e550a9;
        stroke-opacity: 0.6;
    }

    #babel .location line {
        stroke: #967adc;
        stroke-opacity: 0.6;
    }

    #babel .country line {
        stroke: #e9573f;
        stroke-opacity: 0.6;
    }
</style>
<style scoped>
    .links line {
      stroke: #999;
      stroke-opacity: 0.6;
    }

    .nodes circle {
      stroke: #fff;
      stroke-width: 1.5px;
    }


</style>


<!--圆环相关-->
<style>
    #babel image {
        cursor: pointer;
    }
    #htmleafContent{
        width:120px;
        position:absolute;
        top:100px;
        left:100px;
        transform: rotate(-30deg);
    }
    #menu {
        display: block;
        margin: 0 auto;
        /*overflow: visible;*/ /* uncomment this if you are using bouncing animations*/
    }

    #htmleafContent a{
        cursor: pointer; /* SVG &lt;a&gt; elements don't get this by default, so you need to explicitly set it */
        outline: none;
    }
    #htmleafContent a,#htmleafContent a:hover {
        text-decoration: none !important;
    }

    /* You can change these default styles any way you want */

    #htmleafContent .item .sector {
        transition: all .1s linear;
        fill: rgba(0,0,0,0.6);
        stroke: #111;
    }


    #htmleafContent .item:hover .sector{
        fill: rgba(210,210,210,1);
    }
    #htmleafContent .item.active .sector {
        fill: rgba(240,240,240,1);
    }

    #htmleafContent .menu-trigger {
        fill: rgba(255,255,255,0);
        pointer-events: auto; /* KEEP THIS to make sure it stays clickable even when SVG's pointer events is disabled */
    }

    #htmleafContent .menu-trigger:hover, .menu-trigger:focus {
        cursor: pointer;
    }
    #htmleafContent symbol {
        overflow: visible; /* KEEP THIS so that text will not get cut off it it is wider than the icon width */
    }
    #babel image{
        cursor: pointer;
    }
</style>

<script>
    import program1 from './../static/img/program1.png';
    import program2 from './../static/img/program2.png';
    import person1 from './../static/img/person1.png';
    import person2 from './../static/img/person2.png';
    import organization1 from './../static/img/organization1.png';
    import organization2 from './../static/img/organization2.png';
    import tech1 from './../static/img/tech1.png';
    import tech2 from './../static/img/tech2.png';
    import location1 from './../static/img/location1.png';
    import location2 from './../static/img/location2.png';
    import country1 from './../static/img/country1.png';
    import country2 from './../static/img/country2.png';
    import * as d3 from 'd3'

    var graph;
    var svg;
    var color;
    var simulation;
    var link;
    var newlinks;
    var svg_texts
    var images
    function ticked() {
        var links = svg.selectAll("line");
        links
            .attr("x1", function (d) {
                return d.source.x + 5;
            })
            .attr("y1", function (d) {
                return d.source.y + 5;
            })
            .attr("x2", function (d) {
                return d.target.x + 5;
            })
            .attr("y2", function (d) {
                return d.target.y + 5;
            });

        svg_texts
            .attr("x", function (d) {
                return d.x + 10
            })
            .attr("y", function (d) {
                return d.y + 40;
            });

        images
            .attr("x", function (d) {
                return d.x - 13;
            })
            .attr("y", function (d) {
                return d.y - 13;
            });

    }
    export default{
        data(){
            return{
                msg:'hello vue',


                circle:false,//圆环是否显示
                circleactive:'',//圆环具体选中项
                tachRight:false,
                checkBabel:{},
            }
        },
        props:['d3data','updateLink','closeRight'],
        watch: {
            d3data: 'init',

            updateLink:{
                handler:function(){
                    this.addLink();
                },deep:true,
            },
            tachRight:'tachRightEmit',
            closeRight:function(){
                this.circleactive='';
                this.tachRight=false;
                $('#symbolsContainer').find('text').attr('fill','#fff');
            },
        },
        methods:{
            init:function(){
                svg = d3.select("svg"),
                color = d3.scaleOrdinal(d3.schemeCategory20);

                simulation = d3.forceSimulation()
                    .force("link", d3.forceLink()
                        .id(function (d) {
                            return d.id;
                        })
                        .distance(function (d) {
                            return 250;
                        }))
                    .force("charge", d3.forceManyBody())
                    .force("center", d3.forceCenter(500, 400))
                ;
                graph = this.d3data;
                var links = this.d3data.links;
                //线
                link = svg.append("g")
                    .attr("class", "links")
                    .selectAll("line")
                    .data(links)
                    .enter().append("line")
                    .attr("stroke-width", function (d) {var val=d.value;val > 10000 ? val = 10000 :val;return Math.sqrt(Math.sqrt(val)*3);})//线等于平方根再平方根
                    .attr("stroke","#46d5d7")
                    .attr("stroke-opacity","0.6");
                //文字
                svg_texts = svg.append("g")
                    .selectAll("text")
                    .data(graph.nodes)
                    .enter().append("text")
                    .style("fill", "#999")
                    .style("width", "10px")
                    .attr("font-size", 9)
                    .attr("text-anchor", "middle")
                    .text(function (d) {
                        return d.id;
                    })
                ;

                //图
                images = svg.append("svg")
                    .selectAll("circle")
                    .data(graph.nodes)
                    .enter().append("image")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", 45)
                    .attr("height", 45)
                    .attr("data-LCount", 0)
                    .attr("imgName", function (d) {
                       return d.id;
                    })
                    .attr("imgType", function (d) {
                        return d.type;
                    })
                    .attr("xlink:href", function (d) {
                        if (d.group == 1) {
                            return program2;
                        }
                        if (d.group == 2) {
                            return person2;
                        }
                        if (d.group == 3) {
                            return organization2;
                        }
                        if (d.group == 4) {
                            return tech2;
                        }
                        if (d.group == 5) {
                            return location2;
                        }
                        if (d.group == 6) {
                            return country2;
                        }
                    })
                    .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended))
                ;

                //位置
                simulation
                    .nodes(graph.nodes)
                    .on("tick", ticked);

                simulation.force("link")
                    .links(graph.links);

                $(".links").remove();
                function dragstarted(d) {
                    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                }

                function dragged(d) {
                    d.fx = d3.event.x;
                    d.fy = d3.event.y;
                }

                function dragended(d) {
                    if (!d3.event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }

                //-------------------------圆环相关----------------------------------------------------------------------
                let setshowTach = '';
                let me = this;
                $('#babel').on('click','svg image',showTach);//各个泡泡的点击
                function showTach(e){
                    clearInterval(setshowTach);
                    $('#symbolsContainer').find('text').attr('fill','#fff');


                    var self = this;
                    function move(){
                        var x = parseInt(self.getAttribute('x'))-19.85;
                        var y = parseInt(self.getAttribute('y'))+53.45;

                        if(navigator.appVersion.indexOf('Trident')!=-1){//如果是ie浏览器
                            y = y-15.3;
                        }
                        $('#htmleafContent').css('top',y).css('left',x);
                    }
                    me.tachRight=false;
                    me.checkBabel = {
                        name:$(this).attr('imgName'),
                        type:$(this).attr('imgType')
                    };
                    me.circleactive='';
                    move();
                    me.circle=true;

                    setshowTach = setInterval(move,30)


                };
                $('#trigger circle').on('click',function(){
                    me.circle=false;//圆环是否显示
                    me.circleactive='';//圆环具体选中项
                    me.tachRight=false;
                });
                $('#babel').on('click',function(e){
                    if($(e.target).attr('id')=='babel'){
                        me.circle=false;//圆环是否显示
                        me.circleactive='';//圆环具体选中项
                        me.tachRight=false;
                    }
                });
                //-------------------------圆环相关--------------------------end--------------------------------------------

            },
            addLink:function(){
                $('#babel>g.links').remove();
                svg_texts
                    .each(function (node) {
                            this.style.fill = 'rgb(144,144,144)';
                    });

                images//**********************************点击后突出图标
                    .each(function (node) {
                        $(this).attr("href", function (item) {
                            if (node.group == 1) {
                                return program2;
                            }
                            if (node.group == 2) {
                                return person2;
                            }
                            if (node.group == 3) {
                                return organization2;
                            }
                            if (node.group == 4) {
                                return tech2;
                            }
                            if (node.group == 5) {
                                return location2;
                            }
                            if (node.group == 6) {
                                return country2;
                            }
                        })

                    });








                let self = this;

                this.updateLink.updateLink.forEach(function(sixArr){//外层循环6大类
                    sixArr.list.forEach(function(item){//内层循环每类中的选中项
                        addLinkGo(item, sixArr.text,self.updateLink.links)
                    });
                });
                function addLinkGo(key, type,links){
                    newlinks = [];
                    self.d3data.links.forEach(function(obj){
                        links.forEach(function(link){
                            if (obj.source.id == link.source && obj.target.id == link.target && obj.source.id == key) {
                                obj.value = link.value;
                                newlinks.push(obj);
                            }
                        });
                    });

                    //给被连线的节点变颜色
                    svg_texts
                        .each(function (node) {
                            var isTrue = false;
                            newlinks.forEach(function (d) {
                                if (d.target.id == node.id || d.source.id == node.id) {
                                    isTrue = true;
                                }
                            });
                            if (isTrue) {
                                this.setAttribute('data-LCount', +this.getAttribute('data-LCount') + 1);
                                this.style.fill = 'rgb(0,0,0)';
                            }


                        });

                    images//**********************************点击后突出图标
                        .each(function (node) {
                            var isTrue = false;
                            newlinks.forEach(function (d) {
                                if (d.target.id == node.id || d.source.id == node.id) {
                                    isTrue = true;
                                }
                            });
                            if (isTrue) {
                                this.setAttribute('data-LCount', +this.getAttribute('data-LCount') + 1);

                                    $(this).attr("href", function (d) {
                                        if (node.group == 1) {
                                            return program1;
                                        }
                                        if (node.group == 2) {
                                            return person1;
                                        }
                                        if (node.group == 3) {
                                            return organization1;
                                        }
                                        if (node.group == 4) {
                                            return tech1;
                                        }
                                        if (node.group == 5) {
                                            return location1;
                                        }
                                        if (node.group == 6) {
                                            return country1;
                                        }
                                    })

                            } else {
                                if (this.getAttribute('data-LCount') < 1) {
                                    $(this).attr("href", function (d) {
                                        if (node.group == 1) {
                                            return program2;
                                        }
                                        if (node.group == 2) {
                                            return person2;
                                        }
                                        if (node.group == 3) {
                                            return organization2;
                                        }
                                        if (node.group == 4) {
                                            return tech2;
                                        }
                                        if (node.group == 5) {
                                            return location2;
                                        }
                                        if (node.group == 6) {
                                            return country2;
                                        }
                                    })
                                }
                            }


                        });


                    //线
                    link = svg.append('g')
                        .attr("class", "links " + key.replace(/[\s.,]/ig, '') + " " + type)
                        .selectAll("line")
                        .data(newlinks)
                        .enter().append("line")
                        .attr("stroke-width", function (d) {var val=d.value;val > 10000 ? val = 10000 :val;return Math.sqrt(Math.sqrt(val)*3);})//线等于平方根再平方根
                    //---------------------------------------------
                    let str = '#babel .' + (key.replace(/[\s.,]/ig, ''))
                    $('#babel')[0].insertBefore($(str)[0],$('#babel').find('g')[0]);

                    //------------------------------------------改成球压线

                    simulation.force("link")
                        .links(graph.links);


                }
                ticked();




            },
//            --------------------------圆环相关----------------------------------------------------------------------
            circleHide:function(){//圆环消失
                this.circle=false;
                this.circleactive='';
                this.tachRight=false;
            },
            circleClick:function(e,str){//圆环上六个扇形按钮点击
                let evt = e.target;
                let target = $(evt).parent();
                if(evt.tagName=='a')
                    target = $(evt)
                e.preventDefault();
                if(str!='entity'){      //点击的 不是 实体时让右侧隐藏
                    this.tachRight=false;
                }

                if(this.circleactive!=str){   //点击的 不是 active状态的扇形
                    $('#symbolsContainer').find('text').attr('fill','#fff');
                    console.log(target)
                    $(target.find('use').attr('xlink:href')).find('text').attr('fill','#000');
                    this.circleactive=str;

                    if(str=='entity'){     //点击 实体时弹出右侧的列表
                        let relateds = [];
                        let me = this;
                        let program = {type:'program',list:[],isShow:false};
                        let person = {type:'person',list:[],isShow:false};
                        let organization = {type:'organization',list:[],isShow:false};
                        let tech = {type:'tech',list:[],isShow:false};
                        let location = {type:'location',list:[],isShow:false};
                        let country = {type:'country',list:[],isShow:false};
                        this.d3data.links.forEach(function(obj){
                            if (obj.source.id == me.checkBabel.name) {
                                if(obj.target.type=='program'){
                                    program.list.push(obj.target.id);
                                }else if(obj.target.type=='person'){
                                    person.list.push(obj.target.id);
                                }else if(obj.target.type=='organization'){
                                    organization.list.push(obj.target.id);
                                }else if(obj.target.type=='tech'){
                                    tech.list.push(obj.target.id);
                                }else if(obj.target.type=='location'){
                                    location.list.push(obj.target.id);
                                }else if(obj.target.type=='country'){
                                    country.list.push(obj.target.id);
                                }
                            }
                        });
                        if(program.list.length>0){
                            relateds.push(program);
                        }
                        if(person.list.length>0){
                            relateds.push(person);
                        }
                        if(organization.list.length>0){
                            relateds.push(organization);
                        }
                        if(tech.list.length>0){
                            relateds.push(tech);
                        }
                        if(location.list.length>0){
                            relateds.push(location);
                        }
                        if(country.list.length>0){
                            relateds.push(country);
                        }
                        let rightData = {
                            tachRight:true,
                            entity:this.checkBabel.name,
                            relateds:relateds
                        }
                        this.tachRight = true;
                        this.$emit('rightData',rightData);//传递右侧相关实体
                    }
                }
                else{  //点击已经active状态的扇形
                    this.circleactive='';
                    if(str=='entity'){
                        this.tachRight=false;

                    }
                }
            },
            circlemouseenter:function(e){//在圆环上鼠标滑动
                let evt = e.target;
                let target = $(evt).parent();
                if(evt.tagName=='a')
                    target = $(evt)

                $(target.find('use').attr('xlink:href')).find('text').attr('fill','#000');
            },

            circlemouseleave:function(e){//在圆环上鼠标滑动离开
                let evt = e.target;
                let target = $(evt).parent();
                if(evt.tagName=='a')
                    target = $(evt)

                if(target.hasClass('active')){return}
                $(target.find('use').attr('xlink:href')).find('text').attr('fill','#fff');
            },

            tachRightEmit:function(){//触发右侧打开
                this.$emit('tachRightEmit',this.tachRight)
            },

        },
        mounted:function(){




        },

    }

</script>
