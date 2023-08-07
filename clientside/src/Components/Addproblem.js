import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function Addproblem() {

  const [name, setName] = useState("");
  const [ans, setAns] = useState("");
  const [statement, setStatement] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [hint, setHint] = useState("");
  const [topic, setTopic] = useState("");
  let solvers = [];
  let comments = [];

  const navigate = useNavigate();



  const addproblem = async () => {
    console.log(type, ans, hint, statement, option1, level);

    if (!name || !type || !ans || !hint || !level || !statement || !option1 || !option2 || !option3 || !option4 || !topic) {
      alert("fill all fields");
      return;
    }
    if (option1 === option2 || option3 === option4 || option1 === option3 || option1 === option4 || option2 === option3) {
      alert("Please check Details !");
      return;
    }
    let result = await fetch("http://localhost:5800/", {
      method: 'post',
      body: JSON.stringify({ comments, topic, solvers, name, type, level, ans, statement, hint, option1, option2, option3, option4 }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.warn(result);

    navigate('/');


  }

  return (




    // something new 

    <div className="container-contact100">

      <div className="wrap-contact100" >

        {/* <form className="contact100-form validateform"> */}
        <div className="contact100-form validateform">

          <span className="contact100-form-title">Add More Problem</span>

          <div className="wrap-input100 validate-input bg1 alert-validate" >
            <span className="label-input100">Problem NAME *</span>
            <input className="input100" type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" placeholder="Problem Name" />
          </div>

          <div style={{ padding: "0px" }} className="wrap-input100 validate-input bg1 alert-validate" >
            <span className="label-input100">option 1 *</span>
            <input value={option1} onChange={(e) => setOption1(e.target.value)} className="input100" type="text" name="name" placeholder="Option 1" />
          </div>

          <div style={{ padding: "0px" }} className="wrap-input100 validate-input bg1 alert-validate" >
            <span className="label-input100">option 2 *</span>
            <input value={option2} onChange={(e) => setOption2(e.target.value)} className="input100" type="text" name="name" placeholder="Option 2" />
          </div>

          <div style={{ padding: "0px" }} className="wrap-input100 validate-input bg1 alert-validate" >
            <span className="label-input100">Option 3 *</span>
            <input value={option3} onChange={(e) => setOption3(e.target.value)} className="input100" type="text" name="name" placeholder="Option 3" />
          </div>

          <div style={{ padding: "0px" }} className="wrap-input100 validate-input bg1 alert-validate" >
            <span className="label-input100">Option 4 *</span>
            <input value={option4} onChange={(e) => setOption4(e.target.value)} className="input100" type="text" name="name" placeholder="Option 4 " />
          </div>

          <div style={{ padding: "0px" }} className="wrap-input100 validate-input bg1 alert-validate" >
            <span className="label-input100">Answer  *</span>
            <input value={ans} onChange={(e) => setAns(e.target.value)} className="input100" type="text" name="name" placeholder="Mention correct answer... " />
          </div>

          <div className="wrap-input100 input100-select bg1">
            <span className="label-input100">Fill all details*</span>

            <div className="selecttype-level">
              {/* to select type of problem */}
              <select onChange={(e) => setType(e.target.value)} className="new select" name="service" aria-hidden="true">
                <option>Please Select</option>
                <option value="puzzels">Puzzels</option>
                <option value="jee">Jee</option>
                <option value="computer">Computer</option>
              </select>

              {/* to select topic specific .. */}
              <select onChange={(e) => setTopic(e.target.value)} className="new select" name="service" aria-hidden="true">
                <option>Please Select</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="math">Mathematics</option>
                <option value="gk">General knowledge</option>
                <option value="boc">Basics of computer</option>
                <option value="co">Computer architeture</option>
                <option value="networking">Networking</option>
                <option value="api">Rest API</option>
                <option value="lt">Logical thinking</option>
                <option value="matrix">Matrix</option>
                <option value="n-puzzel">N-puzzels</option>
                <option value="gaming">Gameing problem</option>
              </select>

              <select onChange={(e) => setLevel(e.target.value)} className="js-select2 select2-hidden-accessible" name="service" aria-hidden="true">
                <option >Please Select</option>
                <option value="Easy ">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

            </div>
          </div>


          <div className="wrap-input100 validate-input bg0 rs1-alert-validate alert-validate" >
            <span className="label-input100">statement</span>
            <textarea type="text" value={statement} onChange={(e) => setStatement(e.target.value)} className="input100" name="message" placeholder="Problem Statement here..."></textarea>
            <span className="btn-hide-validate"></span></div>

          <div className="wrap-input100 validate-input bg0 rs1-alert-validate alert-validate" >
            <span className="label-input100">hint</span>
            <textarea type="text" value={hint} onChange={(e) => setHint(e.target.value)} className="input100" name="message" placeholder="Some hint..."></textarea>
            <span className="btn-hide-validate"></span></div>

          {/* </form> */}
        </div>

        <div className="container-contact100-form-btn">
          <button onClick={addproblem} className="contact100-form-btn">
            <span>
              Submit
              <i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
            </span>
          </button>
        </div>

      </div>
    </div>

  );
}

export default Addproblem;