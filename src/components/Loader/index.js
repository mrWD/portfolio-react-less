import React from 'react'

import './Loader.less'

const Loader = props => {
  const dotsList = Array.apply(null, { length: 8 }).map((item, i) => (
    <div className="Loader__dot" key={i}></div>
  ));

  return (
    <div className="Loader">
      <div className="Loader__roller">
        {dotsList}
      </div>
    </div>
  )
}

export default Loader
