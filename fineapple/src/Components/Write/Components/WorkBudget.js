import React, {useState, setState} from 'react'
import Next from './Next'
import Prev from './Prev'
import { Link } from "react-router-dom";
import './WorkBudget.css'
import AccessAlarmOutlinedIcon from '@material-ui/icons/AccessAlarmOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';

function WorkBudget() {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    const [value, setValue] = useState(0);
    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");
    const handleChange = event =>
      setValue(addCommas(removeNonNumeric(event.target.value)));

      const [value2, setValue2] = useState(0);
      const addCommas2 = num2 => num2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const removeNonNumeric2 = num2 => num2.toString().replace(/[^0-9]/g, "");
      const handleChange2 = event2 =>
        setValue2(addCommas2(removeNonNumeric2(event2.target.value2)));
    
    
  

    return (
        <div className="workbudget">
            <div className="workbudget__container">
                <div className="workbudget__title">
                    <h1 className="workbudget__title__header">
                        가격 및 예산
                    </h1>
                    <p>Step 3 of 4</p>
                </div>
                <div className="workbudget__middle">
                    편하신 결제 방법을 선택해주세요
                </div>
                <div className="workbudget__row">
                    <div className="workbudget__row__box">
              <AccessAlarmOutlinedIcon className="budget__emoji"/>          
              <h3>시간당 계산</h3>
                    </div>
            <div className="workbudget__row__box">
            <GroupOutlinedIcon className="budget__emoji"/>          
                        <h3>만나서 결정</h3> 
                    </div>
                </div>
                
          <div className="workbudget__bot">
            <h1 className="workbudget__bot__header"> 시간당 계산시 예상 금액</h1>
            <div className="workbudget__bot__content">
              <p>시간당 예상 금액을 입력해주세요</p>
              <div className="workbudget__bot__content__container">
                <div className="workbudget__bot__input">
                  <input className="won__input" type="text" value={value} onInput={handleChange}/>
                  <div className="won start">원</div>
                </div>
                
              </div>
            </div>
          </div>
            </div>
            <div className="container__btns">
                    <Link className="writePage" to="/work/description">
                        <Prev />
                    </Link>
                    <Link className="writePage" to="/work/review">
                        <Next />
                    </Link>
                    
                </div>

            </div>
            
            
    )
}

export default WorkBudget
