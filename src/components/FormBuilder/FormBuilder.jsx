import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Select, MenuItem, FormControl, InputLabel, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { styled } from '@mui/system';
import { API_BASE_URL, FORMS_ENDPOINT } from '../../apiConfig';

const QuestionContainer = styled(Box)(({ theme }) => ({
  marginBottom: '16px',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
}));

const OptionContainer = styled(Box)(({ theme }) => ({
  marginBottom: '8px',
  marginLeft: '24px',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  flex: 1,
  marginRight: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
}));

const FlexContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const FlexButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ContainerWithPadding = styled(Container)(({ theme }) => ({
  paddingBottom: '50px',
}));

const FormBuilder = () => {
  const [form, setForm] = useState({ title: '', questions: [{ type: 'short_answer', text: '', options: [''] }] });

  const handleAddQuestion = () => {
    setForm({ ...form, questions: [...form.questions, { type: 'short_answer', text: '', options: [''] }] });
  };

  const handleQuestionChange = (questionIndex, value) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].text = value;
    setForm({ ...form, questions: newQuestions });
  };

  const handleTypeChange = (questionIndex, value) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].type = value;
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

  const handleDeleteQuestion = (questionIndex) => {
    setForm({ ...form, questions: form.questions.filter((_, index) => index !== questionIndex) });
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
      alert('Error submitting form');
    }
  };

  return (
    <ContainerWithPadding>
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
            <StyledFormControl variant="outlined">
              <InputLabel>Question Type</InputLabel>
              <Select
                value={question.type}
                onChange={(e) => handleTypeChange(questionIndex, e.target.value)}
                label="Question Type"
              >
                <MenuItem value="short_answer">
                  <ShortTextIcon /> Short Answer
                </MenuItem>
                <MenuItem value="paragraph">
                  <SubjectIcon /> Paragraph
                </MenuItem>
                <MenuItem value="multiple_choice">
                  <RadioButtonCheckedIcon /> Multiple Choice
                </MenuItem>
                <MenuItem value="checkbox">
                  <CheckBoxIcon /> Checkbox
                </MenuItem>
              </Select>
            </StyledFormControl>
            <StyledTextField
              variant="outlined"
              label="Question Text"
              value={question.text}
              onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
            />
            <IconButton onClick={() => handleDeleteQuestion(questionIndex)}>
              <DeleteIcon />
            </IconButton>
          </FlexContainer>
          {question.type === 'multiple_choice' || question.type === 'checkbox' ? (
            question.options.map((option, optionIndex) => (
              <OptionContainer key={optionIndex}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Option"
                  value={option}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                />
                <IconButton onClick={() => handleDeleteOption(questionIndex, optionIndex)}>
                  <DeleteIcon />
                </IconButton>
              </OptionContainer>
            ))
          ) : null}
          {(question.type === 'multiple_choice' || question.type === 'checkbox') && (
            <Button variant="outlined" onClick={() => handleAddOption(questionIndex)}>
              Add Option
            </Button>
          )}
        </QuestionContainer>
      ))}
      <FlexButtonContainer>
        <Button variant="contained" onClick={handleAddQuestion}>Add New Question</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </FlexButtonContainer>
    </ContainerWithPadding>
  );
};

export default FormBuilder;

