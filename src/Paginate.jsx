import React, { useEffect, useState } from 'react'
import css from './Paginate.module.css'
export default function Paginate() {
  return (
    <div className={css.page}>
      <div >Prev</div>
      <div>1</div>
      <div >2</div>
      <div >3</div>
      <div >Next</div>
    </div>
  )
}
