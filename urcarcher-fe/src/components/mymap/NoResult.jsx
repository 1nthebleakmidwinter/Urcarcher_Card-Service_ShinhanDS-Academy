import React from 'react';

function NoResult(props) {

    return (
        <div className='noReslut-wrap'>
            <img src="/icon/white-exclamation-mark.png" alt="느낌표" 
                 style={{width:'30px', height:'150px'}}
            />
            <h2 style={{margin:'20px 0'}}>결제 내역이 없습니다</h2> 
        </div>
    );
}

export default NoResult;