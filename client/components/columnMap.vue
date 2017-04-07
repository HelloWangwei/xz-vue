<template>
    <div>
        <div class='d3'></div>
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
                let self = this;
                let val = this.data;
                let width = $('.d3').width();
                let height = $(".d3").width()*0.333*5;
                let rectColor = "#00baff";
                let basePath = $('#basePath').val();

                let svg = d3.select(".d3").append("svg")
                    .attr("width",width)
                    .attr("height",height);
                let tooltip = d3.select(".d3").append("div")
                    .attr("class","tooltip") //用于css设置类样式
                    .attr("opacity",1.0);//设置为常显
                tooltip.html("点击柱状图,改变右侧地图热度")
                    .style("left","10%")
                    .style("top",(1)+"px")
                    .style("font-weight",900)
                    .style("opacity",1.0);

                //所有热度按钮
                let btnAll = d3.select(".d3").append("p")
                    .attr("class","btnAll btn btn-info");//用于css设置类样式
                btnAll.html("全选")
                    .style("left","28%")
                    .style("top","50%")
                    .style("opacity",1.0)
                    .on('click',function(d,i){

                        let select = d3.selectAll('.d3>svg>rect');
                        select.attr("fill",rectColor);
                        $('#worldTitle').html('全部');
                        self.$emit('columnChange', 'all');
                    });


                let nameArray = [];
                let sizeArray = [];
                let dataset = [];
                let testset = [];
                let maxY=parseFloat(val[0].size);
                for(let i=0;i<val.length;i++){
                    if(parseFloat(val[i].size)>maxY){maxY=val[i].size;};
                    nameArray[i] = val[i].name;
                    sizeArray[i] = val[i].size;
                    dataset.push(val[i].size);
                }



                let xAxisScale = d3.scaleBand()
                    .domain(nameArray)
                    .range([0,width*0.83]);

                let yAxisScale = d3.scaleLinear()
                    .domain([0,maxY])
                    .range([height*0.68,0]);

                let xAxis = d3.axisBottom(xAxisScale);

                let yAxis = d3.axisLeft(yAxisScale);

                let xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .range([0,width*0.83],0.05);

                let yScale = d3.scaleLinear()
                    .domain([0,maxY])
                    .range([0,height*0.68]);

                //changing
                svg.selectAll("rect")
                    .data(dataset)
                    .enter()
                    .append("rect")
                    .attr("x", function(d,i){
                        return width/6 + xScale(i) + xScale.range()[1]/63;
                    } )
                    .attr("y",function(d,i){
                        return height/12 + height*0.68 - yScale(d) ;
                    })
                    .attr("width", function(d,i){
                        return xScale.range()[1]/77; //***********************宽度
                    })
                    .attr("height",yScale)
                    .attr("fill",rectColor)
                    .attr("topic",function(d,i){
                        return val[i].topic;
                    })
                    .on('click',function(d,i){
                        let select = d3.selectAll('.d3>svg>rect');
                        select.attr("fill",rectColor);
                        d3.select(this)
                            .attr("fill",'rgb(255,0,0)');
                        $('#worldTitle').html(self.data[i].name);
                        self.$emit('columnChange', self.data[i]);
                    })
                    .on("mouseover",function(d,i){
                        d3.select(this)
                        //.attr("fill",'rgb(255,0,0)');

                    })
                    .on("mouseout",function(d,i){
                        d3.select(this)
                        //.attr("fill",rectColor);
                        //tooltip.style("opacity",0.0);
                    });

                svg.selectAll("text")
                    .data(dataset)
                    .enter().append("text")
                    .attr("x", function(d,i){
                        return (width/6 -80) + xScale(i) + xScale.range()[1]/63;
                    } )
                    .attr("y",function(d,i){
                        return height/12 + height*0.68 - 18 - yScale(d) ;
                    })
                    .attr("dx", function(d,i){
                        return xScale.range()[1]/3;
                    })
                    .attr("dy", 15)
                    .attr("text-anchor", "begin")
                    .attr("font-size", 14)
                    .attr("fill","black")
                    .text(function(d,i){
                        return d;
                    });

                svg.append("g")
                    .attr("class","axis")
                    .attr("transform","translate("+width/6+","+(height/12 + height*0.68)+")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class","axis")
                    .attr("transform","translate("+width/6+","+(height/12 + height*0.00)+")")
                    .call(yAxis);


            }
        }
    }
</script>
<style>

</style>