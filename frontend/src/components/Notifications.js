import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBell, 
  FaCalendarAlt, 
  FaFileMedical, 
  FaHospital, 
  FaPills,
  FaEllipsisH, 
  FaTrash, 
  FaCheck,
  FaArrowLeft,
  FaCheckDouble,
  FaBroom
} from 'react-icons/fa';
import '../styles/Notifications.css';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch notifications from an API
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          title: 'Consulta Agendada',
          message: 'Sua consulta com Dr. João Silva foi confirmada para amanhã às 14:30.',
          time: '2 horas atrás',
          date: '2024-03-18T14:30:00',
          type: 'appointment',
          isRead: false,
          priority: 'high'
        },
        {
          id: 2,
          title: 'Resultado de Exame Disponível',
          message: 'O resultado do seu exame de sangue já está disponível para visualização.',
          time: '1 dia atrás',
          date: '2024-03-17T10:15:00',
          type: 'exam',
          isRead: true,
          priority: 'medium'
        },
        {
          id: 3,
          title: 'Lembrete de Medicação',
          message: 'Lembrete para tomar seu medicamento Losartana às 20:00.',
          time: '5 horas atrás',
          date: '2024-03-18T08:00:00',
          type: 'medication',
          isRead: false,
          priority: 'high'
        },
        {
          id: 4,
          title: 'Hospital Próximo',
          message: 'Há um novo hospital credenciado próximo à sua localização.',
          time: '3 dias atrás',
          date: '2024-03-15T16:45:00',
          type: 'facility',
          isRead: true,
          priority: 'low'
        },
        {
          id: 5,
          title: 'Renovação de Receita',
          message: 'Sua receita para Levotiroxina precisa ser renovada em 7 dias.',
          time: '12 horas atrás',
          date: '2024-03-17T22:10:00',
          type: 'medication',
          isRead: false,
          priority: 'medium'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment': return <FaCalendarAlt />;
      case 'exam': return <FaFileMedical />;
      case 'medication': return <FaPills />;
      case 'facility': return <FaHospital />;
      default: return <FaBell />;
    }
  };

  const getNotificationColor = (priority) => {
    switch (priority) {
      case 'high': return 'var(--notification-high)';
      case 'medium': return 'var(--notification-medium)';
      case 'low': return 'var(--notification-low)';
      default: return 'var(--notification-medium)';
    }
  };

  const toggleRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: !notification.isRead } 
          : notification
      )
    );
    setActionMenuOpen(null);
  };

  const deleteNotification = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
    setActionMenuOpen(null);
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.isRead;
    return notification.type === activeFilter;
  });

  const toggleActionMenu = (id) => {
    setActionMenuOpen(actionMenuOpen === id ? null : id);
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="header-top">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <h1 className="page-title">Notificações</h1>
          <div className="header-actions">
            {notifications.length > 0 && (
              <>
                <button className="action-button" onClick={markAllAsRead} title="Marcar todas como lidas">
                  <FaCheckDouble />
                  <span className="action-text">Marcar lidas</span>
                </button>
                <button className="action-button delete" onClick={clearAll} title="Limpar todas">
                  <FaBroom />
                  <span className="action-text">Limpar</span>
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="notification-filters">
          <button 
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Todas
          </button>
          <button 
            className={`filter-button ${activeFilter === 'unread' ? 'active' : ''}`}
            onClick={() => setActiveFilter('unread')}
          >
            Não lidas
          </button>
          <button 
            className={`filter-button ${activeFilter === 'appointment' ? 'active' : ''}`}
            onClick={() => setActiveFilter('appointment')}
          >
            Consultas
          </button>
          <button 
            className={`filter-button ${activeFilter === 'exam' ? 'active' : ''}`}
            onClick={() => setActiveFilter('exam')}
          >
            Exames
          </button>
          <button 
            className={`filter-button ${activeFilter === 'medication' ? 'active' : ''}`}
            onClick={() => setActiveFilter('medication')}
          >
            Medicamentos
          </button>
        </div>
      </div>

      <div className="notifications-content">
        {loading ? (
          <div className="loading-state">
            <div className="notification-loading-spinner"></div>
            <p>Carregando notificações...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <FaBell className="empty-icon" />
            <h3>Nenhuma notificação</h3>
            <p>Você não tem notificações {activeFilter !== 'all' ? 'nesta categoria' : ''} no momento.</p>
          </div>
        ) : (
          <div className="notifications-list">
            {filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-card ${notification.isRead ? 'read' : 'unread'}`}
              >
                <div 
                  className="notification-indicator" 
                  style={{ backgroundColor: getNotificationColor(notification.priority) }}
                ></div>
                <div className="notification-icon" style={{ color: getNotificationColor(notification.priority) }}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-header">
                    <h3 className="notification-title">{notification.title}</h3>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                </div>
                <div className="notification-actions">
                  <button 
                    className="action-more" 
                    onClick={() => toggleActionMenu(notification.id)}
                  >
                    <FaEllipsisH />
                  </button>
                  {actionMenuOpen === notification.id && (
                    <div className="action-menu">
                      <button onClick={() => toggleRead(notification.id)}>
                        <FaCheck /> {notification.isRead ? 'Marcar como não lida' : 'Marcar como lida'}
                      </button>
                      <button onClick={() => deleteNotification(notification.id)}>
                        <FaTrash /> Excluir
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
