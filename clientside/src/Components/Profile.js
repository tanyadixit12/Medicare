import React, { useEffect } from "react";
import avatar from "./images/profile.png"
import { json, Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faTwitter,
  faGithub,
  faCodepen
} from "@fortawesome/free-brands-svg-icons";


const Profile = () => {

  //  Function to activate update button..........
  function toggleInput() {
    var collection = document.getElementsByClassName("common-class");
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].hasAttribute("readonly")) {
        collection[i].removeAttribute("readonly");
      }
      else {
        collection[i].setAttribute("readonly", "");
      }
    }

  };

  // method to handle image file uploaded .....................
  const handlefileupload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertbase64(file);
    console.log(base64);
    setPostImage(base64);
    // console.log(postImage.myfile);  
  };

  // method to convert imagefile into base64 binary data.......................
  function convertbase64(file) {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = () => {
        resolve(filereader.result);
      };
      filereader.onerror = (error) => {
        reject(error);
      }
    });
  };



  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [college, setCollege] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [linkedin, setLinkedIn] = React.useState("");
  const [git, setGit] = React.useState("");
  const [twitter, setTwitter] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [p1name, setP1name] = React.useState("");
  const [p2name, setP2name] = React.useState("");
  const [workp1name, setWork1name] =React.useState("");
  const [workp2name, setWork2name] = React.useState("");
  const [projectd1, setProjectd1] = React.useState("");
  const [projectd2, setProjectd2] = React.useState("");
  const [workdisc1, setWorkdisc1] = React.useState("");
  const [workdisc2, setWorkdisc2] = React.useState("");
  const [postImage, setPostImage] = React.useState("");

  const params = useParams();

  useEffect(() => {
    console.warn(params);
    getdetails();
  }, []);

  // to show the saved information of user in profile page from db........

  const getdetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5800/profilepage/${params.name}`,{
      headers:{authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`}
    });
    result = await result.json();
    
    console.log(result);
    if(result.success){

      result=result.result;
    setName(result.name);
    if(result.email!=undefined)
    setEmail(result.email);
    if(result.college!=undefined)
    setCollege(result.college);
    if(result.address!=undefined)
    setAddress(result.address);
    if(result.phone!=undefined)
    setPhone(result.phone);
    if(result.facebook!=undefined)
    setFacebook(result.facebook);
    if(result.git!=undefined)
    setGit(result.git);
    if(result.twitter!=undefined)
    setTwitter(result.twitter);
    if(result.linkedin!=undefined)
    setLinkedIn(result.linkedin);
    if(result.p1name!=undefined)
    setP1name(result.p1name);
    if(result.p2name!=undefined)
    setP2name(result.p2name);
    if(result.workp1name!=undefined)
    setWork1name(result.workp1name);
    if(result.workp2name!=undefined)
    setWork2name(result.workp2name);
    if(result.projectd1!=undefined)
    setProjectd1(result.projectd1);
    if(result.projectd2!=undefined)
    setProjectd2(result.projectd2);
    if(result.workdisc1!=undefined)
    setWorkdisc1(result.workdisc1);
    if(result.workdisc2!=undefined)
    setWorkdisc2(result.workdisc2);
    if(result.postImage!=undefined)
    setPostImage(result.postImage);

    }
  }

  // api integration to save entered details................ 
  const savedetail = async () => {
    console.warn(name, email, phone, college, address, linkedin, git, twitter, facebook);
    let result = await fetch(`http://localhost:5800/profilepage/${params.name}`, {
      method: "Put",
      body: JSON.stringify({
        name, email, phone, college, address, linkedin, git,
        twitter, facebook, p1name, p2name, workp1name, workp2name, projectd1, projectd2, workdisc1, workdisc2, postImage
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.warn(result);

    // lines of code after saving details to change mode to readonly...............
    var collections = document.getElementsByClassName("common-class");
    for (let i = 0; i < collections.length; i++) {
      collections[i].setAttribute("readonly", "");
    }


  }

  return (
    <section style={{ backgroundColor: '#eee' }}>

      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4 flex-row-reverse">
              <MDBBreadcrumbItem>
                <Button onClick={toggleInput} id="updateButton" variant="primary">Update</Button>{' '}
                <Button onClick={savedetail} id="saveButton" variant="primary">Save</Button>{' '}
              </MDBBreadcrumbItem>              
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">

                <label htmlFor="9899">
                  <MDBCardImage
                    src={postImage || avatar}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid />

                </label>

                <p className="text-muted mb-1">{name}</p>
                <p className="text-muted mb-4">{address}</p>
                <div className="d-flex justify-content-center mb-2">

                  <input className="file-upload" id="9899" type="file"
                    name="myfile" accept=".jpeg,.png,.jpg" onChange={(e) => { handlefileupload(e) }} />


                </div>
              </MDBCardBody>
            </MDBCard>
          {/* Social details of the users............ */}
            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3 ">

                    <label className="label" htmlFor="999"><Link to={linkedin}><FontAwesomeIcon icon={faLinkedin} size="2x" style={{ color: "#4d56d7" }} /></Link></label>
                    <MDBCardText><input readOnly id="999" className="inputtag common-class" type="url" name="linkedin link" placeholder="LinkedIn Profile" onChange={(e) => setLinkedIn(e.target.value)} value={linkedin} /> </MDBCardText>
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3 ">

                    <label className="label" htmlFor="900"><Link to={facebook}><FontAwesomeIcon icon={faFacebook} size="2x" style={{ color: "#4968ad" }} /></Link></label>
                    <MDBCardText><input readOnly id="900" className="inputtag common-class" type="url" name="Facebook link" placeholder="Facebook Profile" onChange={(e) => setFacebook(e.target.value)} value={facebook} /> </MDBCardText>
                  </MDBListGroupItem>


                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3 ">

                    <label className="label" htmlFor="905"><Link to={git}><FontAwesomeIcon icon={faGithub} size="2x" style={{ color: "rgb(55, 55 ,59)" }} /></Link></label>
                    <MDBCardText><input readOnly id="905" className="inputtag common-class" type="url" name="Github link" placeholder="Github Profile" onChange={(e) => setGit(e.target.value)} value={git} /> </MDBCardText>
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3 ">

                    <label className="label" htmlFor="909"><Link to={twitter}><FontAwesomeIcon icon={faTwitter} size="2x" style={{ color: "#49a1ab" }} /></Link></label>
                    <MDBCardText><input readOnly id="909" className="inputtag common-class" type="url" name="twitter link" placeholder="Twitter Profile" onChange={(e) => setTwitter(e.target.value)} value={twitter} /> </MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>

              </MDBCardBody>
            </MDBCard>

        {/* Ended.................... */}
        
               

          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">

                    <MDBInput id="inputField" className="text-muted common-class" placeholder="Give your Name" type='text'
                      onChange={(e) => setName(e.target.value)} value={name} readOnly />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">

                    <MDBInput className="text-muted common-class" placeholder="Provide your email" type='text'
                      onChange={(e) => setEmail(e.target.value)} value={email} readOnly />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>

                  </MDBCol>
                  <MDBCol sm="9">

                    <MDBInput className="text-muted common-class" placeholder="Phone" type='text'
                      onChange={(e) => setPhone(e.target.value)} value={phone} readonly />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>College Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">

                    <MDBInput className="text-muted common-class" placeholder="Your College NAme" type='text'
                      onChange={(e) => setCollege(e.target.value)} value={college} readOnly />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">

                    <MDBInput className="text-muted common-class" placeholder="Give your Address" type='text'
                      onChange={(e) => setAddress(e.target.value)} value={address} readOnly />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>

                    <MDBCardText className="mb-4">Share Your Project Details</MDBCardText>
                    <MDBCardText className="mb-1 projectname" style={{ fontSize: '.99rem' }}>Project Name:<input readOnly className="inputfield common-class" onChange={(e) => setP1name(e.target.value)} value={p1name} /></MDBCardText>
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.99rem' }}>Discription</MDBCardText>

                    <textarea className="common-class" readOnly onChange={(e) => setProjectd1(e.target.value)} value={projectd1} placeholder="Discription about your project !" rows="4" cols="40" wrap="soft" style={{ width: "-webkit-fill-available" }}></textarea>

                    {/* 2nd project details..................... */}

                    <MDBCardText className="mb-1 projectname" style={{ fontSize: '.99rem' }}>Project Name:<input readOnly className="inputfield common-class" onChange={(e) => setP2name(e.target.value)} value={p2name} /></MDBCardText>
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.99rem' }}>Discription</MDBCardText>

                    <textarea className="common-class" readOnly onChange={(e) => setProjectd2(e.target.value)} value={projectd2} placeholder="Discription about your project !" rows="4" cols="40" wrap="soft" style={{ width: "-webkit-fill-available" }}></textarea>

                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>

                    <MDBCardText className="mb-4">Share Your Experiences </MDBCardText>
                    <MDBCardText className="mb-1 projectname" style={{ fontSize: '.99rem' }}>WorkPlace:<input readOnly className="inputfield common-class" onChange={(e) => setWork1name(e.target.value)} value={workp1name} /></MDBCardText>
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.99rem' }}>Working Experience</MDBCardText>

                    <textarea className="common-class" readOnly onChange={(e) => setWorkdisc1(e.target.value)} value={workdisc1} placeholder="Share your working experience  &#128525;..." rows="4" cols="40" wrap="soft" style={{ width: "-webkit-fill-available" }}></textarea>

                    {/* 2nd project details..................... */}

                    <MDBCardText className="mb-1 projectname" style={{ fontSize: '.99rem' }}>WorkPlace:<input readOnly className="inputfield common-class"  onChange={(e) => setWork2name(e.target.value)} value={workp2name} /></MDBCardText>
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.99rem' }}>Working Experience</MDBCardText>

                    <textarea className="common-class" readOnly onChange={(e) => setWorkdisc2(e.target.value)} value={workdisc2} placeholder="Share your working experience  &#128525;... " rows="4" cols="40" wrap="soft" style={{ width: "-webkit-fill-available" }}></textarea>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>


              
            </MDBRow>
          </MDBCol>
        </MDBRow>

    

      </MDBContainer>
    </section>
  );
}

export default Profile;