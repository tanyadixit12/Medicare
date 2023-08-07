import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faInstagram,
  faSkyatlas,
  faGgCircle
} from "@fortawesome/free-brands-svg-icons";
import { MDBCollapse, MDBBtn } from 'mdb-react-ui-kit';




const Question = () => {
  const [question, setQuestion] = useState([]);
  const params = useParams();
  const [starlist, setList] = useState([]);

  const usr = localStorage.getItem('user');
  useEffect(() => {

    getQuestions();

  }, []);


    //    Api call to get content of the problem......
    
    const makestar = async (id) => {
      let result = await fetch(`http://localhost:5800/problem/${id}`, {
        headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
    });
      result = await result.json();
      setList(result.starlist);
      console.log(result.starlist);
        
          var flag = 0;
            for (let i = 0; i < starlist.length; i++) {
                if (starlist[i] == JSON.parse(usr).name) {
                    flag = 1;
                    console.log(flag);
                }
            }
            if (flag === 0) {

                starlist.push(JSON.parse(usr).name);
                console.log("adsd");
                saveStatus(id);

            }
            showToastMessage(); 
           
  };
  
  const saveStatus = async (id) => {
    let result = await fetch(`http://localhost:5800/problem/${id}`, {
        method: "Put",
        body: JSON.stringify({
            starlist
        }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    result = await result.json();
    console.warn(result);

}

  // passing Json web token wtih headers to verify authentication of user.........
  const getQuestions = async () => {
    let result = await fetch(`http://localhost:5800/${params.type}`, {
      headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
    });
    result = await result.json();
    setQuestion(result);
    // console.log(params);
    console.log(result);

  };

  // function to show problem status .....
  const details = localStorage.getItem('user');
  const NAME = JSON.parse(details).name;

  const check = (arr, str) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === str) {
        return "Solved";
      }
    }
    return "Not Solved";
  }
      // dispaly toast message ****************
      const showToastMessage = () => {
        toast.success('Successfully added !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
      
      // **************************************** 
  return (

    <div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th width="5%">#</th>
            <th>Name</th>
            <th width="6%">Level</th>
            <th width="8%">status</th>
            <th width="5%">Star</th>
            <th width="5%"><FontAwesomeIcon icon={faSkyatlas} size="2x" /></th>
          </tr>
        </thead>
      </Table>


      {
        question.length > 0 ? question.map((item, index) =>

          <Table striped bordered hover>

            <tbody>
              <tr key={index} >
                <td  width="5%">{index + 1}</td>
                <td  ><Link to={"/problem/" + item._id}>{item.name}</Link></td>
                <td  width="6%">{item.level}</td>
                <td  width="8%">{check(item.solvers, NAME)}</td>
                <td width="5%">
                <button id="starButton" className="star-button" onClick={()=>{makestar(item._id)}}>
                <ToastContainer />
                <span id="starIcon" className="star-icon" >&#9733;</span>
                </button>
                </td>
                <td width="5%">Name</td>


              </tr>
            </tbody>


          </Table>
        )
          :
          <h1>no problems found</h1>
      }

    </div>


  )
}

export default Question;
