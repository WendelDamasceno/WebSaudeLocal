import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Tabs, 
  Tab,
  Divider,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  QuestionAnswer as DiscussionIcon,
  Forum as ForumIcon,
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
  Comment as CommentIcon,
  FavoriteBorder as LikeBorderIcon,
  CheckCircle as VerifiedIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  MoreHoriz as MoreIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Dados simulados para os tópicos/discussões
const MOCK_TOPICS = [
  {
    id: 1,
    title: "Como agendar consulta em hospital público?",
    author: {
      id: 101,
      name: "Maria Silva",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      isVerified: true
    },
    category: "Dúvidas",
    content: "Olá pessoal, gostaria de saber qual o procedimento para agendar uma consulta com cardiologista pelo SUS em Camaçari? Agradeço a ajuda!",
    timestamp: "2023-07-15T14:30:00Z",
    likes: 15,
    comments: 8,
    tags: ["SUS", "Agendamento", "Cardiologia"]
  },
  {
    id: 2,
    title: "Médicos pediatras na região da Gleba E",
    author: {
      id: 102,
      name: "João Oliveira",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      isVerified: false
    },
    category: "Recomendação",
    content: "Alguém pode indicar um bom pediatra na região da Gleba E? Estou procurando para minha filha de 2 anos.",
    timestamp: "2023-07-16T09:15:00Z",
    likes: 7,
    comments: 12,
    tags: ["Pediatria", "Gleba E", "Recomendação"]
  },
  {
    id: 3,
    title: "Onde encontrar medicamento para pressão alta?",
    author: {
      id: 103,
      name: "Ana Ferreira",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
      isVerified: false
    },
    category: "Medicamentos",
    content: "Estou com dificuldade de encontrar Losartana 50mg nas farmácias da cidade. Alguém sabe onde tem disponível?",
    timestamp: "2023-07-17T16:45:00Z",
    likes: 9,
    comments: 14,
    tags: ["Medicamentos", "Hipertensão"]
  },
  {
    id: 4,
    title: "Experiências com o Hospital Geral de Camaçari",
    author: {
      id: 104,
      name: "Carlos Santos",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      isVerified: true
    },
    category: "Relato",
    content: "Passei por uma cirurgia no Hospital Geral de Camaçari mês passado e gostaria de compartilhar minha experiência...",
    timestamp: "2023-07-18T11:20:00Z",
    likes: 23,
    comments: 17,
    tags: ["Hospital Geral", "Cirurgia", "Experiência"]
  },
  {
    id: 5,
    title: "Dica: UPA da Gleba B com pouca fila",
    author: {
      id: 105,
      name: "Paula Castro",
      avatar: "https://randomuser.me/api/portraits/women/18.jpg",
      isVerified: false
    },
    category: "Informação",
    content: "Estive na UPA da Gleba B hoje cedo e tinha pouquíssima fila. Se alguém precisar, aproveite!",
    timestamp: "2023-07-19T08:30:00Z",
    likes: 31,
    comments: 5,
    tags: ["UPA", "Gleba B", "Fila"]
  }
];

// Dados simulados para os comentários
const MOCK_COMMENTS = [
  {
    id: 101,
    topicId: 1,
    author: {
      id: 201,
      name: "Roberto Almeida",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      isVerified: false
    },
    content: "Você precisa ir com seu cartão do SUS até a Unidade Básica de Saúde mais próxima da sua casa e solicitar o encaminhamento para cardiologista. Depois é só aguardar a marcação.",
    timestamp: "2023-07-15T15:10:00Z",
    likes: 7,
    isAnswer: true
  },
  {
    id: 102,
    topicId: 1,
    author: {
      id: 202,
      name: "Fernanda Lima",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      isVerified: true
    },
    content: "Complementando a resposta do Roberto, algumas UBS têm dias específicos para marcação de especialistas. Na UBS do Centro é na segunda-feira de manhã.",
    timestamp: "2023-07-15T16:22:00Z",
    likes: 5,
    isAnswer: false
  },
  {
    id: 103,
    topicId: 1,
    author: {
      id: 101,
      name: "Maria Silva",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      isVerified: true
    },
    content: "Muito obrigada pelas informações! Vou tentar na UBS do meu bairro amanhã.",
    timestamp: "2023-07-15T17:05:00Z",
    likes: 2,
    isAnswer: false
  }
];

// Categorias para novos tópicos
const TOPIC_CATEGORIES = [
  { value: "Dúvidas", label: "Dúvidas" },
  { value: "Recomendação", label: "Recomendação" },
  { value: "Informação", label: "Informação" },
  { value: "Relato", label: "Relato de Experiência" },
  { value: "Medicamentos", label: "Medicamentos" },
  { value: "Outros", label: "Outros" }
];

