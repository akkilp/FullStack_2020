// Parts which are commented include redux using the traditional way


import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

// import { connect } from 'react-redux'


const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      filter   
      <input 
        type="text" 
        name="filter" 
        onChange={(event) => {
            dispatch(filterChange(event.target.value))
            /* props.filterChange(event.target.value) */
        }}
      />
    </div>
  )
}

/* const mapDispatchToProps = {
    filterChange
} */

/* const ConnectedFilter = connect(null,mapDispatchToProps)(VisibilityFilter)
export default ConnectedFilter */

export default VisibilityFilter