import React, { useState, useEffect } from "react";
import photo from "./images/profile.png";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";



const Comment = () => {

    const [comments, setComment] = useState([]);
    const [writtenpost, setPost] = useState("");

    const params = useParams();
    useEffect(() => {
        getProblemcontent();
    }, []);


    //    Api call to get content of the problem......*******************
    const getProblemcontent = async () => {
        let result = await fetch(`http://localhost:5800/problem/${params.id}`, {
            headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        result = await result.json();
        setComment(result.comments);
    };

    // to submit your comment .............*******************************
    const Post = async () => {
        if (writtenpost)
            comments.push(writtenpost);
        let result = await fetch(`http://localhost:5800/problem/${params.id}`, {
            method: "Put",
            body: JSON.stringify({
                comments
            }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
    };


    return (

        <div className="all-comments">

            <div className="container">
                <div className="be-comment-block">
                    <h1 className="comments-title">Comments (3)</h1>
                    {/* <div className="be-comment">
		<div className="be-img-comment">	
        <img src={photo} alt="" className="be-ava-comment" />
		</div>
		<div className="be-comment-content">
				<span className="be-comment-time">
					<i className="fa fa-clock-o"></i>
					May 27, 2015 at 3:14am
				</span>

			<p className="be-comment-text">
				Pellentesque gravida tristique ultrices. 
				Sed blandit varius mauris, vel volutpat urna hendrerit id. 
				Curabitur rutrum dolor gravida turpis tristique efficitur.
			</p>
		</div>
	</div> */}
                    {/* 2nd  */}
                    {/* {console.log(comments)} */}
                    {
                        comments.length > 0 ? comments.map((item, index) =>
                            <ul key={index}>
                                <div className="be-comment">
                                    <div className="be-img-comment">
                                        <img src={photo} alt="" className="be-ava-comment" />
                                    </div>
                                    <div className="be-comment-content">
                                        <span className="be-comment-time">
                                            <i className="fa fa-clock-o"></i>
                                            May 27, 2015 at 3:14am
                                        </span>

                                        <p className="be-comment-text">
                                            {item}
                                        </p>
                                    </div>
                                </div>
                            </ul>
                        )
                            :
                            <h1>no product found</h1>
                    }

                    {/* to post and write comment  */}
                    <form className="form-block">
                        <div className="row">

                            <div className="col-xs-12">
                                <div className="form-group">
                                    <textarea value={writtenpost} onChange={(e) => { setPost(e.target.value) }} className="form-input" required="" placeholder="Your text"></textarea>
                                </div>
                            </div>
                            <Button onClick={Post}>Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default Comment;