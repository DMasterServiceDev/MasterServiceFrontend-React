import React from 'react'

export default function Day({selectedDay}) {
  if(selectedDay) {
    return (
    <div>
      <h2 className='secondcolor'>Расписание на {selectedDay}</h2>
    </div>
  )
}
}
