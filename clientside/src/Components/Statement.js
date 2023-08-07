import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import { MDBCollapse, MDBBtn } from 'mdb-react-ui-kit';
import Comment from "./Comment";


const Statement = () => {
    const [submitteddata, setData] = React.useState("");
    const [content, setContent] = useState([]);
    const [show, setShow] = useState(false);
    const [solvers, setSolvers] = useState([]);
   
    const [showShow, setShowShow] = useState(false);

    const toggleShow = () => setShowShow(!showShow);

    const params = useParams();
    useEffect(() => {
        getProblemcontent();

    }, []);


    //    Api call to get content of the problem......
    const getProblemcontent = async () => {
        let result = await fetch(`http://localhost:5800/problem/${params.id}`, {
            headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        result = await result.json();
        setContent(result);
        setSolvers(result.solvers);
    };




    const details = localStorage.getItem('user');
    // console.log(JSON.parse(details).name);

    // Api call to update status of user....
    const saveStatus = async () => {
        let result = await fetch(`http://localhost:5800/problem/${params.id}`, {
            method: "Put",
            body: JSON.stringify({
                solvers
            }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);

    }



    const Handlesubmit = () => {

        console.log(submitteddata);

        const collection = document.getElementsByClassName("accepted-ans");
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].value === submitteddata) {
                if (submitteddata === content.ans) {
                    collection[i].parentElement.style.backgroundColor = "#6ebc62";

                }
                else {
                    collection[i].parentElement.style.backgroundColor = "#fa6767";
                }

                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].value !== submitteddata) {
                        collection[i].parentElement.style.backgroundColor = "rgb(243, 242, 241)";
                    }
                }
            }


        }

        //    to check wether the user has already solved the problem or not .......
        if (submitteddata === content.ans) {
            var flag = 0;
            for (let i = 0; i < solvers.length; i++) {
                if (solvers[i] == JSON.parse(details).name) {
                    flag = 1;
                    console.log(flag);
                }
            }
            if (flag === 0) {
                solvers.push(JSON.parse(details).name);
                console.log("adsd");
                saveStatus();

            }
        }
    };


    return (
        <div>

            <div className="questions">
                <h3 style={{ display: "flex" }}>Problem:</h3> <p>{content.statement}-:</p>
            </div>

            <div className="div2">

                <form >
                    <label className="animate"><input className="accepted-ans" type="radio" id="h1" name="fav_language" value={content.option1}
                        onClick={(e) => setData(e.target.value)} />{content.option1}</label><br></br>

                    <label className="animate"><input className="accepted-ans" type="radio" id="h2" name="fav_language" value={content.option2}
                        onClick={(e) => setData(e.target.value)} />{content.option2}</label><br></br>

                    <label className="animate"><input className="accepted-ans" type="radio" id="h3" name="fav_language" value={content.option3}
                        onClick={(e) => setData(e.target.value)} />{content.option3}</label><br></br>

                    <label className="animate" ><input className="accepted-ans" type="radio" id="h4" name="fav_language" value={content.option4}
                        onClick={(e) => setData(e.target.value)} />{content.option4}</label><br></br>

                </form>

            </div>
            <Button onClick={Handlesubmit} variant="primary" size="sm" style={{ display: "block", margin: "1.5% 0px 0px 0.8%" }}> Submit Answer </Button>{' '}


            {/* To display Hint ................. */}

            <div className="hint">

                <Alert show={show} variant="success">
                    <Alert.Heading>Keep Learning and Keep Exploring !</Alert.Heading>
                    <p>
                        {content.hint}
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setShow(false)} variant="outline-success">
                            Close me y'all!
                        </Button>
                    </div>
                </Alert>

                {!show && <Button variant="primary" size="sm" onClick={() => setShow(true)}>Want Some Hint !</Button>}
            </div>

            {/* comment section to post your comment and reviews */}
            <Button onClick={toggleShow}>Comment here</Button>
      <MDBCollapse show={showShow}>
        <div className="new-post">
           <Comment />
        </div>
      </MDBCollapse>

        </div>

    );
}

export default Statement;