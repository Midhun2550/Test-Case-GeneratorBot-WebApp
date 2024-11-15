import React from 'react';
import {useState} from 'react';
import OutputComponent from '../output/output_component';
import './input.css'



function InputComponent() {

    const [code, setCode] = useState("");
    const handleCode = (event) => {
        setCode(event.target.value)
    }

    const [language, setLanguage] = useState("")
    const handleLanguage = (event) => {
      setLanguage(event.target.value)
    }

    const [total, setTotal] = useState("")
    const handleTotal = (event) => {
      setTotal(event.target.value)
    }

    const [positive, setPositive] = useState("")
    const handlePositive = (event) => {
      setPositive(event.target.value)
    }

    const [negative, setNegative] = useState("")
    const handleNegative = (event) => {
      setNegative(event.target.value)
    }

    const [scenario, setSenario] = useState("")
    const handleScenario = (event) => {
      setSenario(event.target.value)
    }

    const [associationText, setAssociationText] = useState("")
    const handleAssociationText = (event) => {
      setAssociationText(event.target.value)
    }
    return(
      <>
         <div className="input-section"> 

            <div style={{maxWidth: "100%"}}>
                 <textarea className="code-textarea" onChange={handleCode} placeholder='TYPE CODE HERE' spellCheck="false"></textarea>
                 <div style={{display: "flex", flex: "1", height: "55%"}}>
                    <div style={{display: "flex", flexDirection: "column", height: "80%", maxWidth: "40%"}}>
                        <div style={{margin: "25px", marginTop: "5px", height: "20%", marginRight: "10px"}}>
                            <h4 style={{marginBottom: "5px", paddingTop: "0px", marginTop: "0"}}>Select Language</h4> 
                            <label><input type="radio" value={"Java"} onChange={handleLanguage} checked={language === "Java"}/>Java</label><br/>
                            <label><input type="radio" value={"Python"} onChange={handleLanguage} checked={language === "Python"}/>Python</label><br/>
                            <label><input type="radio" value={"C#"} onChange={handleLanguage} checked={language === "C#"}/>C#</label><br/>
                        </div>
                        <div style={{ margin: "25px", maxHeight: "20%", display: "flex", flexDirection: "column", marginRight: "10px"}}>
                          <div style={{ display: "flex", alignItems: "center"}}>
                            <label>Total Test Cases</label>
                            <input onChange={handleTotal} type="number" style={{ width: "40px", marginLeft: "35px" }} />
                          </div>
                          <br />
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <label>Negative Test Cases</label>
                            <input onChange={handleNegative} type="number" style={{ width: "40px", marginLeft: "10px" }} />
                          </div>
                          <br />
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <label>Positive Test Cases</label>
                            <input onChange={handlePositive} type="number" style={{ width: "40px", marginLeft: "16px" }} />
                          </div>
                        </div>
                    </div>
                    <div>
                      <textarea className="scenario-textarea" placeholder="TYPE SCENARIO (OPTIONAL)" onChange={handleScenario}></textarea>
                    </div>
                 </div>
                 <textarea className="association-textarea" onChange={handleAssociationText} placeholder="TYPE ANY ASSOCIATION PROCESS (OPTIONAL)"></textarea>
            </div>
          
         </div>
         
         <OutputComponent code={code} language={language} total={total} positive={positive} negative={negative} associationText={associationText} scenario={scenario}/>
      </>
    )
}


export default InputComponent;