import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import { insuranceProviders } from '../data/insuranceProviders';

interface InsuranceSelectorProps {
  selectedInsurance: string | null;
  onInsuranceChange: (insurance: string | null) => void;
}

const InsuranceSelector: React.FC<InsuranceSelectorProps> = ({
  selectedInsurance,
  onInsuranceChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Convert insurance providers to react-select options
  const insuranceOptions = useMemo(() => {
    return insuranceProviders.map(provider => ({
      value: provider,
      label: provider
    }));
  }, []);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return insuranceOptions;
    
    return insuranceOptions.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [insuranceOptions, searchTerm]);

  const handleInsuranceSelect = (option: any) => {
    onInsuranceChange(option ? option.value : null);
  };

  const handleSkipInsurance = () => {
    onInsuranceChange(null);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: '50px',
      border: '1px solid #e3e6f0',
      borderRadius: '8px',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #5a6acf'
      }
    }),
    menu: (provided: any) => ({
      ...provided,
      maxHeight: '300px',
      zIndex: 9999
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: '280px'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#5a6acf' : state.isFocused ? '#f8f9fc' : 'white',
      color: state.isSelected ? 'white' : '#5a6acf',
      '&:hover': {
        backgroundColor: state.isSelected ? '#5a6acf' : '#f8f9fc'
      }
    })
  };

  return (
    <div className="insurance-selector">
      <div className="mb-4">
        <h6 className="mb-3">Insurance Information</h6>
        <p className="text-muted mb-3">
          Please select your insurance provider or skip if you don't have insurance.
        </p>
      </div>

      <div className="mb-4">
        <label className="form-label">Insurance Provider</label>
        <Select
          value={selectedInsurance ? { value: selectedInsurance, label: selectedInsurance } : null}
          onChange={handleInsuranceSelect}
          options={filteredOptions}
          placeholder="Search and select your insurance provider..."
          isClearable={true}
          isSearchable={true}
          styles={customStyles}
          onInputChange={(newValue) => setSearchTerm(newValue)}
          inputValue={searchTerm}
          noOptionsMessage={() => "No insurance providers found"}
          loadingMessage={() => "Loading..."}
          className="insurance-select"
        />
      </div>

      <div className="mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          onClick={handleSkipInsurance}
        >
          <i className="isax isax-close-circle me-2" />
          Skip Insurance (No Insurance)
        </button>
      </div>

      {selectedInsurance && (
        <div className="alert alert-info">
          <div className="d-flex align-items-center">
            <i className="isax isax-tick-circle5 text-success me-2" />
            <div>
              <strong>Selected Insurance:</strong> {selectedInsurance}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceSelector;