// Componente principal
const Community = () => {
  const [tabValue, setTabValue] = useState(0);
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [openNewTopicDialog, setOpenNewTopicDialog] = useState(false);
  const [newTopicData, setNewTopicData] = useState({
    title: '',
    content: '',
    category: 'Dúvidas',
    tags: ''
  });
  const [bottomNavValue, setBottomNavValue] = useState(1); // 1 corresponde à aba "Comunidade"

  const navigate = useNavigate();

  // Função para voltar para a home
  const handleBackToHome = () => {
    navigate('/home');
  };

  // Efeito para carregar tópicos
  useEffect(() => {
    // Simulando carregamento de dados da API
    setTimeout(() => {
      setTopics(MOCK_TOPICS);
      setFilteredTopics(MOCK_TOPICS);
      setLoadingTopics(false);
    }, 1000);
  }, []);

  // Função para filtrar tópicos com base na pesquisa
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTopics(topics);
    } else {
      const lowercaseSearch = searchTerm.toLowerCase();
      const filtered = topics.filter(topic => 
        topic.title.toLowerCase().includes(lowercaseSearch) || 
        topic.content.toLowerCase().includes(lowercaseSearch) ||
        topic.category.toLowerCase().includes(lowercaseSearch) ||
        topic.tags.some(tag => tag.toLowerCase().includes(lowercaseSearch))
      );
      setFilteredTopics(filtered);
    }
  }, [searchTerm, topics]);

  // Função para carregar comentários de um tópico
  const loadComments = (topicId) => {
    setLoadingComments(true);
    // Simulando carregamento de dados da API
    setTimeout(() => {
      const topicComments = MOCK_COMMENTS.filter(comment => comment.topicId === topicId);
      setComments(topicComments);
      setLoadingComments(false);
    }, 800);
  };

  // Função para lidar com a seleção de um tópico
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    loadComments(topic.id);
  };

  // Função para voltar à lista de tópicos
  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setComments([]);
    setNewCommentText('');
  };

  // Função para lidar com mudança de abas
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Função para lidar com a submissão de um novo comentário
  const handleCommentSubmit = () => {
    if (newCommentText.trim() === '') return;

    // Simulando envio para API
    const newComment = {
      id: Math.floor(Math.random() * 10000),
      topicId: selectedTopic.id,
      author: {
        id: 999, // ID do usuário atual (simulado)
        name: "Você",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
        isVerified: false
      },
      content: newCommentText,
      timestamp: new Date().toISOString(),
      likes: 0,
      isAnswer: false
    };

    setComments([...comments, newComment]);
    setNewCommentText('');
  };

  // Função para abrir o diálogo de novo tópico
  const handleOpenNewTopicDialog = () => {
    setOpenNewTopicDialog(true);
  };

  // Função para fechar o diálogo de novo tópico
  const handleCloseNewTopicDialog = () => {
    setOpenNewTopicDialog(false);
    setNewTopicData({
      title: '',
      content: '',
      category: 'Dúvidas',
      tags: ''
    });
  };

  // Função para lidar com a criação de um novo tópico
  const handleCreateNewTopic = () => {
    if (newTopicData.title.trim() === '' || newTopicData.content.trim() === '') return;

    // Convertendo as tags de string para array
    const tags = newTopicData.tags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    // Criando o novo tópico (simulando API)
    const newTopic = {
      id: Math.floor(Math.random() * 10000),
      title: newTopicData.title,
      author: {
        id: 999, // ID do usuário atual (simulado)
        name: "Você",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
        isVerified: false
      },
      category: newTopicData.category,
      content: newTopicData.content,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      tags: tags
    };

    // Adicionando o novo tópico à lista
    setTopics([newTopic, ...topics]);
    
    // Fechando o diálogo
    handleCloseNewTopicDialog();
    
    // Selecionando o novo tópico para visualização
    handleTopicSelect(newTopic);
  };

  // Função para formatar a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Renderizando a tela de detalhes do tópico
  if (selectedTopic) {
    return (
      <Box sx={{ 
        maxWidth: '480px', 
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        pb: 7
      }}>
        {/* Cabeçalho */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2, 
          backgroundColor: 'white',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <IconButton onClick={handleBackToTopics} edge="start">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1, flex: 1 }}>
            Discussão
          </Typography>
        </Box>

        {/* Tópico original */}
        <Paper sx={{ m: 2, p: 2, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={selectedTopic.author.avatar} alt={selectedTopic.author.name} />
              <Box sx={{ ml: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {selectedTopic.author.name}
                  </Typography>
                  {selectedTopic.author.isVerified && (
                    <VerifiedIcon color="primary" fontSize="small" sx={{ ml: 0.5 }} />
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(selectedTopic.timestamp)}
                </Typography>
              </Box>
            </Box>
            <Chip 
              label={selectedTopic.category} 
              size="small"
              color={
                selectedTopic.category === "Dúvidas" ? "primary" :
                selectedTopic.category === "Informação" ? "success" :
                selectedTopic.category === "Recomendação" ? "secondary" : "default"
              }
            />
          </Box>

          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            {selectedTopic.title}
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedTopic.content}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {selectedTopic.tags.map((tag, index) => (
              <Chip 
                key={index} 
                label={tag} 
                size="small" 
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
          
          <Divider sx={{ my: 1.5 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button 
              startIcon={<LikeBorderIcon />} 
              size="small" 
              color="primary"
            >
              {selectedTopic.likes}
            </Button>
            <Typography variant="body2" color="text.secondary">
              {selectedTopic.comments} {selectedTopic.comments === 1 ? 'comentário' : 'comentários'}
            </Typography>
          </Box>
        </Paper>

        {/* Comentários */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Respostas
          </Typography>
          
          {loadingComments ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : comments.length > 0 ? (
            <Box>
              {comments.map((comment) => (
                <Paper key={comment.id} sx={{ 
                  p: 2, 
                  mb: 2, 
                  borderRadius: 2,
                  border: comment.isAnswer ? '1px solid #4caf50' : 'none',
                }}>
                  {comment.isAnswer && (
                    <Chip 
                      label="Melhor resposta" 
                      color="success" 
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar src={comment.author.avatar} alt={comment.author.name} />
                    <Box sx={{ ml: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2">
                          {comment.author.name}
                        </Typography>
                        {comment.author.isVerified && (
                          <VerifiedIcon color="primary" fontSize="small" sx={{ ml: 0.5 }} />
                        )}
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(comment.timestamp)}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {comment.content}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Button 
                      startIcon={<LikeBorderIcon />} 
                      size="small" 
                      color="primary"
                    >
                      {comment.likes}
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box sx={{ 
              textAlign: 'center', 
              py: 3, 
              backgroundColor: 'rgba(0,0,0,0.02)',
              borderRadius: 2
            }}>
              <DiscussionIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
              <Typography variant="body1" color="text.secondary">
                Nenhuma resposta ainda. Seja o primeiro a responder!
              </Typography>
            </Box>
          )}
        </Box>

        {/* Campo para novo comentário */}
        <Box sx={{ 
          position: 'fixed', 
          bottom: 56, 
          left: 0, 
          right: 0,
          maxWidth: '480px',
          margin: '0 auto',
          backgroundColor: 'white',
          p: 2,
          borderTop: '1px solid rgba(0,0,0,0.1)'
        }}>
          <TextField
            fullWidth
            placeholder="Escreva uma resposta..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    color="primary" 
                    edge="end" 
                    disabled={newCommentText.trim() === ''}
                    onClick={handleCommentSubmit}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    );
  }

  // Renderizando a tela principal (lista de tópicos)
  return (
    <Box sx={{ 
      maxWidth: '480px', 
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      pb: 7
    }}>
      {/* Cabeçalho */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              edge="start" 
              onClick={handleBackToHome}
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold">
              Comunidade
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            color="primary"
            onClick={handleOpenNewTopicDialog}
            sx={{ borderRadius: 2 }}
          >
            Nova Discussão
          </Button>
        </Box>

        {/* Barra de pesquisa */}
        <Box sx={{ px: 2, pb: 2 }}>
          <TextField
            fullWidth
            placeholder="Buscar discussões..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchTerm ? (
                <InputAdornment position="end">
                  <IconButton 
                    size="small" 
                    onClick={() => setSearchTerm('')}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: { borderRadius: 6 }
            }}
          />
        </Box>

        {/* Abas para filtrar */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 1 }}
        >
          <Tab label="Todos" />
          <Tab label="Dúvidas" />
          <Tab label="Informações" />
          <Tab label="Recomendações" />
        </Tabs>
      </Box>

      {/* Lista de tópicos */}
      <Box sx={{ p: 2 }}>
        {loadingTopics ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => (
            <Card 
              key={topic.id} 
              sx={{ 
                mb: 2, 
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }}
              onClick={() => handleTopicSelect(topic)}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={topic.author.avatar} alt={topic.author.name} sx={{ width: 32, height: 32 }} />
                    <Box sx={{ ml: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" component="span">
                          {topic.author.name}
                        </Typography>
                        {topic.author.isVerified && (
                          <VerifiedIcon color="primary" fontSize="small" sx={{ ml: 0.5, fontSize: 14 }} />
                        )}
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(topic.timestamp)}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip 
                    label={topic.category} 
                    size="small"
                    color={
                      topic.category === "Dúvidas" ? "primary" :
                      topic.category === "Informação" ? "success" :
                      topic.category === "Recomendação" ? "secondary" : "default"
                    }
                  />
                </Box>

                <Typography variant="subtitle1" fontWeight="medium" sx={{ mt: 1, mb: 0.5 }}>
                  {topic.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    mb: 1.5
                  }}
                >
                  {topic.content}
                </Typography>
                
                {topic.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                    {topic.tags.slice(0, 3).map((tag, index) => (
                      <Chip 
                        key={index} 
                        label={tag} 
                        size="small" 
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                    {topic.tags.length > 3 && (
                      <Chip 
                        label={`+${topic.tags.length - 3}`} 
                        size="small" 
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    )}
                  </Box>
                )}
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small">
                      <LikeBorderIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {topic.likes}
                    </Typography>
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <CommentIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {topic.comments}
                    </Typography>
                  </Box>
                  <Button 
                    variant="text" 
                    size="small"
                  >
                    Ver discussão
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            py: 4, 
            backgroundColor: 'rgba(0,0,0,0.02)',
            borderRadius: 2
          }}>
            <ForumIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
            <Typography variant="body1" color="text.secondary">
              {searchTerm ? 'Nenhum resultado encontrado para sua busca.' : 'Nenhuma discussão no momento.'}
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              color="primary"
              onClick={handleOpenNewTopicDialog}
              sx={{ mt: 2, borderRadius: 2 }}
            >
              Nova Discussão
            </Button>
          </Box>
        )}
      </Box>

      {/* Diálogo para criar nova discussão */}
      <Dialog 
        open={openNewTopicDialog} 
        onClose={handleCloseNewTopicDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Nova Discussão</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Título"
              value={newTopicData.title}
              onChange={(e) => setNewTopicData({...newTopicData, title: e.target.value})}
              margin="normal"
              variant="outlined"
              placeholder="Escreva um título descritivo para sua discussão"
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="topic-category-label">Categoria</InputLabel>
              <Select
                labelId="topic-category-label"
                value={newTopicData.category}
                label="Categoria"
                onChange={(e) => setNewTopicData({...newTopicData, category: e.target.value})}
              >
                {TOPIC_CATEGORIES.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Conteúdo"
              value={newTopicData.content}
              onChange={(e) => setNewTopicData({...newTopicData, content: e.target.value})}
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              placeholder="Descreva sua pergunta ou discussão em detalhes"
            />
            
            <TextField
              fullWidth
              label="Tags (separadas por vírgula)"
              value={newTopicData.tags}
              onChange={(e) => setNewTopicData({...newTopicData, tags: e.target.value})}
              margin="normal"
              variant="outlined"
              placeholder="Ex: SUS, Pediatria, Vacina"
              helperText="Adicione tags para facilitar a busca por sua discussão"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewTopicDialog}>Cancelar</Button>
          <Button 
            onClick={handleCreateNewTopic} 
            variant="contained" 
            color="primary"
            disabled={!newTopicData.title || !newTopicData.content}
          >
            Publicar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bottom Navigation */}
      <BottomNavigation
        value={bottomNavValue}
        onChange={(event, newValue) => {
          setBottomNavValue(newValue);
        }}
        showLabels
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: '480px',
          margin: '0 auto',
          height: '56px',
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.05)',
          zIndex: 1000
        }}
      >
        <BottomNavigationAction 
          label="Início" 
          icon={<HomeIcon />} 
          sx={{ minWidth: 'auto' }}
          onClick={() => navigate('/home')}
        />
        <BottomNavigationAction 
          label="Comunidade" 
          icon={<ForumIcon />} 
          sx={{ minWidth: 'auto' }}
          onClick={() => navigate('/community')}
        />
        <BottomNavigationAction 
          label="Favoritos" 
          icon={<FavoriteIcon />} 
          sx={{ minWidth: 'auto' }}
          onClick={() => navigate('/favorites')}
        />
        <BottomNavigationAction 
          label="Mais" 
          icon={<MoreIcon />} 
          sx={{ minWidth: 'auto' }}
          onClick={() => navigate('/more')}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Community;
