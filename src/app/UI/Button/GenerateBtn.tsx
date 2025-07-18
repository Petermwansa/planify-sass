import React from 'react';

interface GenerateBtnProps {
  onClick: () => void;
}

function GenerateBtn({ onClick}: GenerateBtnProps) {
  return (
    <button className='generate-btn' onClick={onClick}>
     + New Idea
    </button>
  )
}

export default GenerateBtn;
