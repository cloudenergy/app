angular.module('gugecc.filters', [])
    .filter('unix', function() {
        return function(input, type) {
            var format = type == 'DAY' ? 'HH:ss' : 'YYYY-MM-DD';
            return moment(input / 1000, 'X').format(format);
        }
    })
    .filter('timestamp', function() {
        return function(input, format) {
            return moment.unix(input).format(format|| 'YYYY-MM-DD');
        }
    })
    .filter('bill', function(){
        return function(input){
            return '';
        }
    })
    .filter('rtime', function(){
        return function(input, m){
            var format = m ? 'YYYY-MM-DD' : 'YYYY-MM';
            return moment(input, 'YYYYMMDD').format(format);
        }
    })
    .filter('sum', function() {
        return function(input, key) {
            var sum = 0;
            _.each(input, function(v) {
                key ? sum += Number(v[key]) : sum += v;
            });
            return sum;
        }
    })
    .filter('percent', function() {
        return function(input, key) {
            var sum = 0, val = 0;
            _.each(input, function(v) {
                sum += v.sum;
                val += v[key];
            });
            return sum ? val*100/sum : 0;
        }
    })
    .filter('energy', function() {
        var energy = {
            'BIZELECTRIC': '商业电',
            'AIRCONDITION': '空调',
            'BIZCOOLINGENERGY': '商用冷量',
            'BIZELECTRIC': '商业电',
            'BIZGAS': '商用煤气',
            'BIZHEATENERGY': '商用热量',
            'BIZOXYGEN': '商业氧气',
            'CHAINBIZELECTRIC': '连锁商业用电',
            'COLDWATER': '冷水',
            'COOLINGENERGY': '冷量',
            'DININGELECTRIC': '餐饮用电',
            'DIRECTWATER': '直饮水',
            'ELECTRIC': '电	',
            'GAS': '煤气',
            'HEATENERGY': '热量',
            'HOTELELECTRIC': '宾馆用电',
            'HOTWATER': '热水',
            'OXYGEN': '氧气',
            'WINDENERGY': '风量'
        }
        return function(input) {
            return energy[input] || '';
        }
    })
    .filter('meter', function() {
        return function(t, k) {
            var d = {
                'ELECTRICITYMETER': {
                	name: '电表',
                	channel: 11,
                	icon: '3'
                },
                'COLDWATERMETER': {
                	name: '冷水表',
                	icon: '2'
                },
                'HOTWATERMETER': {
                	name: '热水表',
                	icon: '2'
                },
                'ENERGYMETER': {
                	name: '能量表',
                	icon: '1'
                },
                'TEMPERATURECONTROL': {
                	name: '温控器',
                	icon: '1'
                } 
            };
            return t ? d[t][k] || '3' : '3';
        }
    })
    .filter('card', function(){
        return function(input){
            return input.replace(input.substr(4), '****') + input.substr(-4);
        }
    })
    .filter('bank', function(){
        var limit = {
                limit1: {"abc": "50000","bcm": "50000","bob": "50000","boc": "50000","boss": "5000","ccb": "50000","cciticb": "500000","ceb": "50000","cib": "50000","cmb": "50000","cmbc": "1000000","gdb": "500000","hxb": "50000 ","icbc": "50000","pinganb": "500000","psbc": "50000 ","sdb": "50000","spdb": "50000"},
                limit2: {"abc": "50000","bcm": "500000","bob": "50000","boc": "无限额","boss": "50000","ccb": "无限额","cciticb": "无限额","ceb": "50000","cib": "50000","cmb": "50000","cmbc": "无限额","gdb": "无限额","hxb": "无限额 ","icbc": "50000","pinganb": "5000000","psbc": "50000 ","sdb": "50000","spdb": "50000"},
            }, banks = {"abc": "农业银行","bcm": "交通银行","bob": "北京银行","boc": "中国银行","boss": "上海银行","ccb": "建设银行","cciticb": "中信银行","ceb": "光大银行","cib": "兴业银行","cmb": "招商银行","cmbc": "民生银行","gdb": "广东发展银行","hxb": "华夏银行 ","icbc": "工商银行","pinganb": "平安银行","psbc": "中国邮政储蓄银行 ","sdb": "深圳发展银行","spdb": "浦东发展银行"};

        return function(input, type){
            return !!type ? limit[type][input] : banks[input];
        }
    })
    .filter('week', function(){
        var days = ['日', '一', '二', '三', '四', '五', '六'];
        return function(input, format){
            if (!input) {
                return '';
            }
            var f = format ? format : 'YYYY-MM-DD';
            return '星期' + days[moment(input, f).weekday()];
        }
    })
