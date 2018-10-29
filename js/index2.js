const UICtrl = (function(){
	const UIselectors = {
		plusBtn : ".plusBtn",
		minusBtn : ".minusBtn",
		sessionCnt : "#session",
		breakCnt : "#break",
		reset : "#reset",
		start : "#start",
		stop : "#stop",
		resume :"#resume",
		counter : ".counter",
		clock : ".container",
		breakSpace : "#breakSpace",
		sessionSpace : "#sessionSpace",
		imageSpace : "#imageSpace",
		takeBreak : "#takeBreak",
	}

	return{
	getUIselectors: function(){
			return UIselectors;
	},
	initState: function (){
		document.querySelector(UIselectors.reset).style.display = "none";
		document.querySelector(UIselectors.stop).style.display = "none";
		document.querySelector(UIselectors.resume).style.display = "none";
		document.querySelector(UIselectors.takeBreak).style.display = "none";
		document.querySelector(UIselectors.start).style.display = "inline-block";
		document.querySelector(UIselectors.breakSpace).style.display = "inline-block";
		document.querySelector(UIselectors.imageSpace).style.display = "inline-block";
		document.querySelector(UIselectors.sessionSpace).style.display = "inline-block";
		document.querySelectorAll(".clockBtn").forEach(function(btn){
			btn.style.display = "inline-block";
		});
	
	},
	sessionState: function(){
		document.querySelector(UIselectors.reset).style.display = "inline-block";
		document.querySelector(UIselectors.stop).style.display = "inline-block";
		document.querySelector(UIselectors.start).style.display = "none";
		document.querySelector(UIselectors.breakSpace).style.display = "none";
		document.querySelector(UIselectors.imageSpace).style.display = "none";
		document.querySelectorAll(".clockBtn").forEach(function(btn){
			btn.style.display = "none";
		});
	},
	startBreak: function(){
		document.querySelector(UIselectors.breakSpace).style.display = "inline-block";
		document.querySelector(UIselectors.takeBreak).style.display = "inline-block";
		document.querySelector(UIselectors.sessionSpace).style.display = "none";
		document.querySelector(UIselectors.stop).style.display = "none";
	},
	breakState: function (){
		document.querySelector(UIselectors.stop).style.display = "inline-block";
		document.querySelector(UIselectors.takeBreak).style.display = "none";
	}
}
})()


const clockCtrl = (function(){
	return {
		resume: function(input){
    		let parts = input.split(':'),
        	minutes = parseInt(parts[0])*60,
        	seconds = parseInt(parts[1]);
        	return (minutes + seconds);
		}
	}
})();


const appCtrl = (function(UICtrl , clockCtrl){
	const selectors = UICtrl.getUIselectors();
	const audio = document.getElementById("buzzer");
	var i = 0;
	var j = 0;
	const loadEvents = function(){
		document.querySelector(selectors.clock).addEventListener("click", plusMinus);
		document.querySelector(selectors.start).addEventListener("click", start);
	    document.querySelector(selectors.takeBreak).addEventListener("click", breakCount);
		document.querySelector(selectors.reset).addEventListener("click" , reset);
		document.querySelector(selectors.stop).addEventListener("click" , pause);
		document.querySelector(selectors.resume).addEventListener("click" , resume);
	}

	const plusMinus = function(e){
		if(e.target.classList.contains('plusBtn')){
			const newCounter =  parseInt(e.target.previousSibling.previousSibling.textContent) + 5;
			e.target.previousSibling.previousSibling.textContent = newCounter;
		}else if(e.target.classList.contains('minusBtn') && parseInt(e.target.nextSibling.nextSibling.textContent) > 5 ){
			const newCounter =  parseInt(e.target.nextSibling.nextSibling.textContent) - 5;
			e.target.nextSibling.nextSibling.textContent = newCounter;
		}
	}

	const start = function(e){
		UICtrl.sessionState();
		j ++;
		const count = parseInt(document.querySelector(selectors.sessionCnt).textContent) *60;
		let counting = setInterval(timer, 10 , document.querySelector(selectors.sessionCnt) , count);
		}

	const breakCount = function (){
		UICtrl.breakState();
		j ++;
		const count = parseInt(document.querySelector(selectors.breakCnt).textContent)*60;
		let counting = setInterval(timer, 10 , document.querySelector(selectors.breakCnt) , count);
	}

	const timer = function(item , count){
		i ++;
		count -= i ;
		if(count%60>=10){
   			item.innerHTML = Math.floor(count/60) +":"+ count%60;
		}else{
   			item.innerHTML = Math.floor(count/60)+":"+"0"+count%60;
		}
		if(count === 0){
			if(document.querySelector(selectors.breakSpace).style.display === "none"){
				UICtrl.startBreak();
			}else{
				reset();
			}
			audio.play();
			clearInterval(j);
			i = 0;
		}
	}

	const reset = function(){
		UICtrl.initState();
		document.querySelector(selectors.breakCnt).textContent = 5;
		document.querySelector(selectors.sessionCnt).textContent = 5;
		clearInterval(j);
		i = 0;
	}

	const pause = function(){
		document.querySelector(selectors.resume).style.display = "inline-block";
		document.querySelector(selectors.stop).style.display = "none";
		clearInterval(j);
		i = 0;	
	}

	const resume = function(){
		document.querySelector(selectors.resume).style.display = "none";
		document.querySelector(selectors.stop).style.display = "inline-block";
		j ++;
		if(document.querySelector(selectors.breakSpace).style.display === "none"){
			const count = document.querySelector(selectors.sessionCnt).textContent;
			const newCount = clockCtrl.resume(count);
			let counting = setInterval(timer, 10 , document.querySelector(selectors.sessionCnt) , newCount);
		}else{
			const count = document.querySelector(selectors.breakCnt).textContent;
			const newCount = clockCtrl.resume(count);
			let counting = setInterval(timer, 10 , document.querySelector(selectors.breakCnt) , newCount);
		}
	}

	return{
		init: function(){
			UICtrl.initState();
			loadEvents();

		}
	}
})(UICtrl , clockCtrl)

appCtrl.init();