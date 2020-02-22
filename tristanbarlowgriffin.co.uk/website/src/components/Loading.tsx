import React from 'react'

interface Props {
  size: number
}
export default class Loading extends React.Component<Props>{

  render () {
    return (
      <progress
        style={ { width: `${ this.props.size }rem`, height: `${ this.props.size }rem` } }
        className="pure-material-progress-circular"
      />
    )
  }
}