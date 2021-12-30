import {BsFilterLeft} from 'react-icons/bs'

import './index.css'

const RestaurantHeader = props => {
  const {sortbyOptions, activeOptionId, updateActiveOptionId} = props
  const onChangeSortby = event => {
    updateActiveOptionId(event.target.value)
  }

  return (
    <div className="restaurant-header">
      <h1 className="restaurant-list-heading">Popular Restaurants</h1>
      <div className="restaurant-description-container">
        <p className="restaurant-description">
          Select Your favorite restaurant special dish and make your day
          happy...
        </p>
        <div className="sort-by-container">
          <BsFilterLeft className="sort-by-icon" />
          <h1 className="sort-by">Sort by</h1>
          <select
            className="sort-by-select"
            value={activeOptionId}
            onChange={onChangeSortby}
          >
            {sortbyOptions.map(eachOption => (
              <option
                key={eachOption.optionId}
                value={eachOption.optionId}
                className="select-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default RestaurantHeader
