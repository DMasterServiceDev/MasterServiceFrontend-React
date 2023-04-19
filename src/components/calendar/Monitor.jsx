import React, { useEffect, useState } from 'react'
import instance from '../../services/api'

export default function Monitor({ prevMonth, nextMonth, goToday, tempday}) {
    const [monthActive, setMonthActive] = useState('')
    const [montthCh, setMontthCh] = useState(false)
    useEffect(() => {
    instance.get('/account/month', { params: { year: tempday.format('YYYY'), month: tempday.format('M') } })
        .then(response => setMonthActive(response.data))}, 
        [tempday])


    const MonthStatusChange = (event) => {
        setMonthActive(!monthActive)
        const checked = event.target.checked;
        // отправка на сервер значения checked
        instance.post('/account/month', checked, { params: { year: tempday.format('YYYY'), month: tempday.format('M')} })
        .catch((error) => {
            console.error(error); // выводим ошибку в консоль
          });

        console.log(`Month status changed to ${checked}`);
    }


    useEffect(() => {
        console.log('monthActive:')
        console.log(monthActive)
      }, [monthActive])


    return (
        <div>
            <h2>{tempday.format('MMMYYYY')}</h2>
            <button onClick={prevMonth}>Пред</button>
            <button onClick={goToday}>Сегодня</button>
            <button onClick={nextMonth}>След</button>
            <input type="checkbox" onClick={MonthStatusChange} checked={monthActive}/>
        </div>
    )
}
