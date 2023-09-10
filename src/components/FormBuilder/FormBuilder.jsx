import React from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { styled } from '@mui/system';
import { API_BASE_URL, FORMS_ENDPOINT } from '../../apiConfig';

const QuestionContainer = styled('div')(({ theme }) => ({
  marginBottom: '16px',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
}));

const OptionContainer = styled('div')(({ theme }) => ({
  marginBottom: '8px',
  marginLeft: '24px',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: '45%',
}));

const FlexContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
}));

const FormBuilder = () => {
  const [form, setForm] = React.useState({ title: '', questions: [] });

  const handleAddQuestion = () => {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        { type: 'short_answer', text: '', options: [] },
      ],
    });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...form.questions];
    newQuestions[index].text = value;
    setForm({ ...form, questions: newQuestions });
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].options.push('');
    setForm({ ...form, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setForm({ ...form, questions: newQuestions });
  };

  const handleQuestionTypeChange = (questionIndex, value) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].type = value;
    setForm({ ...form, questions: newQuestions });
  };

  const handleDeleteQuestion = (questionIndex) => {
    const newQuestions = form.questions.filter((_, index) => index !== questionIndex);
    setForm({ ...form, questions: newQuestions });
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].options = newQuestions[questionIndex].options.filter((_, index) => index !== optionIndex);
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
      <Typography variant="h4" mb={2}>Form Builder</Typography>
      <TextField
        label="Form Title"
        fullWidth
        variant="outlined"
        mb={3}
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      {form.questions.map((question, questionIndex) => (
        <QuestionContainer key={questionIndex}>
          <FlexContainer>
            <IconContainer>
              <ListAltIcon />
            </IconContainer>
            <StyledFormControl variant="outlined">
              <InputLabel>Question Type</InputLabel>
              <Select
                value={question.type}
                onChange={(e) => handleQuestionTypeChange(questionIndex, e.target.value)}
                label="Question Type"
              >
                <MenuItem value="short_answer">Short Answer</MenuItem>
                <MenuItem value="paragraph">Paragraph</MenuItem>
                <MenuItem value="multiple_choice">Multiple Choice</MenuItem>
                <MenuItem value="checkbox">Checkbox</MenuItem>
              </Select>
            </StyledFormControl>
            <TextField
              label="Question Text"
              fullWidth
              variant="outlined"
              value={question.text}
              onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
              style={{ flex: 1 }}
            />
          </FlexContainer>
          {(question.type === 'multiple_choice' || question.type === 'checkbox') && (
            <>
              {question.options.map((option, optionIndex) => (
                <OptionContainer key={optionIndex}>
                  <TextField
                    label="Option"
                    fullWidth
                    variant="outlined"
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                  />
                  <IconButton onClick={() => handleDeleteOption(questionIndex, optionIndex)}>
                    <DeleteIcon />
                  </IconButton>
                </OptionContainer>
              ))}
              <Button variant="contained" onClick={() => handleAddOption(questionIndex)}>Add Option</Button>
            </>
          )}
          <Button variant="contained" color="error" onClick={() => handleDeleteQuestion(questionIndex)}>Delete Question</Button>
        </QuestionContainer>
      ))}
      <Button variant="contained" onClick={handleAddQuestion}>Add Question</Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Form</Button>
    </Container>
  );
};

export default FormBuilder;

