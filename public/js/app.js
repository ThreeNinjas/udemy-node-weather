const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const dog = 'dog'
messageOne.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => { 
        if (data.error) {
            console.log(data.error)
            messageOne.textContent = ''
            messageTwo.textContent = data.error
        } else {
            console.log(data)
            messageOne.innerHTML = data.location + '<br>' + data.temp + '<br>' + data.summary + '<br>' + data.rain + '<br>' + data.humidity
        }
    })
})
})