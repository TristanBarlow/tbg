import React from 'react'

export interface MySelectProps<T extends string> {
  label?: string
  value: T | null
  change: (t: T | null) => void
  options: string[]
}
export default function MySelect<T extends string> (props: MySelectProps<T>) {
  const label = props.label && <p> { props.label }</p>
  const selectProps = {
    value: props.value,
    onChange: (v: any) => {
      const str = v.target.value
      props.change(str || null)
    }
  } as any

  return (
    <div>
      { label }
      <div style={ { width: 'fit-content' } } className="select">
        <div { ...selectProps } as="select" >
          { props.options.map(x => (<option key={ x } value={ x }>{ x }</option>)) }
        </div>
      </div>
    </div>
  )
}
