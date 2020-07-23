

//fetch takes url of the api
//take time to fetch api then run the function
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
// //convert response to json and parse data then call another callback function
// response.json().then((data) => {
// console.log(data)
// })
// })

//fetch weather for a location

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")

// messageOne.textContent = "From Javascript"
const messageTwo = document.querySelector("#message-2")


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    //find the value typed in the search input
    const location = search.value
    messageOne.textContent = "Loading...."
    messageTwo.textContent = ""
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
           messageOne.textContent = data.error;
           messageTwo.textContent = ""
        }
        else {
           messageOne.textContent = data.location;
           messageTwo.textContent = data.forecast
        }
    })
})

    
})