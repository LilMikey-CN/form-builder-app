import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Container, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { API_BASE_URL, SINGLE_FORM_ENDPOINT, FORM_RESPONSES_ENDPOINT } from '../../apiConfig';


const FillForm = () => {
  const { id } = useParams();
  const [form, setForm] = React.useState(null);
  const [answers, setAnswers] = React.useState({});

  React.useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}${SINGLE_FORM_ENDPOINT(id)}`);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };
    fetchForm();
  }, [id]);

  const handleInputChange = (e, index) => {
    setAnswers({ ...answers, [index]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}${FORM_RESPONSES_ENDPOINT(id)}`, answers);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container>
      {form ? (
        <div>
          <Typography variant="h4" gutterBottom>
            {form.title}
          </Typography>
          {form.questions.map((question, index) => (
            <div key={index}>
              <Typography variant="h6" gutterBottom>
                {question.title}
              </Typography>
              <RadioGroup
                name={`question-${index}`}
                value={answers[index] || ''}
                onChange={(e) => handleInputChange(e, index)}
              >
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      ) : (
        <Typography variant="h5" gutterBottom>
          Loading...
        </Typography>
      )}
    </Container>
  );
};

export default FillForm;

