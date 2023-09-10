import * as React from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import { API_BASE_URL, FORMS_ENDPOINT } from '../../apiConfig';


const StyledTextField = styled(TextField)`
  margin: 8px;
`;

const StyledButton = styled(Button)`
  margin: 8px;
`;

const FormBuilder = () => {
  const [form, setForm] = React.useState({ title: '', questions: [] });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addQuestion = () => {
    setForm({ ...form, questions: [...form.questions, { title: '', options: [''] }] });
  };

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...form.questions];
    newQuestions[index].title = e.target.value;
    setForm({ ...form, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
    setForm({ ...form, questions: newQuestions });
  };

  const addOption = (index) => {
    const newQuestions = [...form.questions];
    newQuestions[index].options.push('');
    setForm({ ...form, questions: newQuestions });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}${FORMS_ENDPOINT}`, form);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Form
      </Typography>
      <form noValidate autoComplete="off">
        <StyledTextField
          label="Form Title"
          variant="outlined"
          name="title"
          fullWidth
          value={form.title}
          onChange={handleInputChange}
        />
        {form.questions.map((question, qIndex) => (
          <div key={qIndex}>
            <StyledTextField
              label="Question Title"
              variant="outlined"
              fullWidth
              value={question.title}
              onChange={(e) => handleQuestionChange(qIndex, e)}
            />
            {question.options.map((option, oIndex) => (
              <StyledTextField
                key={oIndex}
                label="Option"
                variant="outlined"
                fullWidth
                value={option}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
              />
            ))}
            <StyledButton variant="contained" onClick={() => addOption(qIndex)}>
              Add Option
            </StyledButton>
          </div>
        ))}
        <StyledButton variant="contained" onClick={addQuestion}>
          Add Question
        </StyledButton>
        <StyledButton variant="contained" color="primary" onClick={handleSubmit}>
          Create Form
        </StyledButton>
      </form>
    </Container>
  );
};

export default FormBuilder;

