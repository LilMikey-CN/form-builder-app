import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import { API_BASE_URL, FORMS_ENDPOINT } from '../../apiConfig';


const FormList = () => {
  const [forms, setForms] = React.useState([]);

  React.useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}${FORMS_ENDPOINT}`);
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };
    fetchForms();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Forms
      </Typography>
      <List>
        {forms.map((form) => (
          <ListItem button component={Link} to={`/fill-form/${form.id}`} key={form.id}>
            <ListItemText primary={form.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default FormList;

