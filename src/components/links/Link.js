import React from 'react'
import styles from './Link.module.css'
import { Link } from 'react-router-dom'

export default function MyLink(type, text, to, onClick) {

  return (
    <Link type={type} to={to} className={styles.button} onClick={onClick}>{text}</Link>
  )
}
