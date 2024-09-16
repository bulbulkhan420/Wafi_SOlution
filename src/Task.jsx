import React, { useEffect, useState } from 'react'
import css from './App.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'
import axios from 'axios';
export default function Task() {
    

      let [datat,sdatat]=useState([]);
     
      
      
      let [disp,sdisp]=useState(false);
      let [beg,sbeg]=useState(0);
      let [curr,scurr]=useState(true);
      let [s1,ss1]=useState("");
      let [s2,ss2]=useState("");
      let [s3,ss3]=useState("");
      let [s4,ss4]=useState("");
      let setval=(e)=>{
        if(e.target.name=="name")
            ss1(e.target.value);
        if(e.target.name=="date")
            ss2(e.target.value);
        if(e.target.name=="email")
            ss3(e.target.value);
        if(e.target.name=="number")
            ss4(e.target.value);
      }
      let [ref,sref]=useState(0);
      let [delemail,sdelemail]=useState("");
      let search=()=>{
        axios.post('http://localhost:8002/show',{
            name:s1,
            dob:s2,
            email:s3,
            phone:s4
        })
        .then((res)=>{
            if(res.data.ok){
                sdatat(res.data.employee);
               
            
               sbeg(0);
            }
           else
           alert(" Not found anything related")
        })
      }
      useEffect(()=>{
        if(curr){
      axios.get('http://localhost:8002/all')
      .then((res)=>{
        sdatat(res.data.val);
      })
    }
      },[disp,ref]);
   
        return (
          <>
          <div style={{display:disp?'block':'none'}}>
          <div className={css.popup}>
            <button onClick={()=>{
                axios.post('http://localhost:8002/delet',{
                    email:delemail
                })
                .then((res)=>{
                    if(res.data.ok){
                        alert("Successfully Deleted");
                        if(beg-1>=0)
                        sbeg(beg=>beg-1);

                        sref(ref=>ref+1);
                    }
                    sdisp(false);    
                })
               
            }}>Yes</button>
            <button onClick={()=>{
                 sdisp(false);
            }}>No</button>
         </div>
          </div>
        
         
          <div className="container-fluid">
           
          <div className='row'>
              {/*left header*/}
            <div className={css.head+" col-3"}>
              <Link to='/'><div style={{color:'black',textDecoration:'none',fontSize:'18px',paddingTop:'1rem'}}>Home</div></Link>
            
              <Link to='/employee'><div style={{color:'black',textDecoration:'none',fontSize:'18px',paddingTop:'1rem'}}>Employees</div></Link>
              
              <Link to={`/add`}><div style={{color:'black',textDecoration:'none',fontSize:'18px',paddingTop:'1rem'}}>Add Employess</div></Link>
            </div>
      
            {/*right body*/}
            <div className={css.bodym+" col-9"}>
              {/*right body search*/}
                <div className={css.bodysearch}>
                  <div className="name">
                    <input type="text" required placeholder='Name' name='name' value={s1} onChange={setval}/>
                  </div>
                  <div className="date">
                    <input type="date" required placeholder='Date of Birth' name='date' value={s2} onChange={setval}  />
                  </div>
                  <div >
                    <input type="email" required placeholder='Email' name='email' value={s3} onChange={setval}/>
                  </div>
                  <div className="number">
                    <input type="number" required placeholder='Mobile' name='number' value={s4} onChange={setval} />
                  </div>
                  <div className="search" onClick={search}>
                    <span><SearchIcon/></span>
                  </div>
                </div>
      
           {/*right bodyhead*/}
                <div className={css.bodyform}>
                  <div className={css.headerbody}>
                    <div >Photo</div>
                    <div >Full Name</div>
                    <div >Email</div>
                    <div >Mobile</div>
                    <div >Date of Birth</div>
                    <div >Action</div>
                  </div>

                  {/*data*/}
                  <div >
                 {datat &&
                    datat.map((it,i)=>{
                        if(i>=beg&&i<beg+3){
                        return <div key={i}>
                            <div className={css.databody}>
                        <div >
                            <img style={{width:'100%',height:'100px'}} src={it.avatar} alt="do" />
                            
                        </div>
                        <div>
                            {it.name}
                        </div>
                        <div className={css.email}>
                            {it.email}
                        </div>
                        <div>
                            {it.phone}
                        </div>
                        <div>
                            {it.dob}
                        </div>
                        <div>
                            <Link  to={`/edit/${it.email}`} ><span><EditIcon/></span></Link>
                            <span onClick={()=>{
                                sdisp(true);
                               
                                sdelemail(it.email);
                            }}> <DeleteIcon/></span>
                          
                           
                        </div>
                        </div>
                        </div>
                        }
                        
                    })
                    
                 }
                

                  </div>
                </div>
                 {/*pagin info*/}
                 <div className={css.pageinfo}>
                    <p>{beg+1} to {beg+3<=datat.length?beg+3:datat.length}</p>
                 </div>
              {/*pagination*/}
              <div className={css.pagealign}>
              <div className={css.page}>
                <div onClick={()=>{
                   if(beg-3>=0)
                    sbeg(beg=>beg-3);
                    
                }}>Prev</div>
                
                <div onClick={()=>{
                   if(beg+3<=datat.length)
                    sbeg(beg=>beg+3);
                   
                    
                   
                }}>Next</div>
                </div> 
              </div>
            </div>
           </div>
          </div>
          </>
        )
}
