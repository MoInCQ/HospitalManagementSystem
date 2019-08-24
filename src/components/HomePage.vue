<template>
    <div>
        <el-row>
            <!--创建一个echarts的容器-->
            <el-col :span="15">
                
                <div id="barChart" :style="{width: '700px', height: '700px'}"></div>
            </el-col>

            <el-col :span="9" >
                <!-- 右上六个小卡片 -->
                <el-row>
                    <el-col :span="11">
                        <el-row class="row-margin">
                            <el-card class="little-card-style" shadow="hover"> 

                                <el-row>
                                    <el-col :span="10">
                                        <el-avatar :size="size" :src="circleUrl"></el-avatar>
                                    </el-col>

                                    <el-col :span="14">
                                        <div class="card-content-text-title">254</div>
                                        <div class="card-content-text">今日挂号量</div>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-row>

                        <el-row class="row-margin">
                            <el-card class="little-card-style" shadow="hover"> 

                                <el-row>
                                    <el-col :span="10">
                                        <el-avatar :size="size" :src="circleUrl"></el-avatar>
                                    </el-col>

                                    <el-col :span="14">
                                        <div class="card-content-text-title">254</div>
                                        <div class="card-content-text">今日挂号量</div>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-row>

                        <el-row class="row-margin">
                            <el-card class="little-card-style" shadow="hover"> 

                                <el-row>
                                    <el-col :span="10">
                                        <el-avatar :size="size" :src="circleUrl"></el-avatar>
                                    </el-col>

                                    <el-col :span="14">
                                        <div class="card-content-text-title">254</div>
                                        <div class="card-content-text">今日挂号量</div>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-row>
        
                    </el-col>

                    <el-col :span="11" :offset="2">
                        <el-row class="row-margin">
                            <el-card class="little-card-style" shadow="hover"> 

                                <el-row>
                                    <el-col :span="10">
                                        <el-avatar :size="size" :src="circleUrl"></el-avatar>
                                    </el-col>

                                    <el-col :span="14">
                                        <div class="card-content-text-title">254</div>
                                        <div class="card-content-text">今日挂号量</div>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-row>

                        <el-row class="row-margin">
                            <el-card class="little-card-style" shadow="hover"> 

                                <el-row>
                                    <el-col :span="10">
                                        <el-avatar :size="size" :src="circleUrl"></el-avatar>
                                    </el-col>

                                    <el-col :span="14">
                                        <div class="card-content-text-title">254</div>
                                        <div class="card-content-text">今日挂号量</div>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-row>

                        <el-row class="row-margin">
                            <el-card class="little-card-style" shadow="hover"> 

                                <el-row>
                                    <el-col :span="10">
                                        <el-avatar :size="size" :src="circleUrl"></el-avatar>
                                    </el-col>

                                    <el-col :span="14">
                                        <div class="card-content-text-title">254</div>
                                        <div class="card-content-text">今日挂号量</div>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-row>
        
                    </el-col>
  
                </el-row>

                <el-divider></el-divider>

                <!-- 折线图 -->
                <el-row>
                    <div id="lineChart" :style="{width: '450px', height: '300px'}"></div>
                </el-row>
            </el-col>

        </el-row>
    </div>


</template>

<style scoped>

.card-style {
    height: 90px;
    width: 100%;

}

.verticalLine {
    height: 700px;
}

.card-content-text-title {
    font-size: larger;
    font-style: italic;
    font-weight:bolder;
}


.card-content-text {
    font-size:small;
    font-style: normal;
    font-weight: normal;
    color:gray;
}

.row-margin {
    margin-bottom: 25px;
}

</style>

<script>


    export default {

        
        data () {
            return {
                circleUrl: require( '../assets/medicine.png'),
            }
        },
        mounted(){
            this.drawBar();
            this.drawLine();
        },
        methods: {
            drawBar(){
                // 基于准备好的dom，初始化echarts实例
                let barChart = this.$echarts.init(document.getElementById('barChart'))
                // 绘制图表
                barChart.setOption(
                    {
                        legend: {},
                        tooltip: {},
                        dataset: {
                            source: [
                                ['product', '2016年', '2017年', '2018年', '2019年'],
                                ['挂号量（/万次）', 82, 76, 87, 92],
                                ['退号量（/千次）', 29, 18, 43, 32],
                                ['治愈率（%）', 89.1, 90.2, 92.3, 95.5]
                            ]
                        },
                        xAxis: [
                            {type: 'category', gridIndex: 0},
                            {type: 'category', gridIndex: 1}
                        ],
                        yAxis: [
                            {gridIndex: 0},
                            {gridIndex: 1}
                        ],
                        grid: [
                            {bottom: '55%'},
                            {top: '55%'}
                        ],
                        series: [
                            // These series are in the first grid.
                            {type: 'bar', seriesLayoutBy: 'row'},
                            {type: 'bar', seriesLayoutBy: 'row'},
                            {type: 'bar', seriesLayoutBy: 'row'},
                            // These series are in the second grid.
                            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
                        ]
                    });
            },

            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let lineChart = this.$echarts.init(document.getElementById('lineChart'))
                // 绘制图表
                lineChart.setOption({
                    title:{
                        text: "一周就诊情况统计(/人次)"
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                });

            }
        }
    }
</script>