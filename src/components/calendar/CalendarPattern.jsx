import React from 'react'
import './styles/Calendar.css'
import { getPrevPatternDays } from './CalendarFunc';
import instance from '../../services/api'
export default function CalendarPattern({ patternDays,
  setPatternDays, setSuccessful }) {
  function formatDate(date) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря', ''];
    const daysOfWeek = ['Воскресенья', 'Понедельники', 'Вторники', 'Среды', 'Четверги', 'Пятница', 'Субботы'];

    const year = date.year;
    const month = months[date.month - 1];
    const dayOfWeek = daysOfWeek[date.weekday];

    return `${dayOfWeek} ${month} ${year}го`;
  }

  const deletePattern = (event) => {
    const index = event.target.closest("svg").id;
    instance.delete('/account/pattern', { params: { year: patternDays[index].year, month: patternDays[index].month, weekday: patternDays[index].weekday } })
      .catch((error) => {
        console.error(error); // выводим ошибку в консоль
      });
    const newPatternDays = [...patternDays];
    newPatternDays.splice(index, 1);
    setPatternDays(newPatternDays);
    console.log(`Удаляем ${index}`);
    setSuccessful(false)
  }


    return (
      <div>
        <h2 className='patternheader'>Список паттернов</h2>
        <div className='patternblock'>
          <ul className="patternlist">
            {patternDays.map((item, index) => (
              <div className="patternitemblock" key={index}>
                <li>{JSON.stringify(formatDate(item))}
                  <svg id={index} className='cross' fill="#000000" width="8px" height="8px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" onClick={deletePattern}>
                    <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fillRule="evenodd" />
                  </svg>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    )

}
