const dailySelector = document.getElementById('daily-unit');
const weeklySelector = document.getElementById('weekly-unit');
const monthlySelector = document.getElementById('monthly-unit');

const  getData = async () => {
    try {
        const res = await fetch('dashboard_data.json')
        const result = await res.json()
        console.log(result)
        return result
    } catch(err) {
        console.error("Error: ", err);
    }
    
}

const processData = (data) => {
    const dataCpy = [...data]
    for(let i = 0; i < dataCpy.length; i++) {
        dataCpy[i].title = dataCpy[i].title.toLowerCase()
        if(dataCpy[i].title.split(" ").length > 1) {
            dataCpy[i].title = dataCpy[i].title.replace(" ", "-")
        }
    }

    return dataCpy
}

const weeklyDataSetter = (processedData) => {
    const nodeTimeUnits = document.querySelectorAll("#time-unit")
    for(let i = 0; i < nodeTimeUnits.length; i++) {
        nodeTimeUnits[i].innerHTML = 'Week'
    }
    for(let i = 0; i < processedData.length; i++ ) {
        const nodeCurrent = document.getElementById(processedData[i].title + '-current')
        const nodePrevious = document.getElementById(processedData[i].title + '-previous')
        nodeCurrent.innerHTML = processedData[i].timeframes.weekly.current
        nodePrevious.innerHTML = processedData[i].timeframes.weekly.previous
    }
}

const dailyDataSetter = (processedData) => {
    const nodeTimeUnits = document.querySelectorAll("#time-unit")
    for(let i = 0; i < nodeTimeUnits.length; i++) {
        nodeTimeUnits[i].innerHTML = 'Day'
    }
    for(let i = 0; i < processedData.length; i++ ) {
        const nodeCurrent = document.getElementById(processedData[i].title + '-current')
        const nodePrevious = document.getElementById(processedData[i].title + '-previous')
        nodeCurrent.innerHTML = processedData[i].timeframes.daily.current
        nodePrevious.innerHTML = processedData[i].timeframes.daily.previous
    }
}

const monthlyDataSetter = (processedData) => {
    const nodeTimeUnits = document.querySelectorAll("#time-unit")
    for(let i = 0; i < nodeTimeUnits.length; i++) {
        nodeTimeUnits[i].innerHTML = 'Month'
    }
    for(let i = 0; i < processedData.length; i++ ) {
        const nodeCurrent = document.getElementById(processedData[i].title + '-current')
        const nodePrevious = document.getElementById(processedData[i].title + '-previous')
        nodeCurrent.innerHTML = processedData[i].timeframes.monthly.current
        nodePrevious.innerHTML = processedData[i].timeframes.monthly.previous
    }
}

const nodeList = [dailySelector, weeklySelector, monthlySelector];

nodeList.forEach((node) => {
    node.addEventListener('click', async () => {
        const data = await getData()
        const processedData = processData(data)
        const notClickedNodes = Array.from(nodeList).filter((notClickedNode) => {
            return notClickedNode !== nodeList;
        })
        
        notClickedNodes.forEach((notClickedNode) => {
            notClickedNode.classList.remove('active');
        })
    
        node.classList.add('active')
        
        if (node.id === "weekly-unit"){
            weeklyDataSetter(processedData);
        } else if (node.id === "daily-unit" ) {
            dailyDataSetter(processedData);
        } else if (node.id === "monthly-unit") {
            monthlyDataSetter(processedData);
        }
    })
})