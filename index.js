 //chrome://extensions/
 var myLinks = []
 var oldLinks = []
 const inputEl = document.querySelector("#input-el")
 const inputBtn = document.querySelector("#input-btn")
 const ulEL = document.querySelector("#ul-el")
 const deleteBtn = document.querySelector("#delete-btn")
 const copyURLBtn = document.querySelector("#urlclipborard-btn")
 const tabBtn = document.querySelector("#tab-btn")

 // using the local storage API
 // uses key values
 // Needs to store them in strings
 // use JSON.parse and JSON.strinify
 var linksFromLocalStorage = JSON.parse( localStorage.getItem("myLinks"))

 // This if statement will check if we have any links are stored in local storage
 // If they are output them
 if(linksFromLocalStorage){
    myLinks = linksFromLocalStorage
    output(myLinks)
}

function output(links){
    var listItems = ""
    for(var i = 0; i < links.length; i++){
        // use html with within js
        // juse "" to express js
        // listItems += "<li><a href = '" + myLinks[i] + "' target  ='_blank'>" + myLinks[i] + "</a></li>"
        // We can use templete strings to make it look so  much nicer
        listItems += `
        <li>
            <a href = '${links[i]}' target  ='_blank'>
                ${links[i]}
            </a>
        </li>
        `
    }
    // dom minpulation has a cost therefore its better to do it outside of the for loop
    // make it be called one's rather then the myLinks.length 
    ulEL.innerHTML = listItems
}

tabBtn.addEventListener("click", function(){
    // using chrometabs API to request the current active window/tab
    // once this API is fullfilled the function will run with the given tabs variable
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        output(myLinks)
    })
})

// another way to use the click method and a function 
inputBtn.addEventListener("click", function() {
    myLinks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    output(myLinks)
})   

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLinks = []
    output(myLinks)
})





