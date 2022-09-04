import React from 'react'
import styles from './Link.module.css'
import { Button } from 'react-bootstrap'

export default function MyButton(type, text, onClick) {
  return (
    <Button type={type} onClick={onClick} className={styles.button}>{text}</Button>
  )
}
