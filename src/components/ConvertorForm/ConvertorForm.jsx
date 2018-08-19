import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DebounceInput from 'react-debounce-input';
import { Loader } from '../Loader/Loader';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';


const validate = (values, props) => {
  const errors = {}
  if (!values.firstCurrency && !values.secondCurrency) {
    errors.firstCurrency = 'Required';
    errors.secondCurrency = 'Required';
  } else {
    if (values.firstCurrency && isNaN(Number(values.firstCurrency))) {
      errors.firstCurrency = 'Must be a number'
    }
    if (values.secondCurrency && isNaN(Number(values.secondCurrency))) {
      errors.secondCurrency = 'Must be a number'
    }
  }

  if(props.isFirstCurrencyChanged) {
    if(!values.firstCurrency) {
      errors.firstCurrency = 'Required';
    }
  } else {
    if(!values.secondCurrency) {
      errors.secondCurrency = 'Required';
    }
  }

  if (!values.firstCurrencyType) {
    errors.firstCurrencyType = 'Required';
  }

  if (!values.secondCurrencyType ){
    errors.secondCurrencyType = 'Required'
  }

  return errors
}

const renderInput = ({ input, label, meta: { touched, error } }) => {
  return (
    <FormControl style={{ display: 'flex', marginBottom: '8px' }}>
      <DebounceInput
        { ...input }
        label={ label }
        error={ touched && !!error }
        debounceTimeout={ 500 }
        value={ input.value }
        element={
          TextField
        }
      />
      {
        touched && !!error && (
          <FormHelperText error={ touched && !!error }>
            { error }
          </FormHelperText>
        )
      }
    </FormControl>
  )
}

const renderSelect = (props) => {
  const {
    input, label, meta: { error, touched }, options
  } = props;
  return (
    <FormControl style={{ display: 'flex', marginBottom: '8px' }}>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select
        native
        name={ label }
        { ...input }
        error={ touched && !!error }
      >
        <option value="" />>
        {
          options.map((option) => (
            <option key={ option.label } value={option.value}> {option.label} </option>
          ))
        }
      </Select>
      {
        touched && !!error && (
          <FormHelperText error={ touched && !!error }>
            { error }
          </FormHelperText>
        )
      }
    </FormControl>
  );
}

const ConvertorFormFunction = props => {
  const {
    pristine,
    reset,
    submitting,
    handleSubmit,
    rateLoadingState,
    currenciesLoadingState,
    isFirstCurrencyChanged,
  } = props;

  const onSubmit = (values, valid, onSubmit) => {
    if (valid) {
      onSubmit(values);
    }
  }

  return (
    <form onSubmit={ handleSubmit((values) => {
      onSubmit(values, props.valid, props.onSubmit);
    })} >
        <Grid container direction="column" justify="center" style={{ marginTop: '16px' }}>
        {
          rateLoadingState.isLoading && !isFirstCurrencyChanged?
            <Loader />
            :
            <Field
              label="First Value: "
              name="firstCurrency"
              component={ renderInput }
            />
        }
        {
          currenciesLoadingState.isLoading ?
            <Loader />
            :
            <Field
              label="First Currency: "
              name="firstCurrencyType"
              component={ renderSelect }
              options={ props.currencyOptions }
            />
        }
        {
          rateLoadingState.isLoading && isFirstCurrencyChanged?
            <Loader />
            :
            <Field
              label="Second Value: "
              name="secondCurrency"
              component={ renderInput }
            />
        }
        {
          currenciesLoadingState.isLoading ?
            <Loader />
            :
            <Field
              label="Second Currency: "
              name="secondCurrencyType"
              component={ renderSelect }
              options={ props.currencyOptions }
            />
        }
      </Grid>
      <Grid container justify="space-evenly" style={{marginTop: '26px'}}>
        <Button
          variant="contained"
          type="submit"
          color="primary"
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={ pristine || submitting }
          onClick={ reset }
        >
          Clear Values
        </Button>
      </Grid>
    </form>
  );
};

export const ConvertorForm = reduxForm({
  form: 'convertor',
  validate,
})(ConvertorFormFunction)

