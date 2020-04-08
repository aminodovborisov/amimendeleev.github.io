let setOfEls = JSON.parse(mendel_elems);
let elemEns = JSON.parse(elemEn);

function weightFit(inWeight)
{
    let indx = inWeight.indexOf('(');
    subWeight = indx === -1 ? inWeight : inWeight.substr(0, indx);
    let preWeight = (parseFloat(subWeight)).toFixed(3);
    if (preWeight >= 210 && preWeight == Math.floor(preWeight)) {
        return '[' + Math.floor(preWeight) + ']';
    } else {
        return preWeight;
    }
}

function tableFill(myTable) 
{
    let oneElId;
    let oneElemProps;
    let clCells = myTable.getElementsByTagName('td');
    let elNumber, elSign, elName, elWeight;
    for (let oneCell of clCells) {
        if (oneCell.hasAttribute('id')) {
            oneElId = oneCell.getAttribute('id');
            if (oneElId.substr(0, 6) === 'number') {
                oneElProps = setOfEls[oneElId];
                
                // Красим элементы
                switch (oneElProps.valency) {
                    case 's': oneCell.style.backgroundColor = '#ffaaaa'; break;
                    case 'p': oneCell.style.backgroundColor = '#ffeeaa'; break;
                    case 'd': oneCell.style.backgroundColor = '#abaaff'; break;
                    case 'f': oneCell.style.backgroundColor = '#aaffb8'; break;
                }
                
                // Раздаём тексты 
                elNumber = document.getElementById(oneElId + '_num');
                elSign = document.getElementById(oneElId + '_sgn');
                elName = document.getElementById(oneElId + '_nme');
                elWeight = document.getElementById(oneElId + '_wgt');
                elNumber.innerHTML = oneElProps.number;
                elSign.innerHTML = oneElProps.sign;
                elName.innerHTML = oneElProps.name;
                elWeight.innerHTML = weightFit(elemEns[oneElId]['atomicMass']);
                
                // Теперь присвоим классы для автоматического оформления
                // (выключки по левому или правому краю).
                elNumber.className = 'mainNumber_' + oneElProps.subgroup;
                elSign.className = 'mainSign_' + oneElProps.subgroup;
                elName.className = 'mainName_' + oneElProps.subgroup;
                elWeight.className = 'mainWeight_' + oneElProps.subgroup;
            }
        }
    }
}

function classingElement(groupBlock) 
{
    let typ = '', subTyp = '';
    switch (groupBlock) {
        case 'nonmetal':
            typ = 'Неметалл';
            subTyp = '';
            break;
        case 'metal':
            typ = 'Металл';
            subTyp = '';
            break;
        case 'alkali metal':
            typ = 'Металл';
            subTyp = 'Щелочной металл';
            break;
        case 'alkaline earth metal':
            typ = 'Металл';
            subTyp = 'Щёлочноземельный металл';
            break;
        case 'metalloid':
            typ = 'Полуметалл';
            subTyp = '';
            break;
        case 'halogen':
            typ = 'Неметалл';
            subTyp = 'Галоген';
            break;
        case 'transition metal':
            typ = 'Металл';
            subTyp = 'Переходный металл';
            break;
        case 'post-transition metal':
            typ = 'Металл';
            subTyp = 'Постпереходный металл';
            break;
        case 'noble gas':
            typ = 'Неметалл';
            subTyp = 'Благородный газ';
            break;
        case 'transition metal':
            typ = 'Металл';
            subTyp = 'Переходный металл';
            break;
        case 'lanthanoid':
            typ = 'Металл';
            subTyp = 'Лантаноид';
            break;
        case 'actinoid':
            typ = 'Металл';
            subTyp = 'Актиноид';
            break;
        
         
    }
    return [typ, subTyp];
}

function showFormular(elem) 
{
    // console.log(elem.getAttribute('id'));
    let elemId = elem.getAttribute('id');
    // Берём свойства для формуляра
    let oneElem = elemEns[elemId];
    let oneElemRus = setOfEls[elemId]
    let oneProperty, onePropertyCell;
    let typ, subTyp, typEl, subTypEl;
    // console.log(oneElem);
    document
        .getElementById('frmTitle')
        .innerHTML = oneElemRus.number + ' | ' 
                   + oneElemRus.sign + ' | ' + oneElemRus.name;
    let allProps = document.getElementsByClassName('frmPropCont');
    for (let oneProp of allProps) {
        oneProp.innerHTML = '';
    }
    
    typEl = document.getElementById('frm_type');
    subTypEl = document.getElementById('frm_subtype');
        
    for (oneProperty in oneElem) {
        // console.log("* " + oneProperty + ' -- ' + oneElem[oneProperty]);
        onePropertyCell = document.getElementById('frm_' + oneProperty);
     
        switch (oneProperty) {
            case 'atomicMass':
                onePropertyCell.innerHTML = weightFit(oneElem[oneProperty]);
                break;
            case 'groupBlock':
                typ = classingElement(oneElem[oneProperty])[0];
                subTyp = classingElement(oneElem[oneProperty])[1];
                typEl.innerHTML = typ;
                subTypEl.innerHTML = subTyp;
            default:
                try {
                    
                    onePropertyCell.innerHTML = oneElem[oneProperty];
                }
                catch 
                {
                    // А ничего не нужно делать, если ошибка!
                }
         }
        
    }
    document.getElementById('frmBox').style.display = 'block';
    
}

function tableWork() 
{
   
    let frmBox = document.getElementById('frmBox');
    let btnFrmCloser = document.getElementById('btnFrmCloser');
    
    frmBox.addEventListener(
        'click',
        function(event) {
            if (frmBox.style.display !== 'none' && event.target === frmBox) {
                frmBox.style.display = 'none';
            }
        }
    )
    
    btnFrmCloser.addEventListener(
        'click',
        function(event) {
            frmBox.style.display = 'none';
        }
    )
    // А вот теперь - таблицы.
    let tables = ['mainTable', 'lanTab', 'actiTab'];
    let tableToWork;
        
    for (oneTableId of tables) {
        tableToWork = document.getElementById(oneTableId);
        tableFill(tableToWork);  // Заполнение и оформление
        
        tableToWork.addEventListener(  // Навешивание интерактива
            'click', 
            function(event) {
                let td = event.target.closest('td');
                if (!td) return;
                if (td.hasAttribute('id')) {
                    if (td.getAttribute('id').substr(0, 6) === 'number') {
                        showFormular(td);
                    }
                }
            },
            false
        );
       
    }
}


