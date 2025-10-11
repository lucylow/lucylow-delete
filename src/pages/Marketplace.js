import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  Tabs, 
  Tab, 
  TextField, 
  Chip,
  Avatar,
  Rating,
  Badge,
  Paper,
  InputAdornment,
  useTheme,
  alpha,
} from '@mui/material';
import { 
  Store,
  ShoppingCart,
  Share,
  AccountBalance,
  Flight,
  Work,
  Search,
  Verified,
  Download,
  Star,
  TrendingUp,
  NewReleases,
  LocalOffer,
} from '@mui/icons-material';

const plugins = [
  {
    id: 1,
    name: 'E-commerce Assistant',
    description: 'Automated online shopping and price comparison across multiple platforms. Smart price tracking and deal alerts.',
    author: 'AutoRL Team',
    rating: 4.8,
    downloads: 1247,
    price: 'Free',
    category: 'Shopping',
    verified: true,
    featured: true,
    new: false,
    icon: <ShoppingCart />,
    color: '#1e88e5',
  },
  {
    id: 2,
    name: 'Social Media Manager',
    description: 'Cross-platform social media posting and engagement automation with AI-powered content suggestions.',
    author: 'SocialBot Inc',
    rating: 4.6,
    downloads: 892,
    price: '$9.99',
    category: 'Social',
    verified: true,
    featured: false,
    new: true,
    icon: <Share />,
    color: '#0288d1',
  },
  {
    id: 3,
    name: 'Finance Tracker',
    description: 'Automated expense tracking and budget management across banking apps with smart insights.',
    author: 'FinanceAI',
    rating: 4.9,
    downloads: 2134,
    price: '$4.99',
    category: 'Finance',
    verified: true,
    featured: true,
    new: false,
    icon: <AccountBalance />,
    color: '#42a5f5',
  },
  {
    id: 4,
    name: 'Travel Planner',
    description: 'Complete travel booking automation for flights, hotels, and activities with best price guarantees.',
    author: 'TravelBot',
    rating: 4.7,
    downloads: 567,
    price: '$14.99',
    category: 'Travel',
    verified: true,
    featured: false,
    new: false,
    icon: <Flight />,
    color: '#1565c0',
  },
  {
    id: 5,
    name: 'Productivity Suite',
    description: 'Comprehensive productivity toolkit with calendar, task management, and email automation.',
    author: 'ProWork Labs',
    rating: 4.5,
    downloads: 1589,
    price: '$7.99',
    category: 'Productivity',
    verified: true,
    featured: false,
    new: true,
    icon: <Work />,
    color: '#00b0ff',
  },
  {
    id: 6,
    name: 'Smart Shopping Bot',
    description: 'AI-powered shopping assistant that finds the best deals and applies coupons automatically.',
    author: 'DealHunter AI',
    rating: 4.3,
    downloads: 456,
    price: 'Free',
    category: 'Shopping',
    verified: false,
    featured: false,
    new: true,
    icon: <LocalOffer />,
    color: '#2196f3',
  },
];

const categories = [
  { label: 'All', icon: <Store /> },
  { label: 'Shopping', icon: <ShoppingCart /> },
  { label: 'Social', icon: <Share /> },
  { label: 'Finance', icon: <AccountBalance /> },
  { label: 'Travel', icon: <Flight /> },
  { label: 'Productivity', icon: <Work /> },
];

