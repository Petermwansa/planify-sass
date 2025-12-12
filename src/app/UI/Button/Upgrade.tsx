
import React from 'react';

interface UpgradeBtnProps {
  onClick: () => void;
}

function UpgradeBtn({ onClick}: UpgradeBtnProps) {
  return (
    <button className='upgrade-button' onClick={onClick}>
     My Plan
    </button>
  )
}

export default UpgradeBtn;
