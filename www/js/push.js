(function () {
	
	function init () {
		// 初始化极光推送 和 显示键盘 accessorybar
	    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
	}

	document.addEventListener('deviceready', init);

    app.service('push', ['cookies', '$q', '$timeout', '$state', '$rootScope', 
    	function(cookies, $q, $timeout, $state, $rootScope){

    	function regTags (me) {
    		var tags = [];
			tags.push('user_'+me.uid);
			tags.push('project_'+me.project);
			window.plugins.jPushPlugin.setTags(tags);
    	} 

    	this.register = function(me){
            if (!window.plugins || !window.plugins.jPushPlugin) {
                return;
            }
            window.plugins.jPushPlugin.init();

    		this.account = me;
	    	// 获取 registerId;
			document.addEventListener('deviceready', this.getID.bind(this));

			document.addEventListener("jpush.openNotification", this.onOpen.bind(this), false);
		    document.addEventListener("jpush.receiveNotification", this.onReceive.bind(this), false);
    	   
            document.addEventListener("jpush.setTagsWithAlias", function(evt){
                console.log('set tag: ', evt, arguments);
            }, false);

            // 检查推送状态
            // window.plugins.jPushPlugin.resumePush(function(res){
            //     console.log('push resume: ', res, arguments);
            // })

            document.addEventListener("jpush.receiveMessage", function(evt){
                console.log('receive message: ', evt);
            }, false);
        }

    	this.getID = function getID () {
    		function onID (data){
				if (data.length == 0) {
                    // 注册失败提示
				}
	    		regTags(this.account);
    		}

            if (device.platform != "Android") {
                window.plugins.jPushPlugin.setDebugModeFromIos();
                window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
            } else {
                window.plugins.jPushPlugin.setDebugMode(true);
                window.plugins.jPushPlugin.setStatisticsOpen(true);
            }
        	
            window.plugins.jPushPlugin.getRegistrationID(onID.bind(this));
    	}

    	function process (event, type){
    		var msg = '', action = '', param;
			if (device.platform == "Android") {
                msg = window.plugins.jPushPlugin[type].alert;
                action = window.plugins.jPushPlugin[type].action;
                param = window.plugins.jPushPlugin[type].param;
            } else {
                msg = event.aps.alert;
				action = event.action;
                param = event.param;
            }
            return {
    			action: action,
    			alert: msg,
                param: param
            }
    	}

        this.resetBagde = function() {
            if (!window.plugins || !window.plugins.jPushPlugin) {
                return false;
            }
            try {
                window.plugins.jPushPlugin.prototype.reSetBadge();
                window.plugins.jPushPlugin.clearAllNotification();
            } catch(e) {
                console.log(e);
            }
        }

        this.resetBagde();
        
    	this.onOpen = function(event){
            this.resetBagde();

    		var data = process(event, 'openNotification');
    		$rootScope.$broadcast('$app:openPush', data);
    	}

    	this.onReceive = function(event){
    		var data = process(event, 'receiveNotification');
    		$rootScope.$broadcast('$app:receivePush', data);
    	}
    }]);
})(); 

