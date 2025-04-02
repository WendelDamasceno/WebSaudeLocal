import React from 'react';
import { FaRegCalendarCheck, FaHistory, FaRegCalendarTimes } from 'react-icons/fa';

const AppointmentTabs = ({ 
  activeTab, 
  setActiveTab, 
  filterYear, 
  setFilterYear 
}) => {
  return (
    <>
      <div className="appointments-tabs">
        <button 
          className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          <FaRegCalendarCheck />
          <span>Agendados</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FaHistory />
          <span>Histórico</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'canceled' ? 'active' : ''}`}
          onClick={() => setActiveTab('canceled')}
        >
          <FaRegCalendarTimes />
          <span>Cancelados</span>
        </button>
      </div>
      
      {activeTab === 'history' && (
        <div className="history-filter-bar">
          {[new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2].map(year => (
            <button 
              key={year}
              className={`history-filter-button ${filterYear === year ? 'active' : ''}`}
              onClick={() => setFilterYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default AppointmentTabs;
