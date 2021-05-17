var myChart = echarts.init(document.getElementById('aeaatwotzszxmje'));
let bgcolourxmje = "#fff";
let colour = [
	"#0090FF",
	"#36CE9E",
	"#FFC005",
	"#8B5CFF",
	"#00CA69"
];
let echartsData =  [{
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

let xAxisDataxmje = echartsData.map(v => v.name);
//  ["1", "2", "3", "4", "5", "6", "7", "8"]
let yAxisData1xmje = echartsData.map(v => v.value1);
// [100, 138, 350, 173, 180, 150, 180, 230]
let yAxisData2xmje = echartsData.map(v => v.value2);
// [233, 233, 200, 180, 199, 233, 210, 180]
const hexToRgbaxmje = (hex, opacity) => {
	let rgbacolour = "";
	let reg = /^#[\da-f]{6}$/i;
	if (reg.test(hex)) {
		rgbacolour = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
							  "0x" + hex.slice(3, 5)
							)},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
	}
	return rgbacolour;
}

option = {
	backgroundcolor: bgcolourxmje,
	color: colour,
	legend: {
		right: 50,
		top: 30,
		textStyle: {
			color: '#fff',
			fontSize: "16"
		}
	},
	tooltip: {
		trigger: "axis",
		formatter: function(params) {
			let html = '';
			params.forEach(v => {
				html += `<div style="color: #666;font-size: 14px;line-height: 24px">
										<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${colour[v.componentIndex]};"></span>
										${v.seriesName}.${v.name}
										<span style="color:${colour[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>`;
			})



			return html
		},
		extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
		axisPointer: {
			type: 'shadow',
			shadowStyle: {
				color: '#ffffff',
				shadowcolor: 'rgba(225,225,225,1)',
				shadowBlur: 5
			}
		}
	},
	grid: {
		top: 100,
	},
	xAxis: [{
		type: "category",
		boundaryGap: false,
		axisLabel: {
			formatter: '{value}',
			textStyle: {
				color: "#00c0ff"
			}
		},
		axisLine: {
			lineStyle: {
				color: "#D9D9D9"
			}
		},
		data: xAxisDataxmje
	}],
	yAxis: [{
		type: "value",
		scale : true,
		max : 600,
		min : 0,
		splitNumber : 3,
		name: '历年投资项目金额',
		axisLabel: {
			textStyle: {
				color: "#00c0ff"
			}
		},
		nameTextStyle: {
			color: "#00c0ff",
			fontSize: 10,
			lineHeight: 30
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
	}],
	series: [{
		name: "今日取号量",
		type: "line",
		// smooth: true,
		// showSymbol: false,/
		symbolSize: 8,
		zlevel: 3,
		lineStyle: {
			normal: {
				color: colour[0],
				shadowBlur: 3,
				shadowcolor: hexToRgbaxmje(colour[0], 0.5),
				shadowOffsetY: 8
			}
		},
		areaStyle: {
			normal: {
				colour: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,

					[{
							offset: 0,
							color: hexToRgbaxmje(colour[0], 0.3)
						},
						{
							offset: 1,
							color: hexToRgbaxmje(colour[0], 0.1)
						}
					],
					false
				),
				shadowcolor: hexToRgbaxmje(colour[0], 0.1),
				shadowBlur: 10
			}
		},
		data: yAxisData1xmje
	}, {
		name: "今日接待量",
		type: "line",
		// smooth: true,
		// showSymbol: false,
		symbolSize: 8,
		zlevel: 3,
		lineStyle: {
			normal: {
				color: colour[1],
				shadowBlur: 3,
				shadowcolor: hexToRgbaxmje(colour[1], 0.5),
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
							color: hexToRgbaxmje(colour[1], 0.3)
						},
						{
							offset: 1,
							color: hexToRgbaxmje(colour[1], 0.1)
						}
					],
					false
				),
				shadowcolor: hexToRgbaxmje(colour[1], 0.1),
				shadowBlur: 10
			}
		},
		data: yAxisData2xmje
	}]
};
myChart.setOption(option);
