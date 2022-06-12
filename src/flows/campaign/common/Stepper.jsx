import React from 'react';

function Stepper(props) {
    let {value, steps} = props;
    let totalStepCount = steps.length;
    let completedStepsCount = value+1;
    let remainingStepsCount = totalStepCount - completedStepsCount;

    let completedWidth = Math.floor(((value + 1) / totalStepCount)*100);
    let remainingWidth =  100 - completedWidth;

    let completedStepsList = steps.filter((step, idx) => idx <= value);
    let completedStepWidth = Math.floor(100 /( value + 1));
    let completedStepColor = steps[value].color;
   
    let remainingStepsList =  steps.filter((step, idx) => idx > value);
    let remainingStepsWidth = remainingStepsCount ? Math.floor(remainingWidth / (remainingStepsCount)): 0;  

    return (
        <div style={{position: 'relative', height: '27px', margin: '20px 30px 0', boxSizing:'border-box', borderRadius: '13px', backgroundColor: '#F7F7F7'}}>
            <div style={{display: 'inline-block', position: 'relative', height: 'inherit', width: `${completedWidth}%`, backgroundColor: `${completedStepColor}`, borderRadius: '13px'}}>
                {completedStepsList.map(step => 
                    <span style={{display: 'inline-block', fontSize: '12px', width: `${completedStepWidth}%`,
                    fontWeight: 'bold', color:'#ffffff', textAlign: 'center', paddingTop: '5px' }}
                    >{step.label}</span>
                )}
            </div>
            {remainingStepsList.map(step => 
                <span style={{fontSize: '12px', display: 'inline-block', 
                width: `${remainingStepsWidth}%`, height: 'inherit', fontWeight: 'bold', 
                color: '#3785B8', textAlign: 'center', paddingTop: '5px'}}
                >{step.label}</span>
            )}
            
         </div>
    );
}

export default Stepper;