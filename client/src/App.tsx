import { useState } from 'react'

import styles from './App.module.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className={styles.tes}>Teste</p>
    </>
  )
}

export default App