const Marketplace = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlugins = plugins.filter(
    (plugin) =>
      (tabValue === 0 || plugin.category === categories[tabValue].label) &&
      (plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       plugin.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredPlugins = plugins.filter(p => p.featured);

  return (
    <Box sx={{ pt: 10, pb: 4, minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            fontWeight="700" 
            sx={{
              background: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            Plugin Marketplace
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover and install powerful automation plugins
          </Typography>
        </Box>

        {/* Search Bar */}
        <TextField
          label="Search plugins"
          variant="outlined"
          fullWidth
          sx={{ mb: 4 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: theme.palette.primary.main }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Category Tabs */}
        <Paper sx={{ mb: 4, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
          <Tabs 
            value={tabValue} 
            onChange={(_, v) => setTabValue(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                fontWeight: 600,
              },
              '& .Mui-selected': {
                color: theme.palette.primary.main,
              },
            }}
          >
            {categories.map((cat) => (
              <Tab 
                key={cat.label} 
                label={cat.label} 
                icon={cat.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Paper>

        {/* Featured Plugins */}
        {tabValue === 0 && (
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Star sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <Typography variant="h5" fontWeight="600">
                Featured Plugins
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {featuredPlugins.map((plugin) => (
                <Grid item xs={12} sm={6} lg={4} key={plugin.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      position: 'relative',
                      overflow: 'visible',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 24px ${alpha(plugin.color, 0.3)}`,
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${plugin.color} 0%, ${alpha(plugin.color, 0.6)} 100%)`,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Avatar 
                          sx={{ 
                            width: 56, 
                            height: 56,
                            bgcolor: alpha(plugin.color, 0.15),
                            color: plugin.color,
                          }}
                        >
                          {plugin.icon}
                        </Avatar>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                          {plugin.featured && (
                            <Chip 
                              label="Featured" 
                              size="small" 
                              icon={<Star />}
                              sx={{ 
                                bgcolor: alpha(theme.palette.primary.main, 0.15),
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                              }} 
                            />
                          )}
                          {plugin.new && (
                            <Chip 
                              label="New" 
                              size="small" 
                              icon={<NewReleases />}
                              sx={{ 
                                bgcolor: alpha(theme.palette.info.main, 0.15),
                                color: theme.palette.info.main,
                                fontWeight: 600,
                              }} 
                            />
                          )}
                        </Box>
                      </Box>

                      <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
                        {plugin.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 60 }}>
                        {plugin.description}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Rating value={plugin.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" fontWeight="600">
                          {plugin.rating}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ({plugin.downloads} downloads)
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            by
                          </Typography>
                          <Typography variant="caption" fontWeight="600">
                            {plugin.author}
                          </Typography>
                          {plugin.verified && (
                            <Verified sx={{ fontSize: 16, color: theme.palette.info.main }} />
                          )}
                        </Box>
                        <Typography variant="h6" fontWeight="700" color="primary">
                          {plugin.price}
                        </Typography>
                      </Box>

                      <Button 
                        variant="contained" 
                        fullWidth
                        startIcon={<Download />}
                        sx={{
                          py: 1.2,
                          background: `linear-gradient(135deg, ${plugin.color} 0%, ${alpha(plugin.color, 0.8)} 100%)`,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${alpha(plugin.color, 0.9)} 0%, ${plugin.color} 100%)`,
                            transform: 'scale(1.02)',
                          },
                          transition: 'all 0.3s',
                        }}
                      >
                        Install Plugin
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* All Plugins */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" fontWeight="600">
              {tabValue === 0 ? 'All Plugins' : `${categories[tabValue].label} Plugins`}
            </Typography>
            <Chip 
              label={`${filteredPlugins.length} results`}
              size="small"
              sx={{ ml: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}
            />
          </Box>
          <Grid container spacing={3}>
            {filteredPlugins.map((plugin) => (
              <Grid item xs={12} sm={6} lg={4} key={plugin.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          width: 48, 
                          height: 48,
                          bgcolor: alpha(plugin.color, 0.15),
                          color: plugin.color,
                        }}
                      >
                        {plugin.icon}
                      </Avatar>
                      {plugin.verified && (
                        <Chip 
                          label="Verified" 
                          size="small" 
                          icon={<Verified />}
                          sx={{ 
                            bgcolor: alpha(theme.palette.info.main, 0.15),
                            color: theme.palette.info.main,
                          }} 
                        />
                      )}
                    </Box>

                    <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
                      {plugin.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 60 }}>
                      {plugin.description.length > 100 
                        ? `${plugin.description.substring(0, 100)}...` 
                        : plugin.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Rating value={plugin.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="caption" fontWeight="600">
                        {plugin.rating}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <Download sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                      <Typography variant="caption" color="text.secondary">
                        {plugin.downloads.toLocaleString()} downloads
                      </Typography>
                      <Typography variant="h6" fontWeight="700" color="primary" sx={{ ml: 'auto' }}>
                        {plugin.price}
                      </Typography>
                    </Box>

                    <Button 
                      variant="outlined" 
                      fullWidth
                      startIcon={<Download />}
                      sx={{
                        borderColor: plugin.color,
                        color: plugin.color,
                        '&:hover': {
                          borderColor: plugin.color,
                          bgcolor: alpha(plugin.color, 0.1),
                        },
                      }}
                    >
                      Install
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Marketplace;
