document.addEventListener('DOMContentLoaded', function() {
	//alert("Hai")

	$("#signoutBtnClick").click(function(){
		$("#logoutPage").hide();
		$("#loginPage").show();
		$("#focusedInputUsr").val("");
		$("#focusedInputPwd").val("");
		deleteChanges();
		
	});
	$("#signinBtnClick").click(function(){
		var usrNme = $("#focusedInputUsr").val();
		var pwdNme = $("#focusedInputPwd").val();
		
		if((usrNme === pwdNme) && (usrNme !== "") && (pwdNme !== "")) {
			var boaUserInfo = {};
			$("#errorMessage,#loginPage").hide();
			boaUserInfo.userName = usrNme;
			boaUserInfo.userID = Math.round(Math.random()*10000000000);
			$("#cstName").html(boaUserInfo.userName);
			//$("#cstID").html(boaUserInfo.userID);
			$("#logoutPage").show();
			saveChanges(JSON.stringify(boaUserInfo))
		} else {
			$("#errorMessage").show();
		}
		
	})
	
	pageLoadCheck();
	
	function pageLoadCheck(){
		$("#errorMessage").hide();
		//console.log("LoadingCheck",getSavedValue());
		
		chrome.storage.sync.get("boaUserInfo", function (obj) {
			console.log("RES",obj);
			console.log("RESTest",obj.boaUserInfo);
			if(obj.boaUserInfo !== undefined) {
				var boaUserInfo = obj.boaUserInfo;
				$("#cstName").html(boaUserInfo.userName);
				$("#cstID").html(boaUserInfo.userID);
				$("#logoutPage").show();
				$("#loginPage").hide();	
			} else {
				$("#logoutPage").hide();			
				$("#loginPage").show();
			}
		})
	}
	//saveChanges()
	function deleteChanges() {
			chrome.storage.sync.remove('boaUserInfo', function() {
			  console.log('BOA Logout');
			});
	}
	function saveChanges(val) {
			debugger
			chrome.storage.sync.set({'boaUserInfo': val}, function() {
			  console.log('BOA Login');
			});
	}

	
}, false);