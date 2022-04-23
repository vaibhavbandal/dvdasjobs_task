import { Container, Typography, Grid } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"

export default function App() {

    const [formData, setFormData] = useState({ amount: 0, tenure: 0, rate: 0 });
    const [ans,setAns]=useState({"emi": 0,
    "interest": 0,
    "totalamt": 0})

    const handleChange = (e) => {
        setFormData((preData) => {
            return { ...preData, [e.target.name]: e.target.value }
        })
    }


    const handleSubmit = async () => {
        let form = new FormData();
        form.append("amount", formData.amount)
        form.append("tenure", formData.tenure)
        form.append("rate", formData.rate)
        try {
            const response=await axios({
                method: "post",
                url: "https://homexp.in/service/emicalculator",
                data: form,
                headers: { "Content-Type": "multipart/form-data" },
            })
            
            if(response.data.st==='success'){
                setAns({emi:response.data.emi,interest:response.data.interest,totalamt:response.data.totalamt})
            }else{
                alert("ERROR")
            }
        } catch (error) {
                alert("ERROR")
        }
    }



    return <>
        <Container>
            <div style={{ boxShadow: '0 1px 4px 0px rgb(0 0 0 / 12%)' }} >

                <div className="main-heading p-3">
                    <span>Emi Calculator</span>
                    <h2 class="headline">Emi Calculator</h2>
                    <p class="sub-text">Calculate Your Emi per Month Quickly</p>
                    <p className="border border-1" ></p>
                </div>

                <Container>
                    <div className="container p-5" >
                        <div className="row" >

                            <div className="col-6">
                                <div>
                                    <label>Loan Amount:</label>
                                    <input onChange={handleChange} name='amount' value={formData.amount} type={'text'} className='input' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="text-center">
                                    <label>Your EMI Per Month Will be</label>
                                    <p id="emi">₹ {ans.emi} </p>
                                </div>
                            </div>


                        </div>

                        <div className="row">

                            <div className="col-3">
                                <div>
                                    <label>Tenure:</label>
                                    <input onChange={handleChange} name='tenure' value={formData.tenure} type={'text'} className='input' />
                                </div>
                            </div>
                            <div className="col-3">
                                <div>
                                    <label>Interest Rate:</label>
                                    <input onChange={handleChange} name='rate' value={formData.rate} type={'text'} className='input' />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="text-center">
                                    <label>Your EMI Per Month Will be</label>
                                    <p id="emi">₹ {ans.interest}</p>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="text-center">
                                    <label>Your EMI Per Month Will be</label>
                                    <p id="emi">₹ {ans.totalamt} </p>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
                                <div className="text-center">
                                    <button onClick={handleSubmit} >Calculate</button>
                                </div>
                            </div>
                            <div className="col-7 d-flex justify-content-end">
                                <div className="text-center">
                                    <button>Apply For Loan</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
            </div>
        </Container>
    </>
}