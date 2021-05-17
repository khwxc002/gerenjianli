var myChart = echarts.init(document.getElementById('securit_bottom_table'));
let color = [
	"#0090FF",
	"#36CE9E",
	"#FFC005",
	"#FF515A",
	"#8B5CFF",
	"#00CA69"
];
let echartData = [{
		name: "2000",
		value1: 100,
		value2: 233
	},
	{
		name: "2005",
		value1: 138,
		value2: 233
	},
	{
		name: "2010",
		value1: 350,
		value2: 200
	},
	{
		name: "2015",
		value1: 173,
		value2: 180
	},
	{
		name: "2020",
		value1: 180,
		value2: 199
	},
	{
		name: "2000",
		value1: 150,
		value2: 233
	},
	{
		name: "2010",
		value1: 180,
		value2: 210
	},
];

let xAxisData = echartData.map(v => v.name);
let yAxisData1 = echartData.map(v => v.value1);
let yAxisData2 = echartData.map(v => v.value2);
const hexToRgba = (hex, opacity) => {
	let rgbaColor = "";
	let reg = /^#[\da-f]{6}$/i;
	if (reg.test(hex)) {
		rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
						                    "0x" + hex.slice(3, 5)
						                )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
	}
	return rgbaColor;
}

option = {
	color: color,
	legend: {
		right: 20,
		top: 20,
		data: [{
				name: '项目数',
				textStyle: {
					color: '#0090FF',
					fontWeight: 'bolder'

				}
			},
			{
				name: '成交额',
				textStyle: {
					color: '#36CE9E',
					fontWeight: 'bolder'
				}
			},
		],

	},
	tooltip: {
		trigger: "axis",
		formatter: function(params) {
			let html = '';
			params.forEach(v => {
				html += `<div style="color: #666;font-size: 14px;line-height: 24px">
						<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[v.componentIndex]};"></span>
						${v.seriesName}
						<span style="color:${color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
						万元`;
			})

			return html
		},
		extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
		axisPointer: {
			type: 'shadow',
			shadowStyle: {
				color: '#ffffff',
				shadowColor: 'rgba(225,225,225,1)',
				shadowBlur: 5
			}
		}
	},
	grid: {
		top: 100,
		containLabel: true
	},
	xAxis: [{
		type: "category",
		boundaryGap: false,
		axisLabel: {
			formatter: '{value}年',
			textStyle: {
				color: "#d6bf28",
				fontWeight: 'bolder'
			}
		},
		axisLine: {
			lineStyle: {
				color: "#D9D9D9"
			}
		},
		data: xAxisData
	}],
	yAxis: [{
			type: "value",
			name: '(个)',
			position: 'left',
			axisLabel: {
				textStyle: {
					color: "#0090FF",
					fontWeight: 'bolder'
				}
			},
			nameTextStyle: {
				color: "#0090FF",
				fontSize: 8,
				lineHeight: 20,
				fontWeight: 'bolder'
			},
			splitLine: {
				lineStyle: {
					type: "dashed",
					color: "#E9E9E9",
				}
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			}
		},
		{
			type: "value",
			name: '(万元)',
			offset: 60,
			position: 'left',
			min: 0,
			max: 1000,
			splitNumber: 4,
			interval: 250,
			axisLabel: {
				textStyle: {
					color: "#36CE9E",
					fontWeight: 'bolder'
				}
			},
			nameTextStyle: {
				color: "#36CE9E",
				fontSize: 8,
				lineHeight: 30,
				fontWeight: 'bolder'
			},
			splitLine: {
				lineStyle: {
					type: "dashed",
					color: "#E9E9E9"
				}
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			}
		}
	],
	series: [{
		name: "项目数",
		type: "line",
		smooth: true,
		// showSymbol: false,/
		symbolSize: 8,
		zlevel: 3,
		lineStyle: {
			normal: {
				color: color[0],
				shadowBlur: 3,
				shadowColor: hexToRgba(color[0], 0.5),
				shadowOffsetY: 8
			}
		},
		areaStyle: {
			normal: {
				color: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,
					[{
							offset: 0,
							color: hexToRgba(color[0], 0.3)
						},
						{
							offset: 1,
							color: hexToRgba(color[0], 0.1)
						}
					],
					false
				),
				shadowColor: hexToRgba(color[0], 0.1),
				shadowBlur: 10
			}
		},
		data: yAxisData1
	}, {
		name: "成交额",
		type: "line",
		smooth: true,
		// showSymbol: false,
		symbolSize: 8,
		zlevel: 3,
		lineStyle: {
			normal: {
				color: color[1],
				shadowBlur: 3,
				shadowColor: hexToRgba(color[1], 0.5),
				shadowOffsetY: 8
			}
		},
		areaStyle: {
			normal: {
				color: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,
					[{
							offset: 0,
							color: hexToRgba(color[1], 0.3)
						},
						{
							offset: 1,
							color: hexToRgba(color[1], 0.1)
						}
					],
					false
				),
				shadowColor: hexToRgba(color[1], 0.1),
				shadowBlur: 10
			}
		},
		data: yAxisData2
	}]
};
myChart.setOption(option);
