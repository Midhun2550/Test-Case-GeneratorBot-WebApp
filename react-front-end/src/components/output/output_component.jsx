import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import './output.css';



function OutputComponent({ code, language, total, positive, negative, associationText, scenario}) {

    async function codeConfirm(tempCode) {
        var confirmPrompt = `consider you as a code verifier. if the provided is a code of any programming language then just give "true" otherwise give "false". provided is "${tempCode}", give only single word answer either true or false`
        try {
            setResult("LOADING ...")
            const confirmDataFromServer = await fetch("http://127.0.0.1:5000/data", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(confirmPrompt)
            });
 
            if (!confirmDataFromServer.ok) {
                throw new Error("UNABLE TO LOAD SEREVR");
            }
    
            const responseJSON = await confirmDataFromServer.json();
            var confirmValue = responseJSON.data_from_model;
    
            return confirmValue;
    
        } catch (error) {
            setResult("UNABLE TO LOAD SEREVR")
            return 'error';
        }
    
    } 
        
    const [result, setResult] = useState(``);
    
    
    const handleClick = async () => {
        var confirmVal = await codeConfirm(code);
        
        var prompt = `consider you as a test case generator. generate ${total} unit test cases automation code of ${positive} positive and ${negative} negative test cases in ${language} for the code ${code}`
        if(scenario){
            prompt = prompt + ` for the scenario ${scenario} and generate ${positive} positive and ${negative} negative test cases for this scenario`
        }
        if(associationText){
            prompt =  `with ${associationText} ${prompt}`
        }
        if(confirmVal=="falseNone"){
            setResult("IRRELEVANT INPUT DATA")
        }
        if(!code || !total || !positive || !negative){
            setResult("NO INPUT DATA")
        }
        if(code && language && total && positive && negative && (positive+negative <= total) && confirmVal=="trueNone"){
            try {
                const codeDataFromServer = await fetch("http://127.0.0.1:5000/data", {
                    method: "POST",
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify(prompt)
                });
        
                const responseData = await codeDataFromServer.json()
                setResult(responseData.data_from_model)
            } catch (error) {
                setResult("UNABLE TO LOAD SERVER")
            }
        }
       
    }
    
    const [copy, setCopy] = useState("copy")
    const handleCopy = () => {
        navigator.clipboard.writeText(result).then(() => {
            setCopy("copied")
            setTimeout(() => {
                setCopy("copy")
            }, 2000)
        })
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };


    return (
        <>
            <button className="output-button" onClick={handleClick}>
                <FontAwesomeIcon icon={faArrowCircleRight} size="6x" style={{color: "green"}}/>
            </button>
            <div className="output-section">
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <button className="copy-button" onClick={handleCopy}>{copy}</button>
                    <button className="view-button" onClick={toggleModal}>view code</button>
                    {isModalOpen && (
                        <div className="modal-overlay" onClick={toggleModal}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <button className="close-button" onClick={toggleModal}>X</button>
                                <h2>CODE</h2>
                                <textarea className="modal-textarea" value={result} readOnly></textarea>
                            </div>
                        </div>
                    )}
                </div>
                <textarea className="output-textarea" value={result} readOnly></textarea>
            </div>
        </>
    );
}

export default OutputComponent;
