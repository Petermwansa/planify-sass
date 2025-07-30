
import React from 'react';

interface UpgradeBtnProps {
  onClick: () => void;
}

function UpgradeBtn({ onClick}: UpgradeBtnProps) {
  return (
    <button className='upgrade-button' onClick={onClick}>
     Upgrade Plan
    </button>
  )
}

export default UpgradeBtn;
