import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import instance from '../../services/api'
import _ from 'lodash';
import {
  isObjectInArray, parseDate,
  checkObjSinArray, getYearPatternDays,
  getPatternDays, getNextPatternDays,
  getPrevPatternDays,
  getIgonoreDays
} from './CalendarFunc'

const WeekDaysWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  max-width: 500px;
`;

const WeekDays = styled.div`
  min-width: 40px;
  min-height: 25px;
  border: 1px solid rgb(230, 230, 230);
  display: flex;
  justify-content: flex-end;
  background-color: ${props => props.isRed ? '#f4d9d9' : ''};
  cursor: pointer;
  padding-right: 14px
`;

function WeekDay({ weekDays, patternDays, tempday, setPatternDays, setIsRed, daysArray, setSuccessful}) {

  const deletePattern = (index, pattern) => {
    instance.delete('/account/pattern', { params: { year: pattern.year, month: pattern.month, weekday: pattern.weekday } })
      .catch((error) => {
        console.error(error); // выводим ошибку в консоль
      });
    const newPatternDays = [...patternDays];
    newPatternDays.splice(index -1, 1);
    console.log('newPD ', newPatternDays)
    setPatternDays(newPatternDays);
    setSuccessful(false)
    console.log(`Удаляем ${index}`);
  }

  return (
    <WeekDaysWrapper>
      {weekDays.map((day, index) => {
        const dayOfWeek = moment().day(index + 1).day();
        const isRed = patternDays.some(pattern => {
          return (
            pattern.weekday === dayOfWeek &&
            (+pattern.month === +tempday.format('MM') || +pattern.month === 13) &&
            +pattern.year === +tempday.format('YYYY')
          );
        });
        return (
          <WeekDays key={day} isRed={isRed} onClick={() => {
            const pattern = patternDays.find(pattern => {
              return (
                pattern.weekday === dayOfWeek &&
                +pattern.month === +tempday.format('MM') &&
                +pattern.year === +tempday.format('YYYY')
              );
            });
            if (pattern) {
              deletePattern(index, pattern);
            }
          }}>
            {day}
          </WeekDays>
        );
      })}
    </WeekDaysWrapper>
  );
}

export default WeekDay;
