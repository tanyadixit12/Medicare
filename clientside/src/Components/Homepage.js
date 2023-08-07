import React from "react";
import photo from "./images/bg.jpg.webp";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
const Home=()=>{
  const [searchitem, setItem] = React.useState("");
  
    return (
       
        <>
        <div className="Home-container">
            <div className="inner-box">
              <h2>Every Problem has a solution. You Just have to find it...</h2>
              <h4>Let's Find it !</h4>
              <input  className="searchbar" type="text" placeholder="Search by topic name" 
              onChange={(e) => setItem(e.target.value)} value={searchitem}></input>
              <button  className="searchbtn"><Link style={{textDecoration:"none" ,color:"white"}} to={`./${searchitem}`}>Search</Link></button>
            </div>
        </div>
        
        <div>
        
        <section className="course">
        <h1>Explore all Features</h1>
        <p>Some information to know more about us and about this platform before getting started look at this thank you !</p>   
        <div className="row">
            <div className="course-col">
                <h3>Your Profile</h3>
                <p>There is a Profile section where you can share your personal details like name, college, contact-details, your experiences, more about your projects to make profile more better you can upload your photo. </p>
            </div>
            <div className="course-col">
                <h3>Variety Of Problems</h3>
                <p>Here you will get number of variety of problems based on different topics like- puzzels, computer, jee(physics, chemistry, math). select a top, start your journey from today.</p>
            </div>
            <div className="course-col">
                <h3>Discussion</h3>
                <p>Here we provide you a better intraction level with questions and other users via discussion section, ask your queries put your idea to solve the problems.</p>
            </div>
        </div>     
    </section>

    {/* Topics list ..... */}
           
           <section className="topic-list">
            <h1>Prepare By Topic</h1>
            <div className="row">
          <div className="topic-col">
          <ListGroup>
          <ListGroup.Item action >
        <Link to="physics">Physics</Link>
      </ListGroup.Item>
      <ListGroup.Item action variant="light">
      <Link to="chemistry"> Chemistry</Link>
      </ListGroup.Item>
      <ListGroup.Item action >
        <Link to="math">Mathmatics</Link>
      </ListGroup.Item>
      <ListGroup.Item action variant="light">
        <Link to="gk">General knowledge</Link>
      </ListGroup.Item>
    </ListGroup>
          </div>

          <div className="topic-col">
          <ListGroup>
      
          <ListGroup.Item action >
       <Link to="boc">Basics of Computer</Link>
      </ListGroup.Item>
      <ListGroup.Item action variant="light">
        <Link to="co">Computer architeture</Link>
      </ListGroup.Item>
      <ListGroup.Item action >
       <Link to="networking"> Networking</Link>
      </ListGroup.Item>
      <ListGroup.Item action variant="light">
       <Link to="api">
       Rest API</Link>
      </ListGroup.Item>

    </ListGroup>
          </div>

          <div className="topic-col">
          <ListGroup>
     
      <ListGroup.Item action >
       <Link to="lt"> Logical thinking</Link>
      </ListGroup.Item>
      <ListGroup.Item action variant="light">
       <Link to="matrix">Matrix</Link>
      </ListGroup.Item>
      <ListGroup.Item action >
        <Link to="n-puzzels">N-puzzels</Link>
      </ListGroup.Item>
      <ListGroup.Item action variant="light">
       <Link to="gaming"> Gameing problem</Link>
      </ListGroup.Item>
    
    </ListGroup>
          </div>

          </div>
           </section>
                 

            </div>

            </>
    )
}

export default Home