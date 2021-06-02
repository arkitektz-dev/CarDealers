import React, { useCallback } from 'react'
import Slider from 'rn-range-slider';
import Thumb from './Thumb'
import Rail from './Rail'
import RailSelected from './RaliSelected'
import Notch from './Notch'
import Label from './Label'
const SliderData =({min,max,step,onValueChange})=>{
    
const renderThumb = useCallback(() => <Thumb/>, []);
const renderRail = useCallback(() => <Rail/>, []);
const renderRailSelected = useCallback(() => <RailSelected/>, []);
const renderLabel = useCallback(value => <Label text={value}/>, []);
const renderNotch = useCallback(() => <Notch/>, []);
const handleValueChange = useCallback((low, high) => {
  setLow(low);
  setHigh(high);
}, []);
    return(
                 
        <Slider
          min={min}
          max={max}
          step={step}
          allowLabelOverflow
          floatingLabel
          renderThumb={renderThumb}
  renderRail={renderRail}
  renderRailSelected={renderRailSelected}
  renderLabel={renderLabel}
  renderNotch={renderNotch}
          onValueChanged={onValueChange}
        />
    )
}
export default SliderData