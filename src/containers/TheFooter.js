import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      {/* <div>
        <a href="#" target="_blank" rel="noopener noreferrer">OLA</a>
        <span className="ml-1">&copy; 2020 Education.</span>
      </div> */}
      <div className="mfs-auto">
        <span>OLA</span>
        <span className="ml-1">&copy; 2020 Education.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
