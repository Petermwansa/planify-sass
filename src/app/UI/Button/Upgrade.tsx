
import React from 'react';

interface UpgradeBtnProps {
  onClick: () => void;
}

function UpgradeBtn({ onClick}: UpgradeBtnProps) {
  return (
    <button className='upgrade-btn' onClick={onClick}>
     Upgrade Plan
    </button>
  )
}

export default UpgradeBtn;
