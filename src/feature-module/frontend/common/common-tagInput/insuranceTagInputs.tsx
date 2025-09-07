import React, { useState, useRef, useEffect } from 'react';
import { Tag, theme, Select } from 'antd';

interface InsuranceTagInputProps {
  initialTags?: string[];
  onTagsChange?: (tags: string[]) => void;
  insuranceOptions?: string[];
}

const InsuranceTagInputs: React.FC<InsuranceTagInputProps> = ({ 
  initialTags = [], 
  onTagsChange,
  insuranceOptions = []
}) => {
  const { } = theme.useToken();
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputVisible, setInputVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const handleInsuranceSelect = (value: string) => {
    if (value && tags.indexOf(value) === -1) {
      const newTags = [...tags, value];
      setTags(newTags);
      onTagsChange?.(newTags);
    }
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const renderTags = () =>
    tags.map((tag) => (
      <Tag key={tag} closable onClose={() => handleClose(tag)}>
        {tag}
      </Tag>
    ));

  // Filter out already selected insurances
  const availableOptions = insuranceOptions.filter(option => !tags.includes(option));

  return (
    <div className='common-tag-input'>
      {renderTags()}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
          + Add Insurance
        </Tag>
      )}
      {inputVisible && (
        <Select
          style={{ width: 200 }}
          placeholder="Select Insurance"
          onChange={handleInsuranceSelect}
          onBlur={() => setInputVisible(false)}
          autoFocus
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={availableOptions.map(option => ({
            value: option,
            label: option
          }))}
        />
      )}
    </div>
  );
};

export default InsuranceTagInputs;
