import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

const Solvedproblem = () => {
    const [question, setQuestion] = useState([]);
    const params = useParams();
    useEffect(() => {

        getQuestions();
    }, []);

    const getQuestions = async () => {
        let result = await fetch(`http://localhost:5800/user/${params.tag}`);
        result = await result.json();
        setQuestion(result);
        console.log(result);
    };
    // method to display status****************************
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



    return (

        <>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th width="5%">#</th>
                            <th>Name</th>
                            <th width="16%">Level</th>
                            <th width="14%">status</th>
                        </tr>
                    </thead>
                </Table>
                {/* question list *******************************************/}

                {
                    question.length > 0 ? question.map((item, index) =>

                        <Table striped bordered hover>

                            <tbody>
                                <tr key={index}>
                                    <td width="5%">{index + 1}</td>
                                    <td ><Link to={"/problem/" + item._id}>{item.name}</Link></td>
                                    <td width="16%">{item.level}</td>
                                    <td width="14%">{check(item.solvers, NAME)}</td>



                                </tr>
                            </tbody>


                        </Table>
                    )
                        :
                        <h1>no problem found</h1>
                }

            </div>
        </>

    )
}
export default Solvedproblem;