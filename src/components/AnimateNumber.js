import * as React from 'react';
import {
  Text,
  View
} from 'react-native';

const HALF_RAD = Math.PI/2

export default class AnimateNumber extends React.Component {

  static defaultProps = {
    interval : 14,
    timing : 'linear',
    steps : 45,
    value : 0,
    formatter : (val) => val,
    renderContent: (value, style) => (<Text style={style}>
      {value}
    </Text>),
    onFinish : () => {}
  };

  static TimingFunctions = {

    linear : (interval, progress) => {
      return interval
    },

    easeOut : (interval, progress) => {
      return interval * Math.sin(HALF_RAD*progress) * 5
    },

    easeIn : (interval, progress) => {
      return interval * Math.sin((HALF_RAD - HALF_RAD*progress)) * 5
    },

  };

  constructor(props) {
    super(props);
    // default values of state and non-state variables
    this.state = {
      value : this.props.initial ? this.props.initial : 0,
      displayValue : 0
    }
    this.dirty = false;
    this.startFrom = 0;
    this.endWith = 0;
  }

  componentDidMount() {
    this.startFrom = this.state.value
    this.endWith = this.props.value
    this.dirty = true
    this.mounted = true;
    this.startAnimate()
  }

  componentDidUpdate(prevProps) {
    // check if start an animation
    if(this.props.value !== prevProps.value) {
      this.startFrom = prevProps.value;
      this.endWith = this.props.value;
      this.dirty = true;
      this.startAnimate();
      return
    }
    // Check if iterate animation frame
    if(!this.dirty) {
      this.props.onFinish();
      return
    }
    if (this.direction === true) {
      if(parseFloat(this.state.value) <= parseFloat(prevProps.value)) {
        this.startAnimate();
      }
    }
    else if(this.direction === false){
      if (parseFloat(this.state.value) >= parseFloat(prevProps.value)) {
        this.startAnimate();
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.timer);
  }

  render() {
    return this.props.renderContent(this.state.displayValue, this.props.style)
  }

  startAnimate() {
    let progress = this.getAnimationProgress()

    this.timer = setTimeout(() => {

      if (this.mounted) {
        let value = (this.endWith - this.startFrom)/this.props.steps
        let sign = value >= 0 ? 1 : -1
        if(this.props.countBy)
          value = sign*Math.abs(this.props.countBy)
        let total = parseFloat(this.state.value) + parseFloat(value)
  
        this.direction = (value > 0)
        // animation terminate conditions
        if (((this.direction) ^ (total <= this.endWith)) === 1) {
          this.dirty = false
          total = this.endWith
        }
  
        if(this.props.onProgress)
          this.props.onProgress(this.state.value, total)
  
        this.setState({
          value : total,
          displayValue : this.props.formatter(total)
        })
      }

    }, this.getTimingFunction(this.props.interval, progress))

  }

  getAnimationProgress = () => {
    return (this.state.value - this.startFrom) / (this.endWith - this.startFrom)
  }

  getTimingFunction = (interval, progress) => {
    if(typeof this.props.timing === 'string') {
      let fn = AnimateNumber.TimingFunctions[this.props.timing]
      return fn(interval, progress)
    } else if(typeof this.props.timing === 'function')
      return this.props.timing(interval, progress)
    else
      return AnimateNumber.TimingFunctions['linear'](interval, progress)
  }

}