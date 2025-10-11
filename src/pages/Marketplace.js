import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Button, Tabs, Tab, TextField } from '@mui/material';
import { Store } from '@mui/icons-material';

const plugins = [
  {
    id: 1,
    name: 'E-commerce Assistant',
    description: 'Automated online shopping and price comparison across multiple platforms',
    author: 'AutoRL Team',
    rating: 4.8,
    downloads: 1247,
    price: 'Free',
    category: 'Shopping',
    verified: true
  },
  {
    id: 2,
    name: 'Social Media Manager',
    description: 'Cross-platform social media posting and engagement automation',
    author: 'SocialBot Inc',
    rating: 4.6,
    downloads: 892,
    price: '$9.99',
    category: 'Social',
    verified: true
  },
  {
    id: 3,
    name: 'Finance Tracker',
    description: 'Automated expense tracking and budget management across banking apps',
    author: 'FinanceAI',
    rating: 4.9,
    downloads: 2134,
    price: '$4.99',
    category: 'Finance',
    verified: false
  },
  {
    id: 4,
    name: 'Travel Planner',
    description: 'Complete travel booking automation for flights, hotels, and activities',
    author: 'TravelBot',
    rating: 4.7,
    downloads: 567,
    price: '$14.99',
    category: 'Travel',
    verified: true
  }
];

const categories = ['All', 'Shopping', 'Social', 'Finance', 'Travel', 'Productivity'];

const Marketplace = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlugins = plugins.filter(
    (plugin) =>
      (tabValue === 0 || plugin.category === categories[tabValue]) &&
      (plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) || plugin.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ pt: 10, pb: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Marketplace
        </Typography>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mb: 2 }}>
          {categories.map((cat) => (
            <Tab key={cat} label={cat} />
          ))}
        </Tabs>
        <TextField
          label="Search plugins"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Grid container spacing={3}>
          {filteredPlugins.map((plugin) => (
            <Grid item xs={12} sm={6} md={4} key={plugin.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{plugin.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{plugin.description}</Typography>
                  <Typography variant="body2" color="text.secondary">Author: {plugin.author}</Typography>
                  <Typography variant="body2" color="text.secondary">Rating: {plugin.rating}</Typography>
                  <Typography variant="body2" color="text.secondary">Downloads: {plugin.downloads}</Typography>
                  <Typography variant="body2" color="text.secondary">Price: {plugin.price}</Typography>
                  <Typography variant="caption" color={plugin.verified ? 'primary' : 'text.secondary'}>{plugin.verified ? 'Verified' : 'Unverified'}</Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>Install</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Marketplace;
