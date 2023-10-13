import * as echarts from "echarts";
function sum(arr) {
    return eval(arr.join("+"));
}
export function initBarChart(data, el) {
    const formatData = [...data]
    data = formatData.map(
        (item) =>
            Math.round(
                (parseFloat(item) / parseFloat(sum(formatData))) * 10000
            ) / 100
    );
    const barChart = echarts.init(document.getElementById(el));
    const option = {
        title: {
            show: true,
            text: "短期下跌风险",
            textStyle: {
                fontWeight: "bold",
                fontSize: 18,
            },
            x: "center",
            y: "bottom",
        },
        tooltip: {
            trigger: "axis",
            formatter: function (params) {
                let dataIndex = params[0].dataIndex;
                let tooltipContent = params[0].name + "<br>";
                tooltipContent += "占比: " + params[0].data + "%<br>"; // 显示百分比
                tooltipContent += "数量: " + formatData[dataIndex] + "<br>"; // 显示原始值
                return tooltipContent;
            },
        },
        xAxis: {
            type: "category",
            data: ["SR1", "SR2", "SR3", "SR4", "SR5"],
            axisTick: { show: false },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: "#666666",
                },
            },
            axisLine: { lineStyle: { color: "#dddddd" } },
        },
        yAxis: {
            type: "value",
            name: "单位（%）",
            nameGap: 35,
            min: 0,
            max: 100,
            interval: 25,
        },
        series: [
            {
                name: "收入",
                type: "bar",
                data: data,
                barWidth: 20,
            },
        ],

    }
    option && barChart.setOption(option);
    window.addEventListener("resize", function () {
        barChart.resize();
    });
}
export function initLineChart(data, el) {
    const lineChart = echarts.init(document.getElementById(el))
    const options = {
        title: {
            show: true,
            text: "两融折算率分布图",
            textStyle: {
                fontWeight: "bold",
                fontSize: 18,
            },
            x: "center",
            y: "bottom",
        },
        legend: {
            orient: "horizontal",
            x: "right",
            y: "top",
            textStyle: {
                fontSize: 12,
            },
            data: [
                {
                    name: "德勤折算率",
                },
                {
                    name: "其他券商折算率",
                },
            ],
        },
        xAxis: {
            data: ["A", "B", "C", "D", "E"],
        },
        yAxis: {},
        series: [
            {
                name: "德勤折算率",
                data: [800, 1500, 2000, 1300, 1600],
                type: "line",
                smooth: true,
                areaStyle: {
                    normal: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "#bdcff2",
                                },
                                {
                                    offset: 1,
                                    color: "#FFF",
                                },
                            ],
                        },
                    },
                },
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 5,
                        },
                    },
                },
            },
            {
                name: "其他券商折算率",
                data: [100, 500, 200, 130, 160],
                type: "line",
                color: "#00b3f6",
                smooth: true,
            },
        ],
        tooltip: {
            trigger: 'axis'
        }
    }
}