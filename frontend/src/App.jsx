import React, { useState } from "react";
import Footer from "./Footer.jsx"
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function App() {

    const [params, setParams] = React.useState({
        url: "",
        email: "",
        tab: "url"
    });
    const [fade, setFade] = React.useState("fade-in");
    const [submitURL, setSubmitURL] = React.useState(false);
    const [submitEMAIL, setSubmitEMAIL] = React.useState(false);
    const [model, setModel] = React.useState((new GoogleGenerativeAI('AIzaSyB7mHOBmt0nwdQlvRssIfcShyoUqBwa_Bk')).getGenerativeModel({ model: "gemini-pro" }))
    const [aiResponse, setAiResponse] = useState(<div></div>);
    const [outputURL, setOutputURL] = useState(false);
    const [outputEMAIL, setOutputEMAIL] = useState(false);
    const [loading, setLoading] = useState(false);


    function handleChange(event) {
        const { value, name } = event.target;

        if (name === "tab") {
            // Trigger fade-out before changing the tab
            setFade("fade-out");
            setAiResponse(<div></div>)

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
            aiRun(data.prediction, type === 0 ? data.url : data.email, type)

        } catch(e) {
            console.log(e);
        }
    }

    React.useEffect(() => {
        if (submitURL) {
            setOutputEMAIL(false);
            handlePost(0)
            setOutputURL(true);
            setSubmitURL(false)
        }
    }, [submitURL])
    React.useEffect(() => {
        if (submitEMAIL) {
            setOutputURL(false);
            handlePost(1)
            setOutputEMAIL(true);
            setSubmitEMAIL(false);
        }
    }, [submitEMAIL])

    async function aiRun(prediction, text, type) {
        try {
            const a = type === 0 ? "url" : "email content"
            const prompt = `We trained our own machine learning model using the ${a === "email content" ? "SVM" : "Random Forest"} algorithm to predict whether a given ${a} is malicious or not. Given the ${a}: ${text} , our model predicted the ${a} to be ${prediction}. Create a brief 2 sentence message for the user explaining if this prediction is valid. If so, what makes this ${a} ${prediction}. If not, state why not. Do not say redundant statements. Say something meaningful about the ${a} in relation with it's ${prediction}. Also, do not make unverifiable, declarative, or historical statements. Simply offer suggestions simply on the characters of the ${a} itself. Only exception is when it is obviously not ${prediction}. Do not assume any extra information that isn't provided.`;
            setLoading(true);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const res = response.text();
            setAiResponse(
                <div className="response">
                    <h3>{prediction} {a} detected.</h3>
                    <p>{res}</p>
                </div>
            )
            setLoading(false);
            console.log(res);
        } catch(e) {
            setAiResponse(
                <div className="response">
                    <h3>{prediction} {type === 0 ? "url" : "email content"} detected.</h3>
                    <p>Error accessing Google Gemini.</p>
                </div>
            )
            setLoading(false);
        } finally {
            if (text.replaceAll(" ", "") === "") {
                setAiResponse(
                    <div className="response">
                        <h3>no input provided.</h3>
                    </div>
                )
            }
        }
    }

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
                        {loading ? <div className="response"><h3>Loading...</h3></div> : (outputURL && aiResponse)}
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
                        <button className="submit-btn" onClick={() => {setSubmitEMAIL(true)}}>Check email</button>
                        {loading ? <div className="response"><h3>Loading...</h3></div> : (outputEMAIL && aiResponse)}
                    </div>
                </div>
                }
            </main>
            <Footer />
        </div>
    )

}