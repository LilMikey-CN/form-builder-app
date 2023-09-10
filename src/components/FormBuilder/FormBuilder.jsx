import * as React from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import { API_BASE_URL, FORMS_ENDPOINT } from '../../apiConfig';

const QuestionContainer = styled('div')({
  marginBottom: '16px',
  paddingLeft: '8px',
  borderLeft: '4px solid #3f51b5',
});

const OptionContainer = styled('div')({
  marginBottom: '8px',
  paddingLeft: '24px',
  borderLeft: '4px solid #f50057',
});

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
      console.log('Submitting form:', form);
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
          <FormControl variant="outlined" fullWidth mb={2}>
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
          </FormControl>
          <TextField
            label="Question Text"
            fullWidth
            variant="outlined"
            mb={2}
            value={question.text}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
          />
          {(question.type === 'multiple_choice' || question.type === 'checkbox') && (
            <>
              {question.options.map((option, optionIndex) => (
                <OptionContainer key={optionIndex}>
                  <TextField
                    label="Option"
                    fullWidth
                    variant="outlined"
                    mb={2}
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                  />
                  <Button variant="contained" color="error" onClick={() => handleDeleteOption(questionIndex, optionIndex)}>Delete Option</Button>
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

