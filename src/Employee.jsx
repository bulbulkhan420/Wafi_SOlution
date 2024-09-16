import axios from 'axios';
import React, { useEffect, useState } from 'react'
import css from './App.module.css'
export default function Employee() {
    let [datat,sdatat]=useState([{}]);
    useEffect(()=>{
        
      axios.get('http://localhost:8002/all')
      .then((res)=>{
        sdatat(res.data.val);
      })
  
      },[]);
  return (
    <div>
        <div className={css.bodyform}>
                  <div className={css.headerbody}>
                    <div >Photo</div>
                    <div >Full Name</div>
                    <div >Email</div>
                    <div >Mobile</div>
                    <div >Date of Birth</div>
                    
                  </div>
       
       
        {datat &&
                    datat.map((it,i)=>{
                       
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
                        
                        </div>
                        </div>
                        })
                        
                    }
                    
                    
                 
                

                  
                </div>
                </div>
  )
 
}
