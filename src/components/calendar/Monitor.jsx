import React, { useState, useEffect} from 'react';
import instance from '../../services/api';
import './styles/Calendar.css';

export default function Monitor({ prevMonth, nextMonth, goToday, tempday }) {
  const [monthActive, setMonthActive] = useState(false);
  const [buttonText, setButtonText] = useState('');
  useEffect(() => {
    instance.get('/account/month', { params: { year: tempday.format('YYYY'), month: tempday.format('M') } })
      .then(response => {
        console.log('montn ', response)
        setMonthActive(!response.data)
        if(response.data) setButtonText('Активно')
    else setButtonText('Активировать')
      }).catch(error => {
        console.error(error); // выводим ошибку в консоль
      });
    
    }, [])
  const MonthStatusChange = (event) => {
    setMonthActive(!monthActive);
    const checked = event.target.checked;
    // отправка на сервер значения checked
    instance.post('/account/month', !checked, { params: { year: tempday.format('YYYY'), month: tempday.format('M') } })
      .catch((error) => {
        console.error(error); // выводим ошибку в консоль
      });

    setButtonText(checked ? 'Активировать' : 'Активно');
  };

  const buttonStyle = {
    backgroundColor: monthActive ? 'rgb(255, 255, 255)' : 'rgb(245, 110, 110)',
    color: monthActive ? 'rgb(245, 110, 110)' :'white',
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: '15px',
    width: '120px',
    height: '20px',
    borderStyle: 'none',
    border: 'solid 1px',
    marginTop: '4px',
    // marginLeft: '10px',
  };

  return (
    <div className='monitorblock'>
      <h2 className='monitorheader'>{tempday.format('MMMM')} {tempday.format('YYYY')}</h2>
      <div className="monitorbtnblock">
        <input type="checkbox" id="btn-checkbox" className="btn-checkbox" onClick={MonthStatusChange} checked={monthActive} />
        <label htmlFor="btn-checkbox" className="btn-label" style={buttonStyle}>{buttonText}</label>
        <button className='monitorbtn' onClick={prevMonth}>Пред</button>
        <button className='monitorbtn' onClick={goToday}>Сегодня</button>
        <button className='monitorbtn' onClick={nextMonth}>След</button>
      </div>
    </div>
  );
}
