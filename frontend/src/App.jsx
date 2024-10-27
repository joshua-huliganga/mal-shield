import React, { useState } from "react";
import Footer from "./Footer.jsx"

export default function App() {

    const [params, setParams] = React.useState({
        url: "",
        email: "",
        tab: "url"
    });
    const [fade, setFade] = React.useState("fade-in");
    const [submitURL, setSubmitURL] = React.useState(false);
    const [submitEMAIL, setSubmitEMAIL] = React.useState(false);

    function handleChange(event) {
        const { value, name } = event.target;

        if (name === "tab") {
            // Trigger fade-out before changing the tab
            setFade("fade-out");

            // Delay the tab change until the fade-out completes
            setTimeout(() => {
                setParams(prevParams => ({
                    ...prevParams,
                    [name]: value
                }));
                // Fade back in
                setFade("fade-in");
            }, 200); // This should match the duration in the CSS transition
        } else {
            setParams(prevParams => ({
                ...prevParams,
                [name]: value
            }));
        }
    }

    async function handlePost(type) {
        try {
            const str = type === 0 ? "URL" : "EMAIL"
            const response = await fetch(`http://127.0.0.1:5000/predict${str}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: (type === 0 ? 
                    JSON.stringify({url:type === 0 ? params.url : params.email}) :
                    JSON.stringify({email_text:type === 0 ? params.url : params.email})  
                )
            })
            if (!response.ok)
                throw new Error(response.value)
            const data = await response.json();
            console.log(data);

        } catch(e) {
            console.log(e);
        }
    }

    React.useEffect(() => {
        if (submitURL) {
            handlePost(0)
            setSubmitURL(false)
        }
    }, [submitURL])
    React.useEffect(() => {
        if (submitEMAIL) {
            handlePost(1)
            setSubmitEMAIL(false)
        }
    }, [submitEMAIL])

    return (
        <div>
            <main>
                <div class="radio-inputs">
                    <label class="radio">
                        <input type="radio" name="tab" checked={params.tab === "url"} value = "url" onChange={handleChange}/>
                        <span class="name">URL</span>
                    </label>
                    <label class="radio">
                        <input type="radio" name="tab" checked={params.tab === "email"} value = "email" onChange={handleChange}/>
                        <span class="name">Email</span>
                    </label>
                </div>
                {params.tab === "url" ?
                <div className={`url-container ${fade}`}>
                    <div className="url-cont2">
                        <h3 className="description-text">Enter the URL you would like to check:</h3>
                        <input
                            type="text"
                            className="url-input"
                            name="url"
                            value={params.url}
                            onChange={handleChange}
                            placeholder="https://google.com"
                        />
                        <button className="submit-btn" onClick={() => {setSubmitURL(true)}}>Check link</button>
                    </div>
                </div>
                :
                <div className={`url-container ${fade}`}>
                    <div className="url-cont2">
                        <h3 className="description-text">Enter the email contents you would like to check:</h3>
                        <textarea
                            className="email-input"
                            name="email"
                            value={params.email}
                            onChange={handleChange}
                        />
                        <button className="submit-btn" onClick={() => {setSubmitEMAIL(true)}}>Check link</button>
                    </div>
                </div>
                }
            </main>
            <Footer />
        </div>
    )

}