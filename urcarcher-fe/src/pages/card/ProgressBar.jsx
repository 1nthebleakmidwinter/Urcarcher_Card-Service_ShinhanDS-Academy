import React from 'react';
import '../../assets/Card.css'; // 스타일을 위한 CSS 파일을 따로 작성하는 것이 좋습니다.

function ProgressBar({ stages, currentStage }) {
    return (
        <div className="progress-bar-container">
            {stages.map((stage, index) => {
                const isActiveOrCompleted = stages.indexOf(currentStage) >= index;
                const isNextStageActiveOrCompleted = stages.indexOf(currentStage) >= index + 1;

                return (
                    <div
                        key={index}
                        className={`progress-bar-stage ${isActiveOrCompleted ? 'completed' : ''}`}
                    >
                        <div className="stage-icon">
                            {isActiveOrCompleted ? <span>&#10003;</span> : <span>&#9675;</span>}
                        </div>
                        {index < stages.length - 1 && (
                            <div 
                                className={`stage-divider ${isNextStageActiveOrCompleted ? 'divider-completed' : ''}`}
                            ></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}


export default ProgressBar;
