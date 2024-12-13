import React from 'react';
import OneInputModal from './OneInputModal';
import TwoInputsModal from './TwoInputsModal';
import TextAreaModal from './TextAreaModal';
import ListModal from './ListModal';
import DecisionModal from './DecisionModal';
import AddFileModal from './AddFileModal';

const UniversalModal = (props) => {
  const { styleType } = props;

  if (!props.isOpen) return null;

  switch (styleType) {
    case 'oneinput':
      return <OneInputModal {...props} />;
    case 'twoinputs':
      return <TwoInputsModal {...props} />;
    case 'textarea':
      return <TextAreaModal {...props} />;
    case 'list':
      return <ListModal {...props} />;
    case 'decision':
      return <DecisionModal {...props} />;
    case 'addfile':
      return <AddFileModal {...props} />;
    default:
      return null;
  }
};

export default UniversalModal;
