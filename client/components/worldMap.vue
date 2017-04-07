<template>
    <div>
        <div class='worldmap'></div>
    </div>
</template>

<script>
    import * as d3 from 'd3';
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        props:['data'],
        watch:{
            data:'init'
        },
        methods:{
            init:function(){
                $('.worldmap').empty();
                let self = this;
                let val = this.data;
                let width = $('.worldmap').width();
                let height = $(".worldmap").width()*4/9-20;
                let basePath = $('#basePath').val();
                let svg = d3.select('.worldmap').append('svg').attr("width",width).attr("height",height);


                //定义一个线性比例尺，将最小值和最大值之间的值映射到[0, 1]
                let linear = d3.scaleLinear()
                .domain([0,3000])
                .range([0, 1]);

                //定义最小值和最大值对应的颜色
                let a = d3.rgb(0,255,255);  //浅蓝色
                let b = d3.rgb(0,0,255);    //蓝色

                //颜色插值函数
                let computeColor = d3.interpolate(a,b);



                /*将 GeoJSON 地图数据 使用投影函数转换 经纬度*/
                let projection = d3.geoMercator().scale(45*height/200).translate([width/2,height-height*(0.30)]);

                /*地理路径生成器    根据地图经纬度 在 SVG 中 path 元素路径*/
                let path = d3.geoPath().projection(projection);

                /*向服务器请求文件并绘制地图*/
                d3.json("http://192.168.1.205:8082/layui/world-countries.js", function(json) {

                    let tooltip = d3.select(".worldmap").append("div")
                    .attr("class","tooltip") //用于css设置类样式
                    .attr("opacity",0.0);

                    let world = svg.selectAll("path")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("stroke","rgba(255,255,255,1)")
                    .attr("stroke-width",1)
                    .attr("fill",function(d){
                        let select = d3.select(this);
                        let flag = false;
                        let clo ="";
                        for(let i=0;i<val.length;i++){
                            if(d.properties.name == val[i].key){
                                let t = linear(val[i].doc_count);
                                let color = computeColor(t);
                                color = color.toString();
                                select.attr('colormark',color);
                                clo = color;
                                flag = true;
                                return clo;
			                }
                        }
                        select.attr('colormark','rgba(128,124,139,0.61)');
                        return 'rgba(128,124,139,0.61)';
                    })
                    .attr("d", path ) //使用地理路径生成器
                    .text(function(d){
                        return d.properties.name;
                    })
                    .on("mouseover",function(d,i){
                        let countryName='';
                        let size='';
                        d3.select(this)
                        .attr("fill","red");
                        $.each(val,function(i,value){
                            if(d.properties.name == value.key){
                                countryName = '国家 : '+ value.key;
                                size = '数量 : '+ value.doc_count;
                                return false;
                            }
                        });
                        $('#worldTitle2>.country_name').html(countryName);
                        $('#worldTitle2>.size').html(size);
                    })

                    .on("mouseout",function(d,i){
                        d3.select(this)
                        .attr("fill",d3.select(this).attr('colormark'));
                        tooltip.style("opacity",0.0);
                        $('#worldTitle2>.country_name').html('');
                        $('#worldTitle2>.size').html('');
                    })

                });

                let defs = svg.append("defs");

                let linearGradient = defs.append("linearGradient")
                .attr("id","linearColor")
                .attr("x1","0%")
                .attr("y1","0%")
                .attr("x2","0%")
                .attr("y2","100%");

                let stop1 = linearGradient.append("stop")
                .attr("offset","0%")
                .style("stop-color",a.toString());

                let stop2 = linearGradient.append("stop")
                .attr("offset","100%")
                .style("stop-color",b.toString());

                //添加一个矩形，并应用线性渐变
                let colorRect = svg.append("rect")//**************************密度色块
                .attr("x",width-60)
                .attr("y", height-150)
                .attr("width", 30)
                .attr("height", 140)
                .style("fill","url(#" + linearGradient.attr("id") + ")");
                //添加文字
                let minValueText = svg.append("text")
                .attr("class","valueText")
                .attr("x", width-20)
                .attr("y", height-135)
                .attr("dy", "-0.3em")
                .text(function(){
                    return "-";
                });

                let maxValueText = svg.append("text")
                .attr("class","valueText")
                .attr("x", width-20)
                .attr("y", height-10)
                .attr("dy", "-0.3em")
                .text(function(){
                    return "+";
                });
            }
        }
    }
</script>
<style>
    #worldTitle {
        position: absolute;
        left: 28%;
        top: 10%;
        font-weight: 500;
    }
    #worldTitle2 {
        position: absolute;
        left: 55%;
        bottom: 20px;
    }
    #worldTitle2>.size {
        margin-left: 15px;
    }
    .main_carousel .btnAll{
	position:absolute;
	cursor:pointer;
	font-size:10px;
	z-index:50;
}



    .main_carousel .carousel-inner>.item>img{
    text-align: center;
    height:auto;
    width:100%;
}
    .main_carousel .d3,.worldmap{
    width:100%;
    float:left;
    height:100%;
}

    .main_carousel .d3>svg{
    overflow: initial;
}
    .main_carousel .main_carousel .carousel-control {
    width: 10%;

}

    .main_carousel .d3 g.axis:nth-of-type(1) g.tick>text{
    max-width:100px;
    text-overflow: ellipsis;
    overflow:hidden;
    white-space: nowrap;
    text-anchor: start !important;
    transform: rotate(45deg);
    transform-origin:0% 0%;

    -ms-transform: rotate(45deg);
    -ms-transform-origin:0% 0%;

    -webkit-transform-origin:0% 0%;
    -webkit-transform: rotate(45deg);


    -moz-transform: rotate(45deg);
-moz-transform-origin:0% 0%;

-o-transform: rotate(45deg);
-o-transform-origin:0% 0%;
}

    .main_carousel .d3 g.tick>text{
	font-size:10px;
}
    .main_carousel .worldmap{
	position:relative;

}
    .main_carousel #worldTitle{
	position:absolute;
	left:28%;
	top:10%;
	font-weight:500;
}
    .main_carousel #worldTitle2{
	position:absolute;
	left:55%;
	bottom:20px;
}
    .main_carousel #worldTitle2>.size{
	margin-left:15px;
}

    .main_carousel .carousel-indicators {
    bottom: 5px;
}
    .main_carousel .d3world{
    width:100%;
    text-align: center;
}

    .main_carousel .carousel-control, .carousel-control:focus{
    opacity: 0.2;
}
    .main_carousel .carousel-control:hover {

    opacity: 0.5;
}
    .main_carousel .carousel-caption {
    text-shadow: 0 0px 0px rgba(0, 0, 0, 0);
}

    .main_carousel .carousel-caption>p {
    font-size: 36px;
    color:#fff;
}
    .main_carousel .item:nth-child(3) .carousel-caption>p {
    color:#000;
    position: relative;
    top:-150px;
   left:200px;

}
</style>