// node自带的模块
const path = require('path')
const url = require('url');
const fs = require('fs')
// npm安装的依赖库
const superagent = require('superagent');
const cheerio = require('cheerio');
const eventproxy = require('eventproxy');
const async = require('async');
const mkdir = require('mkdirp');

// 设置爬虫目标URL
var ssUrl = 'http://kaihua.haiwensoft.com/dqyb.aspx';
var wxUrl = 'http://kaihua.haiwensoft.com/Yjxh.aspx';
var chushiyb = '1';
var chushiyj = '1';
var rf = require("fs");
var lujing = "d://文件读取//七日预警.txt";
var datachu = '';
console.log("读取成功-----1：" + datachu);
var zhuanyilj = decodeURI(lujing)
console.log(zhuanyilj);
var iconv = require('iconv-lite');
//初始化

//开始爬取数据
console.log("程序开始爬取数据：");
console.log('-----1------------------------------------------------------------------------');

//爬取气象数据
function mrqx() {
	superagent.get(ssUrl)
		.end(function(err, res) {
			var $ = cheerio.load(res.text, { decodeEntities: false });

			$('body').find('#artMain').find('div:nth-child(2)').each(function(index, ele) {
				var text = $(ele).text().trim();
				console.log(text);
				console.log('---2--------------------------------------------------------------------------');
				if(text == chushiyb) {} else {
					chushiyb = text;
					superagent
						.get('http://www.b-story.cn:8080/weater-coordinatek/device/pushWeather')
						.query({ title: '每日预报', content: chushiyb, program: 'DAY_REPORT' })
						.end(function(err, res) {
							if(err || !res.ok) {
								console.log('Oh no! error');
							} else {
								console.log('yay got ' + JSON.stringify(res.body));
							}
						});
					console.log(chushiyb);
					console.log('--3---------------------------------------------------------------------------');
				}
			})
		})
}
//爬取预警数据
function mryj() {
	superagent.get(wxUrl)
		.end(function(err, res) {
			var $ = cheerio.load(res.text);
			$('.yjitem').find('a').each(function(index, element) {
				var href = $(element).attr('href');
				console.log(href.replace(/\\/g, '/'));
				console.log('----4-------------------------------------------------------------------------');
				var wxyjUrl = 'http://kaihua.haiwensoft.com/' + href.replace(/\\/g, '/');
				var zhuanyi = encodeURI(wxyjUrl);
				console.log(zhuanyi);
				console.log('----5-------------------------------------------------------------------------');

				superagent.get(zhuanyi)
					.end(function(err, res) {
						var $ = cheerio.load(res.text);
						console.log('---7------------------------------------------------------------------------');
						console.log(wxyjUrl);
						console.log('----------------------------------------------------------------------------');
						$('body').find('div').find('p:nth-child(6)').find('span:nth-child(4)').each(function(index, elex) {
							var wxwb = $(elex).text().trim();
							console.log(wxwb);
							console.log('---8--------------------------------------------------------------------------');
							if(wxwb == chushiyj) {} else {
								chushiyj = wxwb;
								superagent
									.get('http://www.b-story.cn:8080/weater-coordinatek/device/pushWeather')
									.query({ title: '每日预报', content: chushiyb, program: 'ALARM' })
									.end(function(err, res) {
										if(err || !res.ok) {
											console.log('Oh no! error');
										} else {
											console.log('yay got ' + JSON.stringify(res.body));
										}
									});
								console.log(chushiyj);
								console.log('--9---------------------------------------------------------------------------');
							}
						})
					})

			})
		})
}

try {
	mrqx();
	mryj();
	rf.readFile(lujing, 'utf-8', function(err, data) {
//			 data = new StringDecoder('utf-8'); 
		if(err) {
			console.log("读取失败");
		} else {
			console.log("读取成功-----2：" + data);
			if(datachu == data) {
				console.log("没有变化不用修改-----3：");
			} else {
				console.log("已经修改-----3：");
				datachu = data;
				superagent
					.get('http://www.b-story.cn:8080/weater-coordinatek/device/pushWeather')
					.query({ title: '七日预报', content: data, program: 'WEEK_REPORT' })
					.end(function(err, res) {
						if(err || !res.ok) {
							console.log('Oh no! error');
						} else {
							console.log('yay got ' + JSON.stringify(res.body));
						}
					});
			}
		}
	})
	//循环30分钟爬取一次
	var oneSecond = 30000;
	setInterval(function() {
		mrqx();
		mryj();
		rf.readFile(lujing, 'utf-8', function(err, data) {
//			 data = new StringDecoder('utf-8');
			if(err) {
				console.log("读取失败");
			} else {
				console.log("读取成功-----2：" + data);
				if(datachu == data) {
					console.log("没有变化不用修改-----3：");
				} else {
					console.log("已经修改-----3：");
					datachu = data;
					superagent
						.get('http://www.b-story.cn:8080/weater-coordinatek/device/pushWeather')
						.query({ title: '七日预报', content: data, program: 'WEEK_REPORT' })
						.end(function(err, res) {
							if(err || !res.ok) {
								console.log('Oh no! error');
							} else {
								console.log('yay got ' + JSON.stringify(res.body));
							}
						});
				}
			}
		})
	}, oneSecond);
} catch(e) {
	console.log('new error..');
	var child_process = require('child_process');
	//调用执行文件
	var openApp = function() {
		child_process.execFile('E:\qxpc\khqx.bat', null, { cwd: 'E:/' }, function(error, stdout, stderr) {
			if(error !== null) {
				console.log('exec error: ' + error);
			} else console.log('成功执行指令!');
		});
	}
	openApp();
	console.log('正在执行bat文件……');

}