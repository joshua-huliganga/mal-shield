
const url=document.getElementById("url-el")
const btn=document.getElementById("url-btn")
const output=document.getElementById("output-el")


async function checkUrl(urlValue) { 
    console.log("alive?")
    try {
        const response = await fetch('http://127.0.0.1:5000/predictURL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlValue })
        });

        const result = await response.json();

        // Process the result (assuming it has an 'is_phishing' property)
        if (result["prediction"]!="malicious") {
            output.innerHTML="Your link is good to go!"
        } else {
            output.innerHTML="Your link is a phishing link!"
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


btn.addEventListener("click",function(){
    console.log("going into function")
    checkUrl(url.value)
})

url.addEventListener("keydown", function(event){
    if(event.key=="Enter"){
        btn.click();
    }
})