import Jumbotron from 'react-bootstrap/Jumbotron';
import './Home.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Home = () => {
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState('');
  const onSubmit = () => history.push('/posts');
  const handleNext = () => {
    if (index < 2) setIndex(index + 1);
  };

  const handleBack = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleSave = async data => {
    console.log(data);

    await setResult(data);

    if (data.acceptTermsAndCondition) {
      delete data.acceptTermsAndCondition;
      const response = await fetch('https://codebuddy.review/submit', {
        method: 'POST',

        body: JSON.stringify(data),
      });
      const receivedData = await response.json();
      console.log(receivedData);
      if (receivedData.message === 'Success') alert('Data Saved Successfully');
      reset({});
    }
  };

  return (
    <main>
      <Jumbotron>
        <h1>React + Bootstrap v4</h1>
        <p>React template with Bootstrap version v4</p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="nav">
            <span onClick={() => setIndex(0)}> Form 1</span>{' '}
            <span onClick={() => setIndex(1)}> Form 2 </span>{' '}
            <span onClick={() => setIndex(2)}> Form 3</span>
          </div>

          {index == 0 && (
            <Form>
              <label>Enter Email</label>
              <input
                name="email"
                type="email"
                {...register('emailId', {
                  required: true,
                  maxLength: 20,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              <br />

              <label>Enter Password</label>
              <input
                name="password"
                type="password"
                {...register('password', {
                  required: true,
                  minLength: 8,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              <br />
              <button disabled={index == 0} onClick={handleBack}>
                Back
              </button>
              <button onClick={handleSubmit(() => {})}>Save</button>

              <button onClick={handleSubmit(handleNext)}>Save and Next</button>
            </Form>
          )}
          {index == 1 && (
            <Form>
              <label>Enter FirstName</label>
              <input
                name="firstName"
                type="text"
                {...register('firstName', { required: true, maxLength: 50, minLength: 2 })}
              />
              <br />
              <label>Enter lastName</label>
              <input
                name="lastName"
                type="text"
                {...register('lastName', { pattern: /^[A-Za-z]+$/i })}
              />
              <br />

              <label>Enter address</label>
              <input
                name="address"
                type="text"
                {...register('address', { required: true, minLength: 10 })}
              />
              <br />

              <button disabled={index == 0} onClick={handleBack}>
                Back
              </button>

              <button>Save</button>

              <button onClick={handleSubmit(handleNext)}>Save and Next</button>
            </Form>
          )}
          <br />
          {index == 2 && (
            <Form>
              <label>Select Country Code</label>

              <select {...register('countryCode', { required: true })}>
                <option value="">Select...</option>
                <option value="+91">+91</option>
                <option value="+1">+1</option>
              </select>
              <br />
              <label>Enter Phone Number</label>
              <input
                name="phoneNumber"
                type="number"
                {...register('phoneNumber', { required: true, pattern: /^[0-9]+$/i })}
              />
              <br />

              <input
                name="acceptTermsAndCondition"
                type="checkbox"
                {...register('acceptTermsAndCondition', { required: true })}
              />
              <label>acceptTermsAndCondition</label>

              <br />

              <button disabled={index == 0} onClick={handleBack}>
                Back
              </button>

              <button onClick={handleSubmit(handleSave)}>Save</button>

              <button disabled={index == 2} onClick={handleSubmit(handleNext)}>
                Save and Next
              </button>
            </Form>
          )}
          <Button onClick={onSubmit}>Goto Posts</Button>
        </Form>
      </Container>
    </main>
  );
};

export default Home;
