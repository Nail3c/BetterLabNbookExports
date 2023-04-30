

function getData(){
    var labdocs = document.getElementsByClassName('ld_name_actions')
    var data_labdocs = []
    for (let i =0; i<labdocs.length; i++){
        if(labdocs[i].getAttribute('ld_type')=='dataset'){
        data_labdocs.push(labdocs[i])
        }
    }
    return data_labdocs
}

function getTab(labdoc_head){
    let id = labdoc_head.id.split('_')[3]
    return document.getElementById(`fx_table_${id}`)
}

function generateCSV(tab){
    let csv = ""
    let titles = tab.firstChild.children[0].children
    for (let i=1; i<titles.length; i++){
        csv = csv + titles[i].title + ","
    }
    csv = csv.slice(0, -1) + "\n"
    let table_data = tab.lastChild.children
    console.log(table_data)
    for (let i = 9; i<table_data.length-1 ; i++){
        let line = table_data[i].children
        //console.log(line)
        for (let j = 1; j<line.length; j++){
            csv = csv + line[j].firstChild.textContent + ","
            console.log("Blabla : " + line[j].firstChild.textContent)
        }
        csv = csv.slice(0, -1) + "\n"
    }

    return csv

}

function addButton (root){
    var button = document.createElement('img')
    //button.textContent = 'Export'
    button.src=chrome.runtime.getURL('bouton.png')
    button.id='BLE_button'
    button.onclick = function (){
        download(generateCSV(getTab(root)))
    }
    
    root.lastChild.lastChild.appendChild(button)
}


const download = function (data) {

	// Creating a Blob for having a csv file format
	// and passing the data with type
	const blob = new Blob([data], { type: 'text/csv' });

	// Creating an object for downloading url
	const url = window.URL.createObjectURL(blob)

	// Creating an anchor(a) tag of HTML
	const a = document.createElement('a')

	// Passing the blob downloading url
	a.setAttribute('href', url)

	// Setting the anchor tag attribute for downloading
	// and passing the download file name

    let currentDate = new Date();
    let year = currentDate.getFullYear()
    let month = currentDate.getMonth()
    let day = currentDate.getDay()
    let hours = currentDate.getHours()
    let minutes = currentDate.getMinutes()

	a.setAttribute('download', `BLExport-${day}_${month}_${year}-${hours}h${minutes}.csv`);

	// Performing a download with click
	a.click()
}


var data = getData()

data.forEach((el)=>{
    addButton(el)
})

