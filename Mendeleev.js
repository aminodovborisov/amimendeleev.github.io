/* 
   TODO:
   Нет смысла в куче переменных типа oneElName, oneElSign и так далее. Достаточно создать 
   переменную oneEl, представляющую собой ассоциированный список, дать ей setOfEls[oneElKey] 
   и таскать оттуда атрибуты.
   И эту самую переменную можно будет спокойно подать на вход 
   функции-обработчика события onClick.
*/   

var setOfEls = JSON.parse(Mendelements);

var elemCardSubgrOneFV = function(elSign, elName, elNumber, elWeight) {
	return `
	<table class="oneElement">
		<tr>
			<td class="elSignSgOne" rowspan="2">` + elSign + `</td>
			<td class="elNumberSGOne">` + elNumber + `</td>
		</tr>
		<tr>
			<td class="elWeightSGOne">` + elWeight + `</td>
		</tr>
		<tr>
			<td class="elNameSGOne" colspan="2">` + elName + `</td>
		</tr>
	</table>`
}

var elemCardSubgrTwoFV = function(elSign, elName, elNumber, elWeight) {
	var className, numEl;
	numEl = parseInt(elNumber);
	if ((numEl >= 58 && numEl <= 71) || (numEl >= 90 && numEl <= 103)) {
		className = "OneElemLaAc"
	} else {
		className = "oneElement";
	}
	return `
	<table class="` + className + `">
		<tr>
			<td class="elNumberSGTwo">` + elNumber + `</td>
			<td class="elSignSGTwo" rowspan="2">` + elSign + `</td>
		</tr>
		<tr>
			<td class="elWeightSGTwo">` + elWeight + `</td>
		</tr>
		<tr>
			<td class="elNameSGTwo" colspan="2">` + elName + `</td>
		</tr>
	</table>`
}

var elemCardBV = function(elNumber, elSign, elSubgr) {
	var className;
	className = (elSubgr === 'one') 
		? 'SGOne' 
		: 'SGTwo';
	return 	`
	<table class="BrfCard">
		<tr>
			<td class="elNumber` + className + `">` + elNumber + `</td>
		</tr>
		<tr>
			<td class="elSign` + className + `" rowspan="2">` + elSign + `</td>
		</tr>
	</table>
	`
}

function clickOnElement(el, stopWord)
{
	var elId;
	try 
	{
		while (el.getAttribute('class') !== stopWord && el !== document) {
			el = el.parentNode;
		}
		elId = el.getAttribute('id');
		alert('Вы нажали ' + setOfEls[elId]['name']);
		
	}
	catch
	{
		// Если что-то не получилось, то просто ничего не делаем.
	}
}

function tableWork() 
{	
	alert("Фуф! Кто здесь?!!");
	var classNamen = '';
	var snapEl;
	var cardHeight, cardWidth;
	var me = this;
	var oneElem = {};
	
	// Прописываем оформление
	for (var oneElKey in setOfEls) {
		snapEl = document.getElementById(oneElKey);
		
		
		cardHeight = snapEl.clientHeight;
		cardWidth = snapEl.clientWidth;
		
		oneElem = setOfEls[oneElKey];
		
		if (oneElem['subgroup'] === 'one') {
			snapEl.innerHTML = elemCardSubgrOneFV(oneElem['sign'], 
												  oneElem['name'], 
												  oneElem['number'], 
												  oneElem['weight']);
		} else {
			snapEl.innerHTML = elemCardSubgrTwoFV(oneElem['sign'], 
												  oneElem['name'], 
												  oneElem['number'], 
												  oneElem['weight']);
		}
	
		
		// Новая идея: проверяем отношение ширины карточки элемента к её высоте.
		// Если это значение станет меньше какого-то критического (выберем), то
		// предоставляем карточку в краткой форме, иначе можно спокойно в полной.

		
		
		oneElColor = oneElem['color'];
		
		switch (oneElColor) {
			case 'yellow': snapEl.style.backgroundColor = '#ffeeaa'; break;
			case 'pink': snapEl.style.backgroundColor = '#ffaaaa'; break;
			case 'green': snapEl.style.backgroundColor = '#aaffb8'; break;
			case 'blue': snapEl.style.backgroundColor = '#abaaff'; break;
		}
				
	}
	

	// Навешиваем листенеры
	var mainTable = document.getElementById("mainTable");
	var tableLants = document.getElementById("lants");
	var tableActis = document.getElementById("actis");
	mainTable.onclick = function(event) {
		var el = event.target;
		clickOnElement(el, 'mainEl');
	}
	
	tableLants.onclick = function(event) {
		var el = event.target;
		clickOnElement(el, 'elLaAc');
	}
	
	tableActis.onclick = function(event) {
		var el = event.target;
		clickOnElement(el, 'elLaAc');
	}
}